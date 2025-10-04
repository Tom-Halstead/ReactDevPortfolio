import React, { useMemo, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Tabs from './components/Tabs/Tabs.jsx'
import Footer from './components/Footer/Footer.jsx'

import Home from './views/Home/Home.jsx'
import Projects from './views/Projects/Projects.jsx'
import Skills from './views/Skills/Skills.jsx'

import './App.css'

const VIEWS = {
  home: Home,
  projects: Projects,
  skills: Skills,
}

export default function App() {
  const [active, setActive] = useState('home')
  const ActiveView = useMemo(() => VIEWS[active] ?? Home, [active])

  return (
    <div className="app-shell" role="application" aria-label="Portfolio tabs">
      <Header />
      <Tabs active={active} onChange={setActive} />
      <main className="viewport" aria-live="polite">
        <ActiveView />
      </main>
      <Footer />
    </div>
  )
}
