import React from "react";
import { createPortal } from "react-dom";
import "./Avatar.css";

export default function Avatar({ src, alt, showHint = true }) {
  const [open, setOpen] = React.useState(false);

  // Prevent background scroll when open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const close = () => setOpen(false);

  const overlay = open
    ? createPortal(
        <div
          className="avatar-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded portrait"
          onClick={close}
        >
          <div className="avatar-dialog" onClick={(e) => e.stopPropagation()}>
            <img className="avatar-full" src={src} alt={`${alt}, enlarged`} />
            <button
              type="button"
              className="avatar-close"
              aria-label="Close preview"
              onClick={close}
            >
              ✕
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        className="avatar-wrap"
        onClick={() => setOpen(true)}
        aria-label="Expand portrait"
      >
        <span className="ring" />
        <img className="avatar" src={src} alt={alt} />
        <span className="glow" />
        {showHint && (
          <span className="avatar-hint" aria-hidden="true">
            Click to expand
          </span>
        )}
      </button>
      {overlay}
    </>
  );
}
