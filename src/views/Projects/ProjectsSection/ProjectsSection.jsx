import React from "react";
import "./ProjectsSection.css";
import { items } from "../js/projectsData.js";
import ProjectCard from "./ProjectCard/ProjectCard.jsx";
import LivePreviewModal from "./LivePreviewModal/LivePreviewModal.jsx";
import Card from "../components/Card/Card.jsx";

export default function ProjectsSection() {
  const [activePreview, setActivePreview] = React.useState(null);

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

        <div className="projects-grid grid">
          {items.map((p, idx) => {
            const side = idx % 2 === 0 ? "left" : "right";
            return (
              <ProjectCard
                key={p.name}
                project={p}
                side={side}
                Card={Card}
                onLivePreview={() => setActivePreview(p)}
              />
            );
          })}
        </div>
      </div>

      <LivePreviewModal
        project={activePreview}
        onClose={() => setActivePreview(null)}
      />
    </section>
  );
}
