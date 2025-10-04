import React from "react";
import Card from "../../components/Card/Card.jsx";
import "./Home.css";

export default function Home() {
  const [showPreview, setShowPreview] = React.useState(false);

  // Close preview on ESC key
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowPreview(false);
    };
    if (showPreview) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPreview]);

  const closePreview = () => setShowPreview(false);

  return (
    <section
      id="panel-home"
      className="view panel"
      role="tabpanel"
      aria-labelledby="tab-home"
    >
      <div className="home-split">
        {/* Left: intro */}
        <header className="intro">
          <h1 className="title">
            Hi, I’m <span className="accent">Tom</span>.
          </h1>
          <p className="subtitle">
            Full-stack developer crafting robust backends and fast, accessible
            UIs.
          </p>

          {/* Green status card */}
          <Card className="status-card home-card">
            <strong className="card-title">
              <span className="dot dot-invert" aria-hidden="true">
                ●
              </span>
              Status
            </strong>
            <p className="card-text strong">Open to roles</p>
          </Card>
        </header>

        {/* Right: avatar (click to open; hover only hints) */}
        <button
          type="button"
          className="avatar-wrap"
          onClick={() => setShowPreview((v) => !v)} /* tap/click support */
          aria-label="Expand portrait"
        >
          <span className="ring" />
          <img
            className="avatar"
            src="/images/2025-cropped-selfie.png"
            alt="Portrait of Tom"
            width="260"
            height="260"
            loading="eager"
          />
          <span className="glow" />
        </button>
      </div>

      {/* Fullscreen overlay preview */}
      {showPreview && (
        <div
          className="avatar-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded portrait"
          onClick={closePreview}
        >
          <div className="avatar-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="avatar-close"
              aria-label="Close preview"
              onClick={closePreview}
            >
              ✕
            </button>
            <img
              className="avatar-full"
              src="/images/2025-cropped-selfie.png"
              alt="Portrait of Tom, enlarged"
              loading="eager"
            />
          </div>
        </div>
      )}
    </section>
  );
}
