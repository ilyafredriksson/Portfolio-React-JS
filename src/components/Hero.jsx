import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaDownload, FaCode, FaRocket, FaLightbulb, FaLock, FaBug, FaShieldAlt } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSkill, setCurrentSkill] = useState(0)
  
  const skills = ['React', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'MongoDB']
  
  // Professionella tekniska termer
  const professionalElements = [
    'TypeScript', 'React.js', 'Next.js', 'Node.js', 'REST API', 'GraphQL',
    'CI/CD', 'Git', 'Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL',
    'Agile', 'Scrum', 'TDD', 'Jest', 'Cypress', 'WebPack', 'Vite'
  ]
  
  // Professionella kodelement
  const codeElements = [
    'function()', 'const', 'async/await', 'Promise', 'React.Component',
    'useState()', 'useEffect()', 'API', 'JSON', 'HTML5', 'CSS3', 'ES6+'
  ]
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const interval = setInterval(() => {
      setCurrentSkill(prev => (prev + 1) % skills.length)
    }, 2000)
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      {/* Interactive Security Background */}
      <div className="hero-bg">
        {/* Kod animation */}
        <div className="binary-rain">
          {codeElements.map((code, i) => (
            <motion.div
              key={`code-${i}`}
              className="binary-code"
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: window.innerHeight + 100, 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${0.8 + Math.random() * 0.4}rem`
              }}
            >
              {code}
            </motion.div>
          ))}
        </div>

        {/* Professionella element som flyter */}
        <div className="security-elements">
          {professionalElements.map((element, i) => (
            <motion.div
              key={`professional-${i}`}
              className="security-element"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 0.6, 0.3, 0.6, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            >
              {element}
            </motion.div>
          ))}
        </div>

        {/* Nätverkslinjer */}
        <div className="network-lines">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="network-line"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Mouse follower med säkerhetsikon */}
        <motion.div 
          className="mouse-follower"
          animate={{
            x: mousePosition.x - 15,
            y: mousePosition.y - 15,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <FaShieldAlt />
        </motion.div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="status-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaRocket className="status-icon" />
            <span>Söker LIA-plats</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hej! Jag är <br/>
            <span className="name-highlight">Ilya Fredriksson</span>
          </motion.h1>
          
          <motion.div 
            className="dynamic-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="role">Fullstack utvecklare specialiserad på </span>
            <motion.span 
              key={currentSkill}
              className="skill-rotate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {skills[currentSkill]}
            </motion.span>
          </motion.div>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionerad fullstack-utvecklare med stark grund inom modern webbutveckling. 
            Jag skapar skalbar och användarvänlig kod med fokus på prestanda, säkerhet och 
            bästa praxis. Erfaren inom React, Node.js och molnbaserade lösningar.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="btn btn-primary"
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket className="btn-icon" />
              Starta samarbete
            </motion.button>
            <motion.a 
              href="/cv-ilya-fredriksson.pdf"
              className="btn btn-secondary"
              download
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="btn-icon" />
              Ladda ner CV
            </motion.a>
          </motion.div>

          <motion.div 
            className="hero-social"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a 
              href="https://github.com/ilyafredriksson"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              whileHover={{ y: -3, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
              <span className="social-tooltip">GitHub</span>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/ilya-fredriksson"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
              whileHover={{ y: -3, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
              <span className="social-tooltip">LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="visual-container">
            {/* 3D Kod Kub */}
            <motion.div 
              className="code-cube"
              animate={{ 
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="cube-face front">
                <FaCode />
                <span>React</span>
              </div>
              <div className="cube-face back">
                <FaLightbulb />
                <span>JS</span>
              </div>
              <div className="cube-face left">
                <FaRocket />
                <span>CSS</span>
              </div>
              <div className="cube-face right">
                <FaCode />
                <span>API</span>
              </div>
            </motion.div>
            
            {/* Orbit Rings */}
            <div className="orbit-container">
              <motion.div 
                className="orbit orbit-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="orbit-dot"></div>
              </motion.div>
              <motion.div 
                className="orbit orbit-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <div className="orbit-dot"></div>
              </motion.div>
              <motion.div 
                className="orbit orbit-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="orbit-dot"></div>
              </motion.div>
            </div>
            
            {/* Floating Icons */}
            <div className="floating-icons">
              {[FaCode, FaRocket, FaLightbulb].map((Icon, index) => (
                <motion.div
                  key={index}
                  className={`floating-icon icon-${index + 1}`}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <Icon />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero