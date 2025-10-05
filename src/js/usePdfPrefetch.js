// src/js/usePdfPrefetch.js
import { useEffect, useRef, useState } from "react";

/**
 * Prefetch a PDF to a Blob URL and cache it in-memory.
 * - Returns { blobUrl, prefetch, error }.
 * - If `eager: true`, it starts fetching on mount.
 * - Cache survives across component mounts (per tab).
 */

const blobUrlCache = new Map(); // key: absolute src -> blob URL
const inflight = new Map(); // key: absolute src -> Promise<string>

function toAbsolute(src) {
  if (typeof window === "undefined") return src;
  try {
    return new URL(src, window.location.href).toString();
  } catch {
    return src;
  }
}

async function fetchToBlobUrl(absSrc) {
  // Deduplicate concurrent fetches.
  if (blobUrlCache.has(absSrc)) return blobUrlCache.get(absSrc);
  if (inflight.has(absSrc)) return inflight.get(absSrc);

  const p = (async () => {
    const res = await fetch(absSrc, { credentials: "same-origin" });
    if (!res.ok) throw new Error(`Failed to fetch PDF (${res.status})`);
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
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Eager prefetch when asked.
  useEffect(() => {
    if (!absSrc || !eager || blobUrl) return;
    fetchToBlobUrl(absSrc)
      .then((url) => mounted.current && setBlobUrl(url))
      .catch((err) => {
        if (mounted.current) setError(err);
        console.error("[usePdfPrefetch] Prefetch failed:", absSrc, err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [absSrc, eager]);

  // Imperative prefetch (use on hover/focus).
  const prefetch = async () => {
    if (!absSrc) return null;
    try {
      const url = await fetchToBlobUrl(absSrc);
      if (mounted.current) setBlobUrl(url);
      return url;
    } catch (err) {
      if (mounted.current) setError(err);
      console.error("[usePdfPrefetch] Prefetch failed:", absSrc, err);
      return null;
    }
  };

  return { blobUrl, prefetch, error };
}

// Optional helper to clear everything (not required).
export function __clearPdfPrefetchCache() {
  for (const url of blobUrlCache.values()) {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn("[usePdfPrefetch] Failed to revoke Blob URL:", e);
    }
  }
  blobUrlCache.clear();
  inflight.clear();
}
