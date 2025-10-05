// src/footer/Certs/CertsModal.jsx
import React from "react";
import "./CertsModal.css";
import { usePdfPrefetch, prefetchPdfList } from "../../../js/usePdfPrefetch";

export default function CertsModal({
  open,
  onClose,
  items = [],
  initialIndex = 0,
}) {
  const count = items.length;
  const safeInitial = Math.min(
    Math.max(initialIndex, 0),
    Math.max(count - 1, 0)
  );
  const [index, setIndex] = React.useState(safeInitial);

  React.useEffect(() => {
    if (!count) return;
    setIndex((i) => Math.min(Math.max(i, 0), count - 1));
  }, [count]);

  React.useEffect(() => {
    if (open) setIndex(safeInitial);
  }, [open, safeInitial]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (!open || !count) return;
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, count]);

  const current = items[index] ?? items[safeInitial] ?? items[0] ?? null;

  // Prefetch the current (eager only when open)
  const { blobUrl } = usePdfPrefetch(current?.src, { eager: !!open });

  // Warm neighbors
  React.useEffect(() => {
    if (!open || !count) return;
    const prev = items[(index - 1 + count) % count]?.src;
    const next = items[(index + 1) % count]?.src;
    prefetchPdfList([prev, next]);
  }, [open, index, items, count]);

  if (!open || !count) return null;

  // ---- Ensure the PDF viewer updates ----
  // 1) For blob URLs: unique each fetch, so just use it.
  // 2) For non-blob URLs: add a small cache-bust query tied to the active item.
  const baseSrc = (blobUrl || current?.src) ?? "";
  const isBlob = baseSrc.startsWith("blob:");
  const cacheKey = encodeURIComponent(current?.id ?? String(index));
  const srcWithBust = isBlob
    ? baseSrc
    : baseSrc.includes("?")
    ? `${baseSrc}&_v=${cacheKey}`
    : `${baseSrc}?_v=${cacheKey}`;

  // 3) Force iframe to remount when selection changes
  const iframeKey = current?.id ?? `${index}-${Boolean(blobUrl)}`;

  const goPrev = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  return (
    <div
      className="certs-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Certificates preview"
      onClick={onClose}
    >
      <div
        id="certs-dialog"
        className="certs-dialog"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="certs-close"
          aria-label="Close certificates preview"
          onClick={onClose}
        >
          ✕
        </button>

        {count > 1 && (
          <div className="certs-tabs" role="tablist" aria-label="Certificates">
            {items.map((it, i) => (
              <button
                key={it.id || it.label}
                role="tab"
                aria-selected={index === i}
                className={`cert-tab ${index === i ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
                title={it.label}
              >
                {it.label}
              </button>
            ))}
          </div>
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              className="certs-nav certs-prev"
              aria-label="Previous certificate"
              onClick={goPrev}
            >
              ‹
            </button>
            <button
              type="button"
              className="certs-nav certs-next"
              aria-label="Next certificate"
              onClick={goNext}
            >
              ›
            </button>
          </>
        )}

        <iframe
          key={iframeKey}
          className="certs-frame"
          src={`${srcWithBust}#toolbar=1&navpanes=0&view=FitH`}
          title={current?.label || "Certificate"}
          loading="eager"
        />

        {!!current?.src && (
          <a
            className="certs-download"
            href={current.src}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new tab →
          </a>
        )}
      </div>
    </div>
  );
}
