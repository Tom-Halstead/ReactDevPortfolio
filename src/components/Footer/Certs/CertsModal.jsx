// src/footer/Certs/CertsModal.jsx
import React from "react";
import "./CertsModal.css";
import { usePdfPrefetch, prefetchPdfList } from "../../../js/usePdfPrefetch";

/**
 * CertsModal
 * - Full-viewport overlay (click-away + Esc to close)
 * - Tabs + Prev/Next arrows + ←/→ keyboard
 * - Prefetches the current PDF (Blob URL) and pre-warms neighbors
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - items: Array<{ id?: string, label: string, src: string }>
 *  - initialIndex?: number
 */
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

  // Keep index bounded if items length changes
  React.useEffect(() => {
    if (!count) return;
    setIndex((i) => Math.min(Math.max(i, 0), count - 1));
  }, [count]);

  // Reset to initial when opening
  React.useEffect(() => {
    if (open) setIndex(safeInitial);
  }, [open, safeInitial]);

  // Close on Escape + navigate with arrows (hook is unconditional; logic is conditional)
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

  // Derive current item BEFORE any early return so hooks can use it
  const current = items[index] ?? items[safeInitial] ?? items[0] ?? null;

  // Prefetch the current PDF; hook is ALWAYS called (eager only when open)
  const { blobUrl } = usePdfPrefetch(current?.src, { eager: !!open });

  // Prefetch neighbors when (open && count) and index changes
  React.useEffect(() => {
    if (!open || !count) return;
    const prev = items[(index - 1 + count) % count]?.src;
    const next = items[(index + 1) % count]?.src;
    prefetchPdfList([prev, next]);
  }, [open, index, items, count]);

  // Now it's safe to early-return
  if (!open || !count) return null;

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
        {/* Close “X” */}
        <button
          type="button"
          className="certs-close"
          aria-label="Close certificates preview"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Tabs / pills */}
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

        {/* Prev/Next arrows */}
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

        {/* PDF viewer */}
        <iframe
          className="certs-frame"
          src={`${
            (blobUrl || current?.src) ?? ""
          }#toolbar=1&navpanes=0&view=FitH`}
          title={current?.label || "Certificate"}
          loading="eager"
        />

        {/* Open original PDF in a new tab */}
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
