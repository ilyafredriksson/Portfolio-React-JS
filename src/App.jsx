import React from 'react'
import HeroSection from './components/sections/HeroSection'
import About from './components/About'
import Skills from './components/Skills'
import SecuritySection from './components/sections/SecuritySection'
import Projects from './components/Projects'
import ContactSection from './components/sections/ContactSection'
import Navigation from './components/Navigation'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/common/ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Navigation />
        <HeroSection />
        <About />
        <Skills />
        <SecuritySection />
        <Projects />
        <ContactSection />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

export default App
