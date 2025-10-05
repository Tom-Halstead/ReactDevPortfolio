// src/footer/Footer.jsx
import React from "react";
import "./Footer.css";
import ResumeModal from "./Resume/ResumeModal.jsx";
import { usePdfPrefetch } from "../../js/usePdfPrefetch.js";

// Your PDF lives in public/certs/
const RESUME_PATH = "/certs/2025%20SDE%20Resume%20PDF.pdf";

export default function Footer() {
  const [resumeOpen, setResumeOpen] = React.useState(false);

  // Prefetch on user intent (hover/focus) for a snappy feel.
  const { prefetch: prefetchResume } = usePdfPrefetch(RESUME_PATH);

  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          {/* LEFT COLUMN */}
          <div className="footer-left">
            <span className="brand">
              <span className="dot">●</span>
              Tom&apos;s Portfolio
            </span>

            <div className="social-links">
              <a
                href="https://github.com/tom-halstead"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-link"
              >
                <img
                  src="/logos/github-icon.gif"
                  alt="GitHub"
                  className="social-icon"
                  loading="lazy"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/tomhalsteadeveloper/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-link"
              >
                <img
                  src="/logos/linkedin-icon.gif"
                  alt="LinkedIn"
                  className="social-icon"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div className="footer-center">
            <div className="footer-actions">
              {/* Open résumé in modal */}
              <button
                type="button"
                className="link-chip link-chip-btn"
                onMouseEnter={prefetchResume}
                onFocus={prefetchResume}
                onClick={() => setResumeOpen(true)}
                aria-haspopup="dialog"
                aria-controls="resume-dialog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 11v8m0 0l-3-3m3 3l3-3" />
                  <path d="M3 19a9 9 0 0 1 18 0" />
                </svg>
                Résumé
              </button>

              <a
                href="/certifications"
                target="_blank"
                rel="noopener noreferrer"
                className="link-chip"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M8 14v7l4-2 4 2v-7" />
                </svg>
                Certifications
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="footer-right">
            <a
              href="mailto:tom.michael.halstead@gmail.com"
              className="contact-link"
            >
              tom.michael.halstead@gmail.com
            </a>
            <span className="contact-location">📍 United States</span>
          </div>
        </div>
      </footer>

      {/* Modal outside footer for z-index clarity */}
      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        src={RESUME_PATH}
      />
    </>
  );
}
