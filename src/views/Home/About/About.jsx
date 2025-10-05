// src/components/About/About.jsx
import React from "react";
import Card from "../../../components/Card/Card.jsx";
import "./About.css";
// import PanelCard from "../PanelCard/PanelCard.jsx";

export default function About({
  id,
  title,
  intro,
  chips = [],
  items = [],
  defaultOpenDesktop = true,
  defaultOpenMobile = false,
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [open, setOpen] = React.useState(defaultOpenDesktop);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const apply = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setOpen(mobile ? defaultOpenMobile : defaultOpenDesktop);
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, [defaultOpenDesktop, defaultOpenMobile]);

  const bodyId = `${id}-body`;
  const orderClass =
    id === "about-home"
      ? "about-home"
      : id === "about-work"
      ? "about-work"
      : "";

  return (
    <Card
      className={`about-card home-card ${orderClass} ${
        isMobile && !open ? "is-collapsed" : ""
      }`}
    >
      <div className="about-header">
        <strong className="card-title">
          <span className="dot" aria-hidden="true">
            ●
          </span>
          {title}
        </strong>
        <button
          type="button"
          className={`about-toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
          title={open ? "Collapse" : "Expand"}
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
        id={bodyId}
        className="about-body"
        aria-hidden={isMobile ? !open : false}
      >
        {intro && <p className="card-text">{intro}</p>}

        {chips?.length > 0 && (
          <div className="about-chip-row">
            {chips.map((c, i) => (
              <span className="about-chip" key={i}>
                {c}
              </span>
            ))}
          </div>
        )}

        {items?.length > 0 && (
          <ul className="about-list">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
