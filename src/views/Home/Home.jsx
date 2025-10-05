import React from "react";
import Card from "../../components/Card/Card.jsx";
import "./Home.css";

/** Scale inner so it always fits outer; locks measured size to avoid reflow loops. */
function useScaleToFit(outerRef, innerRef, { minScale = 0.6 } = {}) {
  const measureAndScale = React.useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Reset to natural size
    inner.style.setProperty("--fit-scale", 1);
    inner.style.width = "auto";
    inner.style.height = "auto";

    // Measure natural size
    const iw = inner.scrollWidth;
    const ih = inner.scrollHeight;
    const ow = outer.clientWidth;
    const oh = outer.clientHeight;

    if (!iw || !ih || !ow || !oh) return;

    // Lock the natural size to avoid oscillations
    inner.style.width = iw + "px";
    inner.style.height = ih + "px";

    // Compute scale
    const scale = Math.max(minScale, Math.min(1, ow / iw, oh / ih));
    inner.style.setProperty("--fit-scale", String(scale));
  }, [outerRef, innerRef, minScale]);

  React.useLayoutEffect(() => {
    if (!outerRef.current || !innerRef.current) return;

    const ro = new ResizeObserver(measureAndScale);
    ro.observe(outerRef.current);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAndScale).catch(() => {});
    }

    const imgs = Array.from(innerRef.current.querySelectorAll("img"));
    Promise.allSettled(
      imgs.map((img) => img.decode?.() ?? Promise.resolve())
    ).then(measureAndScale);

    window.addEventListener("resize", measureAndScale);
    measureAndScale();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureAndScale);
    };
  }, [measureAndScale, outerRef, innerRef]);
}

export default function Home() {
  const [showPreview, setShowPreview] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [openHome, setOpenHome] = React.useState(true);
  const [openWork, setOpenWork] = React.useState(true);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const apply = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setOpenHome(!mobile);
      setOpenWork(!mobile);
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowPreview(false);
    };
    if (showPreview) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPreview]);

  const closePreview = () => setShowPreview(false);

  // Refs for scaling
  const outerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  useScaleToFit(outerRef, innerRef, { minScale: 0.62 });

  return (
    <section
      id="panel-home"
      className="view panel fit-outer"
      role="tabpanel"
      aria-labelledby="tab-home"
      ref={outerRef}
    >
      <div className="fit-inner" ref={innerRef}>
        <div className="home-split">
          {/* Left column */}
          <header className="intro">
            <h1 className="title">
              Hi, I’m <span className="accent">Tom</span>.
            </h1>
            <p className="subtitle">
              Full-stack developer crafting robust backends and fast, accessible
              UIs.
            </p>

            {/* About — Work */}
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
                  <li>Very consistent, determined, and disciplined.</li>
                  <li>Built secure auth flows (Cognito/OIDC/JWT).</li>
                  <li>Integrated external APIs (news, Reddit, payments).</li>
                  <li>
                    Wrote tests (JUnit) and docs; automated Postman collections.
                  </li>
                </ul>
              </div>
            </Card>

            {/* About — Home */}
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
                  <span className="about-chip">
                    Learning: Virtues + Patience
                  </span>
                  <span className="about-chip">
                    Value: Consistency &gt; Intensity
                  </span>
                </div>

                <ul className="about-list">
                  <li>Weekend: Outdoor activities that keep me grounded.</li>
                  <li>I like keeping things organized and measurable.</li>
                  <li>Always up for a new challenge or adventure.</li>
                  <li>I try to embody stoicism to the best of my abilities.</li>
                </ul>
              </div>
            </Card>

            {/* Status */}
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

          {/* Avatar */}
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
