import React from "react";
import "./SkillPanel.css";
import SkillPill from "../SkillPill/SkillPill.jsx";

export default function SkillPanel({ items = [] }) {
  return (
    <div className="skill-panel" role="region" aria-live="polite">
      <ul className="pill-list">
        {items.map((item) => (
          <SkillPill key={item.key} item={item} />
        ))}
      </ul>
    </div>
  );
}
