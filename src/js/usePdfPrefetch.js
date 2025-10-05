// src/js/usePdfPrefetch.js
import { useEffect, useRef, useState } from "react";

/**
 * Prefetch a PDF to a Blob URL and cache it in-memory.
 * - Returns { blobUrl, prefetch }.
 * - If `eager: true`, it starts fetching on mount/update.
 * - Cache survives across component mounts, per-tab.
 */

const blobUrlCache = new Map(); // key: absolute src -> blob URL
const inflight = new Map(); // key: absolute src -> Promise<string>

function toAbsolute(src) {
  try {
    return new URL(src, window.location.href).toString();
  } catch {
    return src;
  }
}

async function fetchToBlobUrl(absSrc) {
  if (!absSrc) return null;

  // Deduplicate concurrent fetches.
  if (blobUrlCache.has(absSrc)) return blobUrlCache.get(absSrc);
  if (inflight.has(absSrc)) return inflight.get(absSrc);

  const p = (async () => {
    const res = await fetch(absSrc, { credentials: "same-origin" });
    if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    blobUrlCache.set(absSrc, url);
    return url;
  })();

  inflight.set(absSrc, p);
  try {
    const url = await p;
    return url;
  } finally {
    inflight.delete(absSrc);
  }
}

export function usePdfPrefetch(src, { eager = false } = {}) {
  const absSrc = src ? toAbsolute(src) : null;
  const [blobUrl, setBlobUrl] = useState(() =>
    absSrc && blobUrlCache.has(absSrc) ? blobUrlCache.get(absSrc) : null
  );
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!absSrc || !eager || blobUrl) return;
    fetchToBlobUrl(absSrc)
      .then((url) => {
        if (mounted.current && url) setBlobUrl(url);
      })
      .catch((err) => {
        if (import.meta.env?.DEV) {
          // eslint-disable-next-line no-console
          console.warn(
            "[usePdfPrefetch] prefetch failed:",
            err?.message || err
          );
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [absSrc, eager]);

  const prefetch = async () => {
    if (!absSrc) return null;
    try {
      const url = await fetchToBlobUrl(absSrc);
      if (mounted.current && url) setBlobUrl(url);
      return url;
    } catch (err) {
      if (import.meta.env?.DEV) {
        // eslint-disable-next-line no-console
        console.warn(
          "[usePdfPrefetch] prefetch() failed:",
          err?.message || err
        );
      }
      return null;
    }
  };

  return { blobUrl, prefetch };
}

/**
 * Prefetch multiple PDFs at once without using hooks.
 * Good for hover/focus handlers where you want to warm the cache.
 */
export async function prefetchPdfList(srcs = []) {
  const tasks = srcs
    .filter(Boolean)
    .map((s) => fetchToBlobUrl(toAbsolute(s)).catch(() => null));
  try {
    await Promise.all(tasks);
  } catch (err) {
    // Swallow but optionally log in dev
    if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[prefetchPdfList] at least one prefetch failed:",
        err?.message || err
      );
    }
  }
}

// Optional helper if you ever need to clear everything (not required).
export function __clearPdfPrefetchCache() {
  for (const url of blobUrlCache.values()) {
    try {
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    }
  }
  blobUrlCache.clear();
  inflight.clear();
}
