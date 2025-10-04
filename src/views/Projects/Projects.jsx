import React from "react";
import Card from "../../components/Card/Card.jsx";
import "./Projects.css";

// You can tweak copy/stacks per project. URLs stay the same.
const items = [
  {
    name: "Expense Tracker API",
    url: "https://github.com/tom-halstead/expense-tracker",
    blurb:
      "Java + Spring Boot REST service for expense categories, reports, and CSV import.",
    stack: ["java", "spring", "postgresql", "jwt"],
  },
  {
    name: "Content Aggregator",
    url: "https://github.com/tom-halstead/ContentAggregator",
    blurb: "Aggregates articles from external APIs with caching and filtering.",
    stack: ["nodejs", "javascript", "postgresql"],
  },
  {
    name: "VitaNova",
    url: "https://github.com/tom-halstead/vitanova",
    blurb:
      "Bidding platform with auth and watchlists, built with a REST backend.",
    stack: ["java", "spring", "react"],
  },
  {
    name: "Portfolio Site",
    url: "https://github.com/tom-halstead/portfolio",
    blurb:
      "Your personal site, built with React + Vite and accessible UI patterns.",
    stack: ["react", "vite", "css3"],
  },
];

/** Map stack keys -> actual filenames in public/logos/ */
const STACK_ICON = {
  spring: "springboot-icon.png",
  postgresql: "sql-icon.png",
  nodejs: "node-icon.png",
  java: "java-icon.png",
  jwt: "jwt-icon.png",
  react: "react-icon.png",
  vite: "vite-icon.png",
  css3: "css3-icon.png",
  javascript: "javascript-icon.png",
  github: "github-icon.gif",
  docker: "docker-icon.png",
  npm: "npm-icon.png",
  git: "git-icon.png",
  postman: "postman-icon.png",
  curl: "curl-icon.png",
};

/** Build a public URL that respects Vite's base (works under subpaths) */
const publicUrl = (p) => {
  const base = import.meta.env.BASE_URL ?? "/";
  const b = base.endsWith("/") ? base : base + "/";
  const rel = p.startsWith("/") ? p.slice(1) : p;
  return b + rel; // e.g. "/logos/..." or "/react-dev-portfolio/logos/..."
};

// Helper: render small colored icons from /public/logos/*.*
const exts = ["png", "svg", "gif", "jpg", "jpeg"];
const iconPathCandidates = (key) => {
  if (!key) return [];
  const base = "logos";
  const tries = [];

  // 1) explicit filename mapping first (fixes spring/sql/nodejs)
  if (STACK_ICON[key]) tries.push(publicUrl(`${base}/${STACK_ICON[key]}`));

  // 2) fallbacks by convention
  exts.forEach((ext) => tries.push(publicUrl(`${base}/${key}-icon.${ext}`)));
  exts.forEach((ext) => tries.push(publicUrl(`${base}/${key}.${ext}`)));

  return tries;
};

const Logo = ({ name }) => {
  const candidates = iconPathCandidates(name);
  if (candidates.length === 0) return null;

  const onErr = (e) => {
    const el = e.currentTarget;
    const src = el.getAttribute("src");
    const i = candidates.indexOf(src);
    if (i < candidates.length - 1) {
      el.setAttribute("src", candidates[i + 1]);
    } else {
      el.style.display = "none";
    }
  };
  return (
    <img
      className="stack-ico"
      src={candidates[0]}
      alt={`${name} logo`}
      width="22"
      height="22"
      loading="lazy"
      onError={onErr}
    />
  );
};

export default function Projects() {
  return (
    <section
      id="panel-projects"
      className="view panel"
      role="tabpanel"
      aria-labelledby="tab-projects"
    >
      <div className="projects-wrap">
        <h2 className="title">Projects</h2>
        <p className="subtitle">
          Selected work — hover for tech, click to open.
        </p>

        <div className="grid projects-grid">
          {items.map((p) => (
            <Card key={p.name} href={p.url} className="project-card">
              <header className="project-head">
                <div className="dot" aria-hidden="true">
                  ●
                </div>
                <h3 className="project-title">{p.name}</h3>
              </header>

              <p className="project-blurb">{p.blurb}</p>

              <ul className="stack-row" aria-label="Tech stack">
                {p.stack?.map((s) => (
                  <li key={s} className="stack-pill">
                    <Logo name={s} />
                    <span className="stack-text">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="project-cta" aria-hidden="true">
                <span className="cta-pill">Open on GitHub →</span>
              </div>

              <span className="glow" aria-hidden="true" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
