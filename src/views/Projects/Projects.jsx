// src/Projects/Projects.jsx
import React from "react";
import "./Projects.css";
import { items } from "../../js/projectsData.js";
import ProjectCard from "./ProjectCard/ProjectCard.jsx";
import LivePreviewModal from "./LivePreviewModal/LivePreviewModal.jsx";

export default function Projects() {
  const [activePreview, setActivePreview] = React.useState(null);
  const [hoveredProject, setHoveredProject] = React.useState(null);

  // ESC to close live preview modal
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActivePreview(null);
    if (activePreview) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePreview]);

  return (
    <section
      id="panel-projects"
      className="view panel projects-view"
      role="tabpanel"
      aria-labelledby="tab-projects"
    >
      <div className="projects-wrap">
        <h2 className="projects-title">Projects</h2>
        <p className="projects-subtitle">
          Selected work — hover for info, click to open.
        </p>

        {/* Persist last hovered selection by NOT clearing on leave */}
        <div className="projects-hover-scope">
          <div className="projects-grid grid">
            {items.map((p, idx) => (
              <ProjectCard
                key={p.name}
                project={p}
                side={idx % 2 === 0 ? "left" : "right"}
                onHoverIn={(proj) => setHoveredProject(proj)}
              />
            ))}
          </div>

          {/* Bottom description panel — shows last hovered */}
          <div
            className={`projects-details ${hoveredProject ? "is-open" : ""}`}
          >
            {hoveredProject && (
              <div className="projects-details-inner">
                <h3 className="projects-details-title">
                  {hoveredProject.name}
                </h3>
                <p className="projects-details-text">
                  {hoveredProject.details}
                </p>

                {!!hoveredProject.liveUrl && (
                  <button
                    className="projects-details-btn"
                    onClick={() =>
                      window.open(
                        hoveredProject.liveUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    Open Live Preview ↗
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <LivePreviewModal
        project={activePreview}
        onClose={() => setActivePreview(null)}
      />
    </section>
  );
}
