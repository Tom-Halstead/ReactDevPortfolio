import React from "react";
import "./Header.css";

function useTheme() {
  const getInitial = () => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia?.("(prefers-color-scheme: light)")?.matches) {
      return "light";
    }
    return "dark";
  };

  const [theme, setTheme] = React.useState(getInitial);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return { theme, toggle };
}

export default function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  // Close menu on outside click or ESC
  React.useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", onClick);
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="bar" role="banner">
      {/* Dock container */}
      <div className="bar-inner">
        <div className="brand" aria-label="Site brand">
          <span className="dot" aria-hidden>
            ●
          </span>
          <strong>&#60;Tom-Halstead /&#62;</strong>
        </div>

        {/* Desktop / wide actions */}
        <div className="actions actions-wide" aria-label="Header actions">
          <button
            className="ghost"
            onClick={toggle}
            aria-label="Toggle color theme"
          >
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
          <a
            href="mailto:tom.michael.halstead@gmail.com"
            className="ghost"
            aria-label="Send email"
          >
            Email
          </a>
          <a
            href="https://github.com/tom-halstead"
            rel="noreferrer"
            className="primary"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/tomhalsteadeveloper/"
            target="_blank"
            rel="noreferrer"
            className="primary"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
        </div>

        {/* Compact menu on small screens */}
        <div className="menu" ref={menuRef}>
          <button
            className="menu-trigger"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Open header menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
          {open && (
            <div className="menu-panel" role="menu">
              <button
                className="menu-item"
                role="menuitem"
                onClick={() => {
                  toggle();
                  setOpen(false);
                }}
              >
                {theme === "light" ? "Dark" : "Light"} mode
              </button>
              <a
                className="menu-item"
                role="menuitem"
                href="mailto:tom.michael.halstead@gmail.com"
                onClick={() => setOpen(false)}
              >
                Email
              </a>
              <a
                className="menu-item"
                role="menuitem"
                href="https://github.com/tom-halstead"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                GitHub
              </a>
              <a
                className="menu-item"
                role="menuitem"
                href="https://www.linkedin.com/in/tomhalsteadeveloper/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
