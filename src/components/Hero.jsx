import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaDownload, FaCode, FaRocket, FaLightbulb } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSkill, setCurrentSkill] = useState(0)
  
  const skills = ['React', 'JavaScript', 'CSS3', 'Node.js', 'API:er', 'UI/UX']
  
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
      {/* Interactive Background */}
      <div className="hero-bg">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`shape shape-${i + 1}`}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Mouse follower */}
        <motion.div 
          className="mouse-follower"
          animate={{
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
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
            <span className="role">Systemutvecklare som älskar </span>
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
            Jag skapar moderna, interaktiva webbapplikationer som verkligen gör skillnad. 
            Med passion för clean code och användarvänlig design är jag redo att bidra 
            till ditt team genom min LIA-praktik.
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