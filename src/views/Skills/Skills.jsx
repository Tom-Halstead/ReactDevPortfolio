import React from "react";
import "./Skills.css";

import { SKILLS_DATA, SKILL_CATEGORIES } from "../../js/skillsData.js";
import SkillTabs from "../Skills/SkillsTabs/SkillsTabs.jsx";
import SkillPanel from "../Skills/SkillPanel/SkillPanel.jsx";

export default function Skills() {
  const [active, setActive] = React.useState("Frontend");

  return (
    <section
      id="panel-skills"
      className="view panel"
      role="tabpanel"
      aria-labelledby="tab-skills"
    >
      <div className="skills-wrap">
        <h2 className="title">Skills</h2>
        <p className="subtitle">
          Hover a tab once to reveal and lock its details (tap/click on mobile).
        </p>

        <SkillTabs
          categories={SKILL_CATEGORIES}
          active={active}
          onChange={setActive}
        />

        <SkillPanel items={SKILLS_DATA[active]} />
      </div>
    </section>
  );
}
