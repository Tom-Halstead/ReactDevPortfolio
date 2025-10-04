import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <span className="brand">
          <span className="dot" aria-hidden="true">
            ●
          </span>
          <strong>Tom</strong>
        </span>

        <span className="sep" aria-hidden="true">
          •
        </span>

        <span>© {year} Tom.</span>

        <span className="sep" aria-hidden="true">
          •
        </span>

        <span>Built with React + Vite</span>
      </div>
    </footer>
  );
}
