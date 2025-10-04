import React from 'react'
import './Footer.css'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        <span>© {year} You.</span>
        <span className="sep" aria-hidden>•</span>
        <span>Built with React + Vite</span>
      </div>
    </footer>
  )
}
