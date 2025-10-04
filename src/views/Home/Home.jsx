import React from 'react'
import './Home.css'

export default function Home() {
  return (
    <section id="panel-home" className="view panel" role="tabpanel" aria-labelledby="tab-home">
      <div>
  <h1 className="title">Hi, I’m <span style={{color:'var(--accent)'}}>You</span>.</h1>
  <p className="subtitle">Full‑stack developer focused on Java, Spring, SQL & performant UIs.</p>
  <div style={{height:24}} />
  <div className="grid">
    <div className="card"><strong>Stack</strong><br/>Java • Spring • PostgreSQL</div>
    <div className="card"><strong>Frontend</strong><br/>React • Vite • REST</div>
    <div className="card"><strong>Tooling</strong><br/>Git • Docker • AWS</div>
    <div className="card"><strong>Status</strong><br/>Open to roles</div>
  </div>
</div>

    </section>
  )
}
