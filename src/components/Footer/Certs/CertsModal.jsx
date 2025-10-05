import React from "react";
import "./CertsModal.css";

/**
 * CertsModal
 * - Full-viewport overlay (Esc + click-away to close)
 * - Navigates multiple PDF certs (arrow keys, buttons)
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - files: Array<{ title: string, src: string }>
 *  - startIndex?: number
 */
export default function CertsModal({
  open,
  onClose,
  files = [],
  startIndex = 0,
}) {
  const [index, setIndex] = React.useState(startIndex);

  React.useEffect(() => {
    if (!open) return;
    setIndex(startIndex);
  }, [open, startIndex]);

  // Close / nav via keyboard
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (!files.length) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % files.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + files.length) % files.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, files.length, onClose]);

  if (!open || !files.length) return null;

  const { title, src } = files[index];

  return (
    <div
      className="certs-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Certifications preview"
      onClick={onClose}
    >
      <div
        className="certs-dialog"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          className="certs-close"
          aria-label="Close certifications preview"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <div className="certs-title" title={title}>
          {title}
        </div>

        {/* Frame */}
        <iframe
          className="certs-frame"
          src={`${src}#toolbar=1&navpanes=0&view=FitH`}
          title={title}
          loading="eager"
        />

        {/* Controls */}
        {files.length > 1 && (
          <>
            <button
              type="button"
              className="certs-nav certs-nav-left"
              aria-label="Previous certificate"
              onClick={() =>
                setIndex((i) => (i - 1 + files.length) % files.length)
              }
            >
              ‹
            </button>
            <button
              type="button"
              className="certs-nav certs-nav-right"
              aria-label="Next certificate"
              onClick={() => setIndex((i) => (i + 1) % files.length)}
            >
              ›
            </button>
            <div className="certs-pagination" aria-hidden="true">
              {index + 1} / {files.length}
            </div>
          </>
        )}

        {/* Open in new tab */}
        <a
          className="certs-download"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in new tab →
        </a>
      </div>
    </div>
  );
}
