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
        </div>
      </div>
    </footer>
  );
}
