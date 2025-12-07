import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaGithub, 
  FaLinkedin, 
  FaDownload, 
  FaShieldAlt, 
  FaCode, 
  FaRocket, 
  FaArrowDown 
} from 'react-icons/fa'
import './HeroSection.css'

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentRole, setCurrentRole] = useState(0)

  const roles = [
    'Frontend Developer',
    'React Developer', 
    'Web Security Specialist',
    'JavaScript Developer'
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(roleInterval)
    }
  }, [])

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero-section">
      {/* Animated Background */}
      <div className="hero-bg">
        <motion.div 
          className="gradient-orb orb-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="gradient-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="gradient-orb orb-3"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="hero-container">
        {/* Hero Content */}
        <motion.div
          className="hero-content"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hej, jag är <span className="gradient-text">Ilya Fredriksson</span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div 
            className="role-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2 
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="role"
              >
                {roles[currentRole]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Frontend-utvecklare med specialisering i <strong>webbsäkerhet</strong>. Jag skapar moderna, 
            säkra webbapplikationer med <strong>React</strong>, <strong>JavaScript</strong> och <strong>Node.js</strong>. 
            Jag bygger moderna, säkra och användarvänliga webbapplikationer enligt OWASP-standarder.
          </motion.p>

          {/* Security Badges */}
          <motion.div 
            className="security-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="badge security">
              <FaShieldAlt />
              <span>OWASP Top 10</span>
            </div>
            <div className="badge primary">
              <FaCode />
              <span>React & Node.js</span>
            </div>
            <div className="badge primary">
              <FaRocket />
              <span>Modern Frontend</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="cta-button primary"
              onClick={() => scrollToSection('#projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Se mina projekt
              <FaArrowDown />
            </motion.button>
            
            <motion.a
              href="/cv/Ilya_Fredriksson_CV.pdf"
              download
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Ladda ner CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href="https://github.com/ilyafredriksson"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ilya-fredriksson-197313353/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Code Window Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="code-window">
            <div className="window-header">
              <div className="window-dot dot-red"></div>
              <div className="window-dot dot-yellow"></div>
              <div className="window-dot dot-green"></div>
            </div>
            <div className="code-content">
              <div className="code-line">
                <span className="line-number">1</span>
                <span className="code-text">
                  <span className="code-keyword">const</span> developer = {'{'}
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">2</span>
                <span className="code-text">
                  &nbsp;&nbsp;name: <span className="code-string">'Ilya Fredriksson'</span>,
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">3</span>
                <span className="code-text">
                  &nbsp;&nbsp;role: <span className="code-string">'Frontend Developer'</span>,
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">4</span>
                <span className="code-text">
                  &nbsp;&nbsp;skills: [<span className="code-string">'React'</span>, <span className="code-string">'JavaScript'</span>, <span className="code-string">'Node.js'</span>],
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">5</span>
                <span className="code-text">
                  &nbsp;&nbsp;focus: <span className="code-string">'Web Security'</span>,
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">6</span>
                <span className="code-text">
                  &nbsp;&nbsp;<span className="code-function">buildSecureApps</span>() {'{'}
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">7</span>
                <span className="code-text">
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-string">'💪 Säkert & Snabbt'</span>;
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">8</span>
                <span className="code-text">
                  &nbsp;&nbsp;{'}'}
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">9</span>
                <span className="code-text">{'}'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5 },
          y: { repeat: Infinity, duration: 1.5 }
        }}
        onClick={() => scrollToSection('#about')}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          color: 'white',
          fontSize: '1.5rem'
        }}
      >
        <FaArrowDown />
      </motion.div>
    </section>
  )
}

export default HeroSection
