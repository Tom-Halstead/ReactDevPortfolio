import React from "react";
import Card from "../../components/Card/Card.jsx";
import "./Home.css";

export default function Home() {
  const [showPreview, setShowPreview] = React.useState(false);

  // Mobile accordion state
  const [isMobile, setIsMobile] = React.useState(false);
  const [openHome, setOpenHome] = React.useState(true);
  const [openWork, setOpenWork] = React.useState(true);

  // Detect mobile breakpoint and set default accordion states
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const apply = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      // Default: collapsed on mobile, expanded on desktop
      setOpenHome(!mobile);
      setOpenWork(!mobile);
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Close avatar preview on ESC
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

          {/* About Me — Work */}
          <Card
            className={`about-card about-work home-card ${
              isMobile && !openWork ? "is-collapsed" : ""
            }`}
          >
            <div className="about-header">
              <strong className="card-title">
                <span className="dot" aria-hidden="true">
                  ●
                </span>
                About — Work
              </strong>
              <button
                type="button"
                className={`about-toggle ${openWork ? "is-open" : ""}`}
                aria-expanded={openWork}
                aria-controls="about-work-body"
                onClick={() => setOpenWork((v) => !v)}
                title={openWork ? "Collapse" : "Expand"}
              >
                <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              id="about-work-body"
              className="about-body"
              aria-hidden={isMobile ? !openWork : false}
            >
              <p className="card-text">
                Backend-leaning full-stack dev who ships fast and clean.
              </p>

              <div className="about-chip-row">
                <span className="about-chip">Years coding: 3+</span>
                <span className="about-chip">
                  Core stack: Java • Spring • Postgres
                </span>
                <span className="about-chip">Also: React • REST • AWS</span>
              </div>

              <ul className="about-list">
                <li>
                  Very consinstent, determined, and disciplined in all walks of
                  life.
                </li>
                <li>Built secure auth flows (Cognito/OIDC/JWT).</li>
                <li>Integrated external APIs (news, Reddit, payments).</li>
                <li>
                  Wrote tests (JUnit) and docs; automated Postman collections.
                </li>
              </ul>
            </div>
          </Card>

          {/* About Me — Home */}
          <Card
            className={`about-card about-home home-card ${
              isMobile && !openHome ? "is-collapsed" : ""
            }`}
          >
            <div className="about-header">
              <strong className="card-title">
                <span className="dot" aria-hidden="true">
                  ●
                </span>
                About — Home
              </strong>
              <button
                type="button"
                className={`about-toggle ${openHome ? "is-open" : ""}`}
                aria-expanded={openHome}
                aria-controls="about-home-body"
                onClick={() => setOpenHome((v) => !v)}
                title={openHome ? "Collapse" : "Expand"}
              >
                <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              id="about-home-body"
              className="about-body"
              aria-hidden={isMobile ? !openHome : false}
            >
              <p className="card-text">
                Builder, tinkerer, and life-long learner.
              </p>

              <div className="about-chip-row">
                <span className="about-chip">Hobbies: Cars, Gym, Travel</span>
                <span className="about-chip">Learning: Virtues + Patience</span>
                <span className="about-chip">
                  Value: Consistency &gt; Intensity
                </span>
              </div>

              <ul className="about-list">
                <li>
                  Weekend Activity: Outdoor activities that keep me grounded.
                </li>
                <li>I like keeping things organized and measurable.</li>
                <li>Always up for a new challenge or adventure.</li>
              </ul>
            </div>
          </Card>

          {/* Moved: Green status card to the bottom of About Me */}
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
          onClick={() => setShowPreview((v) => !v)}
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
