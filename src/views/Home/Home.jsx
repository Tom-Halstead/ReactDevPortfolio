import React from 'react'
import Card from '../../components/Card/Card.jsx'
import './Home.css'

export default function Home(){
  return (
    <section id="panel-home" className="view panel" role="tabpanel" aria-labelledby="tab-home">
      <div>
        <h1 className="title">Hi, I’m <span style={{color:'var(--accent)'}}>You</span>.</h1>
        <p className="subtitle">Full-stack developer focused on Java, Spring, SQL & performant UIs.</p>
        <div style={{height:24}} />
        <div className="grid">
          <Card><strong>Stack</strong><br/>Java • Spring • PostgreSQL</Card>
          <Card><strong>Frontend</strong><br/>React • Vite • REST</Card>
          <Card><strong>Tooling</strong><br/>Git • Docker • AWS</Card>
          <Card><strong>Status</strong><br/>Open to roles</Card>
        </div>
      </div>
    </section>
  )
}
