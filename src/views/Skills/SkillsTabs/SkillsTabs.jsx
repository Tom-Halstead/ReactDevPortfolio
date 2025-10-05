import React from "react";
import "./SkillsTabs.css";

export default function SkillTabs({ categories = [], active, onChange }) {
  return (
    <div className="skill-tabs" role="tablist" aria-label="Skill categories">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={active === cat ? "skill-tab is-active" : "skill-tab"}
          onMouseEnter={() => onChange?.(cat)}
          onFocus={() => onChange?.(cat)}
          onClick={() => onChange?.(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
