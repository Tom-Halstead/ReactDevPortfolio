// src/Projects/ProjectCard/ProjectCard.jsx
import React from "react";
import Card from "../../../components/Card/Card.jsx";
import "./ProjectCard.css";
import TechStack from "../TechStack/TechStack.jsx";

export default function ProjectCard({
  project,
  side = "left",
  onHoverIn, // called when the card is hovered/focused
}) {
  const isVita = Boolean(project.liveUrl) && project.name === "VitaNova";
  const cardHref = isVita ? project.liveUrl : project.url;

  return (
    // Emits hover/focus events to parent (no visual change)
    <div
      className="project-card-wrap"
      onMouseEnter={() => onHoverIn?.(project)}
      onFocus={() => onHoverIn?.(project)}
    >
      <Card
        href={cardHref}
        className={`project-card ${
          side === "right" ? "side-right" : "side-left"
        }`}
        tabIndex={0}
      >
        <header className="project-card-head">
          <div className="project-card-dot" aria-hidden="true">
            ●
          </div>
          <h3 className="project-card-title">{project.name}</h3>
        </header>

        <p className="project-card-blurb">{project.blurb}</p>
        <TechStack stack={project.stack} />

        <div className="project-card-cta" aria-hidden="false">
          <button
            type="button"
            className="project-card-cta-pill project-card-cta-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(project.url, "_blank", "noopener,noreferrer");
            }}
            title="Open repository on GitHub"
          >
            Open on GitHub →
          </button>
        </div>

        {/* Side hover flyout removed entirely */}

        <span className="project-card-glow" aria-hidden="true" />
      </Card>
    </div>
  );
}
