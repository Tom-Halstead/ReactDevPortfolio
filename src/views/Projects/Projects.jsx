import React from "react";
import Card from "../../components/Card/Card.jsx";
import "./Projects.css";

/** ---------- Project Data ---------- */
const items = [
  {
    name: "VitaNova",
    url: "https://github.com/tom-halstead/vitanova",
    liveUrl: "https://vitanova-app.com",
    blurb:
      "Health & fitness goals tracker with secure auth and progress dashboards.",
    stack: ["java", "spring", "react", "postgresql", "aws"],
    details:
      "Full-stack wellness app where users set goals (habits, workouts, nutrition), log daily activity, and visualize progress over time. Backend is Spring Boot with JPA/Flyway on PostgreSQL; frontend is React. Authentication via OAuth2/OIDC (Amazon Cognito) with a JWT-protected API. Containerized and deployed on AWS App Runner from ECR, connected privately to RDS through a VPC connector + NAT; CI/CD via GitHub Actions.",
  },
  {
    name: "Expense Tracker CLI/API",
    url: "https://github.com/tom-halstead/expensetracker",
    blurb:
      "Java + Spring Boot REST service for expense categories, reports, and CSV import.",
    stack: ["java", "spring", "postgresql", "jwt"],
    details:
      "JWT-secured Spring Boot API for managing users, expenses, categories, budgets, and income. Implements layered architecture with repositories, validation, and reporting logic. Features include recurring expenses, monthly summaries, and CSV data import/export using PostgreSQL.",
  },
  {
    name: "Content Aggregator API",
    url: "https://github.com/tom-halstead/ContentAggregator",
    blurb: "Aggregates articles from external APIs with caching and filtering.",
    stack: ["nodejs", "javascript", "postgresql"],
    details:
      "Content aggregation service that fetches and filters news and Reddit posts from multiple APIs. Features external API integration, caching, deduplication, dynamic category filtering, user-customized sources, and relevance-based scoring with PostgreSQL storage.",
  },
  {
    name: "Portfolio Site",
    url: "https://github.com/Tom-Halstead/Tom-halstead.github.io",
    blurb: "Personal site with React + Vite and accessible UI patterns.",
    stack: ["react", "vite", "css3"],
    details:
      "Personal portfolio built with React and Vite, focusing on accessibility and performance. Includes dark/light theme support, no-scroll tabbed navigation, responsive layouts, and semantic ARIA patterns for fully keyboard-accessible design.",
  },
];

/** ---------- Icon Resolution (matches your public/logos files) ---------- */
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
  docker: "docker-icon.png",
  npm: "npm-icon.png",
  git: "git-icon.png",
  postman: "postman-icon.png",
  curl: "curl-icon.png",
};

const exts = ["png", "svg", "gif", "jpg", "jpeg"];

/** Respect Vite base (e.g., GitHub Pages subpath) */
const publicUrl = (p) => {
  const base = import.meta.env.BASE_URL ?? "/";
  const b = base.endsWith("/") ? base : base + "/";
  const rel = p.startsWith("/") ? p.slice(1) : p;
  return b + rel; // -> "/react-dev-portfolio/logos/..."
};

const iconPathCandidates = (key) => {
  if (!key) return [];
  const base = "logos";
  const tries = [];
  if (STACK_ICON[key]) tries.push(publicUrl(`${base}/${STACK_ICON[key]}`));
  exts.forEach((ext) => tries.push(publicUrl(`${base}/${key}-icon.${ext}`)));
  exts.forEach((ext) => tries.push(publicUrl(`${base}/${key}.${ext}`)));
  return tries;
};

const Logo = ({ name }) => {
  const candidates = iconPathCandidates(name);
  if (!candidates.length) return null;

  const onErr = (e) => {
    const el = e.currentTarget;
    const src = el.getAttribute("src");
    const i = candidates.indexOf(src);
    if (i < candidates.length - 1) el.setAttribute("src", candidates[i + 1]);
    else el.style.display = "none";
  };

  return (
    <img
      className="stack-ico"
      src={candidates[0]}
      alt={`${name} logo`}
      width="18"
      height="18"
      loading="lazy"
      onError={onErr}
    />
  );
};

/** ---------- Component ---------- */
export default function Projects() {
  const [activePreview, setActivePreview] = React.useState(null);

  // ESC to close live preview modal
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActivePreview(null);
    };
    if (activePreview) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePreview]);

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
          Selected work — hover for info, click to open.
        </p>

        <div className="grid projects-grid">
          {items.map((p, idx) => {
            const sideClass = idx % 2 === 0 ? "side-left" : "side-right";
            const isVita = Boolean(p.liveUrl) && p.name === "VitaNova";

            // Card click target:
            // - VitaNova -> live site
            // - Others   -> GitHub repo
            const cardHref = isVita ? p.liveUrl : p.url;

            return (
              <Card
                key={p.name}
                href={cardHref}
                className={`project-card ${sideClass}`}
                tabIndex={0} /* focus keeps flyout visible for keyboard */
              >
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

                <div className="project-cta" aria-hidden="false">
                  {/* Keep it a button so we don't nest anchors inside Card */}
                  <button
                    type="button"
                    className="cta-pill cta-btn"
                    onClick={(e) => {
                      e.preventDefault(); // prevent Card <a> navigation
                      e.stopPropagation();
                      window.open(p.url, "_blank", "noopener,noreferrer");
                    }}
                    title="Open repository on GitHub"
                  >
                    Open on GitHub →
                  </button>
                </div>

                {/* Side flyout with details (no flicker) */}
                <aside className="flyout" aria-hidden="true">
                  <div className="flyout-inner">
                    <h4 className="flyout-title">{p.name}</h4>
                    <p className="flyout-text">{p.details}</p>

                    {/* Keep live preview modal for projects that have liveUrl */}
                    {p.liveUrl && (
                      <button
                        type="button"
                        className="live-preview-btn"
                        onClick={(e) => {
                          e.preventDefault(); // Card has href
                          e.stopPropagation();
                          setActivePreview(p);
                        }}
                      >
                        Open Live Preview ↗
                      </button>
                    )}
                  </div>
                </aside>

                <span className="glow" aria-hidden="true" />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Fullscreen live preview overlay (VitaNova) */}
      {activePreview && (
        <div
          className="preview-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activePreview.name} live preview`}
          onClick={() => setActivePreview(null)}
        >
          <div className="preview-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="preview-close"
              onClick={() => setActivePreview(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <iframe
              className="preview-frame-large"
              src={activePreview.liveUrl}
              title={`${activePreview.name} live preview`}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </section>
  );
}
