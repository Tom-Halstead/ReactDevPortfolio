import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        {/* LEFT SIDE */}
        <div className="footer-left">
          <span className="brand">
            <span className="dot">●</span>
            Tom's Portfolio
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

        {/* CENTER DIVIDER */}
        <div className="footer-divider" aria-hidden="true"></div>

        {/* RIGHT SIDE */}
        <div className="footer-right">
          <a
            href="mailto:tom.michael.halstead@gmail.com"
            className="contact-link"
          >
            tom.michael.halstead@gmail.com
          </a>
          <span className="contact-location">📍 United States</span>

          {/* Resume / Certifications Links */}
          <div className="footer-actions">
            <a
              href="/resume.pdf"
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
              >
                <path d="M12 11v8m0 0l-3-3m3 3l3-3" />
                <path d="M3 19a9 9 0 0 1 18 0" />
              </svg>
              Résumé
            </a>

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
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M8 14v7l4-2 4 2v-7" />
              </svg>
              Certifications
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
