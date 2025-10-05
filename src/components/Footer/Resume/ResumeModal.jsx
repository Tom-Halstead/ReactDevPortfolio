// src/footer/Resume/ResumeModal.jsx
import React from "react";
import "./ResumeModal.css";
import { usePdfPrefetch } from "../../../js/usePdfPrefetch";

/**
 * ResumeModal
 * - Full-viewport overlay with click-away + Esc to close
 * - Shows your PDF from public/certs/
 *
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - src: string (path to the PDF in /public)
 */
export default function ResumeModal({ open, onClose, src }) {
  // Prefetch hook: if a Blob URL is in cache, use it instantly.
  const { blobUrl } = usePdfPrefetch(src);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Prefer the prefetched Blob URL, fall back to direct URL.
  const iframeSrc = `${blobUrl || src}#toolbar=1&navpanes=0&view=FitH`;

  return (
    <div
      className="resume-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Résumé preview"
      onClick={onClose}
    >
      <div
        className="resume-dialog"
        role="document"
        onClick={(e) => e.stopPropagation()}
        id="resume-dialog"
      >
        <button
          type="button"
          className="resume-close"
          aria-label="Close résumé preview"
          onClick={onClose}
        >
          ✕
        </button>

        <iframe
          className="resume-frame"
          src={iframeSrc}
          title="Résumé"
          loading="eager"
        />

        <a
          className="resume-download"
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
