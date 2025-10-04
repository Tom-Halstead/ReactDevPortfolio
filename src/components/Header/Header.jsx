import React from "react";
import "./Header.css";

function useTheme() {
  const getInitial = () => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
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

  return (
    <header className="bar" role="banner">
      <div className="brand">
        <span className="dot" aria-hidden>
          ●
        </span>
        <strong>&#60;Tom-Halstead /&#62;</strong>
      </div>
      <div className="spacer" />
      <div className="actions">
        <button
          className="ghost"
          onClick={toggle}
          aria-label="Toggle color theme"
        >
          {theme === "light" ? "Dark" : "Light"} mode
        </button>
        <a
          href="mailto:me@example.com"
          className="ghost"
          aria-label="Send email"
        >
          Email
        </a>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noreferrer"
          className="primary"
          aria-label="GitHub profile"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
