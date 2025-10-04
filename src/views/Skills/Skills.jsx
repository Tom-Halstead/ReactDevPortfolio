import React from 'react'
import './Skills.css'

export default function Skills() {
  return (
    <section id="panel-skills" className="view panel" role="tabpanel" aria-labelledby="tab-skills">
      <div>
  <h2 className="title">Skills</h2>
  <p className="subtitle">Daily drivers & familiar tools.</p>
  <div className="grid">
    {['Java','Spring Boot','PostgreSQL','React','Node.js','REST APIs','Docker','AWS','JUnit','Git'].map(s => (
      <div key={s} className="card" aria-label={s}>{s}</div>
    ))}
  </div>
</div>

    </section>
  )
}
