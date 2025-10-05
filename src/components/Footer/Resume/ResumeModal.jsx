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
  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Prefetch when opened (or earlier via Footer hover)
  const { blobUrl } = usePdfPrefetch(src, { eager: open });

  if (!open) return null;

  return (
    <div
      className="resume-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Résumé preview"
      onClick={onClose}
    >
      <div
        id="resume-dialog"
        className="resume-dialog"
        role="document"
        onClick={(e) => e.stopPropagation()}
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
          src={`${(blobUrl || src) ?? ""}#toolbar=1&navpanes=0&view=FitH`}
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
