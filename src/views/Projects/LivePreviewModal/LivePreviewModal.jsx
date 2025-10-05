import React from "react";
import { createPortal } from "react-dom";
import "./LivePreviewModal.css";

export default function LivePreviewModal({ project, onClose }) {
  const open = Boolean(project);

  // ESC to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock background scroll while open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} live preview`}
      onClick={onClose}
    >
      <div className="preview-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="preview-close"
          onClick={onClose}
          aria-label="Close preview"
        >
          ✕
        </button>
        <iframe
          className="preview-frame-large"
          src={project.liveUrl}
          title={`${project.name} live preview`}
          loading="lazy"
        />
      </div>
    </div>,
    document.body
  );
}
