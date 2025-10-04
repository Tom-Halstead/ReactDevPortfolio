import React, { useState } from "react";
import "./Skills.css";

/**
 * Icons live in: public/logos/<filename>
 * We point directly via the "file" field.
 * If "file" is omitted, we try `${key}-icon.*` then `${key}.*`.
 * Supported extensions: png, svg, gif, jpg, jpeg.
 */

const DATA = {
  Frontend: [
    { key: "aws", label: "AWS", file: "aws-icon.png" },
    { key: "react", label: "React", file: "react-icon.png" },
    { key: "vite", label: "Vite", file: "vite-icon.png" },
    { key: "html5", label: "HTML", file: "html5-icon.png" },
    { key: "css3", label: "CSS", file: "css3-icon.png" },
    { key: "javascript", label: "JavaScript", file: "javascript-icon.png" },
    { key: "typescript", label: "TypeScript (learning)" }, // no file yet
    { key: "vuejs", label: "Vue (learning)", file: "vue-icon.png" },
    {
      key: "responsive",
      label: "Responsive Layouts",
      file: "responsive-icon.png",
    },
    // { key: "", label: "Accessibility (ARIA basics)" },
  ],

  Backend: [
    { key: "java", label: "Java", file: "java-icon.png" },
    { key: "spring", label: "Spring Boot", file: "springboot-icon.png" },
    { key: "spring", label: "Spring Security", file: "springboot-icon.png" },
    { key: "node", label: "Node.JS", file: "node-icon.png" },
    // { key: "hibernate", label: "JPA / Hibernate" },
    { key: "postgresql", label: "PostgreSQL", file: "sql-icon.png" },
    // { key: "", label: "JDBC / JdbcTemplate" },
    { key: "restful", label: "REST APIs", file: "resfulApi-icon.png" }, // your exact filename
    { key: "jwt", label: "JWT", file: "jwt-icon.png" },
    { key: "aws", label: "AWS", file: "aws-icon.png" },
    {
      key: "junit",
      label: "Unit & Integration Testing (JUnit)",
      file: "junit-icon.png",
    },
  ],

  Tools: [
    { key: "aws", label: "AWS", file: "aws-icon.png" },
    { key: "git", label: "Git", file: "git-icon.png" },
    { key: "github", label: "GitHub", file: "github-icon.gif" },
    { key: "docker", label: "Docker", file: "docker-icon.png" },
    { key: "nodejs", label: "Node.js", file: "node-icon.png" },
    { key: "npm", label: "npm", file: "npm-icon.png" },
    // { key: "gradle", label: "Gradle" },
    // { key: "maven", label: "Maven" },
    { key: "postman", label: "Postman", file: "postman-icon.png" },
    { key: "curl", label: "cURL", file: "curl-icon.png" },
    // { key: "intellij", label: "IntelliJ IDEA" },
  ],

  Concepts: [
    { key: "", label: "API Integrations" },
    { key: "", label: "User Authentication & Authorization" },
    { key: "", label: "Token-based Auth (JWT, OAuth2)" },
    { key: "", label: "DTO Mapping & Validation" },
    { key: "", label: "Cloud Deployment (AWS basics)" },
    { key: "", label: "Database Modeling & SQL" },
    { key: "", label: "Testing Strategy" },
    { key: "", label: "Clean Architecture Principles" },
  ],
};

const CATEGORIES = Object.keys(DATA);
const exts = ["png", "svg", "gif", "jpg", "jpeg"];

export default function Skills() {
  const [active, setActive] = useState("Frontend");

  // Build candidate paths. If "file" is provided, we use that first.
  const resolveLogoSrcs = ({ key, file }) => {
    if (!key && !file) return [];
    const base = `${import.meta.env.BASE_URL ?? "/"}logos`; // robust for subpaths

    const tries = file ? [`${base}/${file}`] : [];

    if (key) {
      exts.forEach((ext) => tries.push(`${base}/${key}-icon.${ext}`));
      exts.forEach((ext) => tries.push(`${base}/${key}.${ext}`));
    }

    return tries;
  };

  const Logo = ({ item }) => {
    const candidates = resolveLogoSrcs(item);
    if (!candidates.length) return null;

    const handleError = (e) => {
      const el = e.currentTarget;
      const current = el.getAttribute("src");
      const idx = candidates.indexOf(current);
      if (idx >= 0 && idx < candidates.length - 1) {
        el.setAttribute("src", candidates[idx + 1]);
      } else {
        el.style.display = "none";
      }
    };

    return (
      <img
        className="logo-50"
        src={candidates[0]}
        alt={`${item.label} logo`}
        width="50"
        height="50"
        loading="lazy"
        onError={handleError}
      />
    );
  };

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

        <div
          className="skill-tabs"
          role="tablist"
          aria-label="Skill categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              className={active === cat ? "skill-tab is-active" : "skill-tab"}
              onMouseEnter={() => setActive(cat)}
              onFocus={() => setActive(cat)}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skill-panel" role="region" aria-live="polite">
          <ul className="pill-list">
            {DATA[active].map((item) => (
              <li key={item.label} className="pill">
                <div className="pill-title">{item.label}</div>
                <Logo item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
