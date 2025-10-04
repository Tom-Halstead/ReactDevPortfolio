import React, { useState } from 'react'
import './Skills.css'

// Derived from your previous chats & project context
const DATA = {
  Frontend: [
    'React', 'Vite', 'HTML', 'CSS', 'JavaScript', 'TypeScript (learning)',
    'Vue (learning)', 'Responsive Layouts', 'Accessibility (ARIA basics)'
  ],
  Backend: [
    'Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate',
    'PostgreSQL', 'JDBC / JdbcTemplate', 'REST APIs', 'JWT',
    'AWS Cognito OAuth2', 'Unit & Integration Testing (JUnit)'
  ],
  Tools: [
    'Git', 'GitHub', 'Docker', 'Node.js', 'npm', 'Gradle/Maven',
    'Postman', 'cURL', 'IntelliJ IDEA'
  ],
  Concepts: [
    'API Integrations', 'User Authentication & Authorization',
    'Token-based Auth (JWT, OAuth2)', 'DTO Mapping & Validation',
    'Content Aggregation', 'External News/Reddit APIs',
    'Cloud Deployment (AWS basics)', 'Database Modeling & SQL',
    'Testing Strategy', 'Clean Architecture Principles'
  ]
}

const CATEGORIES = Object.keys(DATA)

export default function Skills() {
  const [active, setActive] = useState('Frontend')

  return (
    <section id="panel-skills" className="view panel" role="tabpanel" aria-labelledby="tab-skills">
      <div className="skills-wrap">
        <h2 className="title">Skills</h2>
        <p className="subtitle">Hover a tab once to reveal and lock its details (tap/click on mobile).</p>

        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={active===cat}
              className={active===cat ? 'skill-tab is-active' : 'skill-tab'}
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
            {DATA[active].map(item => (
              <li key={item} className="pill">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
