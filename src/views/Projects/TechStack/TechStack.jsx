import React from "react";
import "./TechStack.css";
import { iconPathCandidates } from "../../../js/logosMap.js";

function Logo({ name }) {
  const candidates = React.useMemo(() => iconPathCandidates(name), [name]);
  const [i, setI] = React.useState(0);
  if (!candidates.length) return null;

  return (
    <img
      className="stack-ico"
      src={candidates[i]}
      alt={`${name} logo`}
      width="18"
      height="18"
      loading="lazy"
      onError={() => {
        if (i < candidates.length - 1) setI(i + 1);
      }}
    />
  );
}

export default function TechStack({ stack = [] }) {
  return (
    <ul className="stack-row" aria-label="Tech stack">
      {stack.map((s) => (
        <li key={s} className="stack-pill">
          <Logo name={s} />
          <span className="stack-text">{s}</span>
        </li>
      ))}
    </ul>
  );
}
