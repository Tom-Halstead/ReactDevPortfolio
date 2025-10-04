import React from 'react'
import './Projects.css'

export default function Projects() {
  return (
    <section id="panel-projects" className="view panel" role="tabpanel" aria-labelledby="tab-projects">
      <div>
  <h2 className="title">Projects</h2>
  <p className="subtitle">Selected work (links open in a new tab).</p>
  <div className="grid">
    {[
      {name:'Expense Tracker API', url:'https://github.com/your-username/expense-tracker'},
      {name:'Content Aggregator', url:'https://github.com/your-username/content-aggregator'},
      {name:'Auction App', url:'https://github.com/your-username/auction-app'},
      {name:'Portfolio Site', url:'https://github.com/your-username/portfolio'}
    ].map(p => (
      <a key={p.name} className="card" href={p.url} target="_blank" rel="noreferrer">
        <strong>{p.name}</strong>
        <div className="subtitle">GitHub Repository</div>
      </a>
    ))}
  </div>
</div>

    </section>
  )
}
