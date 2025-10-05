import React from "react";
import "./Footer.css";
import ResumeModal from "./Resume/ResumeModal.jsx";
import CertsModal from "./Certs/CertsModal.jsx";
import { usePdfPrefetch, prefetchPdfList } from "../../js/usePdfPrefetch";

const RESUME_PATH = "/certs/2025%20SDE%20Resume%20PDF.pdf";
const CERT_ITEMS = [
  {
    id: "tech-elevator",
    label: "Tech Elevator",
    src: "/certs/Tech%20Elevator%20Certificate.pdf",
  },
  { id: "udemy", label: "Udemy", src: "/certs/Udemy%20Certificate.pdf" },
];

export default function Footer() {
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const [certsOpen, setCertsOpen] = React.useState(false);

  // Prefetch résumé PDF (hover/focus)
  const resumePref = usePdfPrefetch(RESUME_PATH);

  // Warm all certs on hover/focus (no hooks-in-loop; single function)
  const prefetchCerts = React.useCallback(() => {
    prefetchPdfList(CERT_ITEMS.map((c) => c.src));
  }, []);

  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          {/* LEFT */}
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

          {/* CENTER */}
          <div className="footer-center">
            <div className="footer-actions">
              {/* Résumé modal trigger — styled like the original link */}
              <button
                type="button"
                className="link-chip link-chip-btn"
                aria-haspopup="dialog"
                aria-controls="resume-dialog"
                onClick={() => setResumeOpen(true)}
                onMouseEnter={resumePref.prefetch}
                onFocus={resumePref.prefetch}
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

              {/* Certifications modal trigger — same chip styling */}
              <button
                type="button"
                className="link-chip link-chip-btn"
                aria-haspopup="dialog"
                aria-controls="certs-dialog"
                onClick={() => setCertsOpen(true)}
                onMouseEnter={prefetchCerts}
                onFocus={prefetchCerts}
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
              </button>
            </div>
          </div>

          {/* RIGHT */}
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

      {/* Modals */}
      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        src={RESUME_PATH}
      />
      <CertsModal
        open={certsOpen}
        onClose={() => setCertsOpen(false)}
        items={CERT_ITEMS}
      />
    </>
  );
}
