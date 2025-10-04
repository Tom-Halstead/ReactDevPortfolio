import React from 'react'
import './Header.css'

export default function Header(){
  return (
    <header className="bar" role="banner">
      <div className="brand">
        <span className="dot" aria-hidden>●</span>
        <strong>react-dev-portfolio</strong>
      </div>
      <div className="spacer" />
      <div className="actions">
        <a href="mailto:me@example.com" className="ghost" aria-label="Send email">Email</a>
        <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="primary" aria-label="GitHub profile">GitHub</a>
      </div>
    </header>
  )
}
