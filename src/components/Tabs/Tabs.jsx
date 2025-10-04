import React from 'react'
import './Tabs.css'

const items = [
  {key:'home', label:'Home'},
  {key:'projects', label:'Projects'},
  {key:'skills', label:'Skills'},
]

export default function Tabs({active, onChange}){
  return (
    <nav className="tabs" role="tablist" aria-label="Sections">
      {items.map(({key, label}) => (
        <button
          key={key}
          role="tab"
          aria-selected={active===key}
          aria-controls={`panel-${key}`}
          id={`tab-${key}`}
          className={active===key ? 'tab is-active' : 'tab'}
          onClick={() => onChange(key)}
        >
          <span>{label}</span>
          {active===key && <span className="indicator" aria-hidden />}
        </button>
      ))}
    </nav>
  )
}
