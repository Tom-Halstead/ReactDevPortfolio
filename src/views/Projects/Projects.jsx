import React from 'react'
import Card from '../../components/Card/Card.jsx'
import './Projects.css'

const items = [
  {name:'Expense Tracker API', url:'https://github.com/your-username/expense-tracker'},
  {name:'Content Aggregator', url:'https://github.com/your-username/content-aggregator'},
  {name:'Auction App', url:'https://github.com/your-username/auction-app'},
  {name:'Portfolio Site', url:'https://github.com/your-username/portfolio'}
]

export default function Projects(){
  return (
    <section id="panel-projects" className="view panel" role="tabpanel" aria-labelledby="tab-projects">
      <div>
        <h2 className="title">Projects</h2>
        <p className="subtitle">Selected work (links open in a new tab).</p>
        <div className="grid">
          {items.map(p => (
            <Card key={p.name} href={p.url}>
              <strong>{p.name}</strong>
              <div className="subtitle">GitHub Repository</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
