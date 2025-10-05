import React from "react";
import "./SkillPill.css";
import Logo from "../../../components/Logo/Logo.jsx";

export default function SkillPill({ item }) {
  const showIcon =
    item.file ||
    (item.key && item.key !== "" && !String(item.key).startsWith("concept"));

  return (
    <li className="pill">
      <div className="pill-title">{item.label}</div>
      {showIcon ? <Logo item={item} /> : null}
    </li>
  );
}
