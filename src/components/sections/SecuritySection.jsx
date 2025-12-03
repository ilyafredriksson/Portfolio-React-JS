import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaShieldAlt, 
  FaLock, 
  FaBug, 
  FaKey, 
  FaCheckCircle,
  FaUserSecret 
} from 'react-icons/fa'
import './SecuritySection.css'

const SecuritySection = () => {
  const securityExpertise = [
    {
      icon: FaShieldAlt,
      title: 'OWASP Top 10',
      description: 'Förståelse och implementation av OWASP Top 10 säkerhetsprinciper',
      skills: [
        'Injection prevention (SQL, NoSQL, XSS)',
        'Broken Authentication mitigation',
        'Sensitive Data Exposure protection',
        'Security Misconfiguration prevention'
      ],
      color: '#10b981'
    },
    {
      icon: FaLock,
      title: 'Säker Autentisering',
      description: 'Implementation av robust auth-system enligt best practices',
      skills: [
        'JWT med refresh token rotation',
        'Bcrypt password hashing',
        'Multi-factor authentication (MFA)',
        'Session management'
      ],
      color: '#667eea'
    },
    {
      icon: FaBug,
      title: 'Input Validation & Sanitization',
      description: 'Skydd mot malicious input och injection-attacker',
      skills: [
        'DOMPurify för XSS-skydd',
        'Express-validator för backend',
        'Schema validation med Joi',
        'Content Security Policy (CSP)'
      ],
      color: '#f59e0b'
    },
    {
      icon: FaKey,
      title: 'API-säkerhet',
      description: 'Säkra REST API:er med proper authentication och authorization',
      skills: [
        'Rate limiting (express-rate-limit)',
        'CORS konfiguration',
        'Helmet.js för HTTP headers',
        'API key rotation'
      ],
      color: '#ef4444'
    }
  ]

  return (
    <section id="security" className="security-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <FaShieldAlt className="section-icon" />
            <h2 className="section-title">Webbsäkerhetskompetens</h2>
            <p className="section-subtitle">
              Som frontend-utvecklare med fokus på säkerhet implementerar jag OWASP-standarder 
              och best practices i varje projekt för att skydda användare och data.
            </p>
          </div>
        </motion.div>

        <div className="security-grid">
          {securityExpertise.map((item, index) => (
            <motion.div
              key={item.title}
              className="security-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div 
                className="security-icon" 
                style={{ backgroundColor: `${item.color}15`, color: item.color }}
              >
                <item.icon />
              </div>
              <h3>{item.title}</h3>
              <p className="security-description">{item.description}</p>
              <ul className="security-skills">
                {item.skills.map((skill, i) => (
                  <li key={i}>
                    <FaCheckCircle className="check-icon" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Security Case Study Preview */}
        <motion.div 
          className="security-highlight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="highlight-header">
            <FaUserSecret />
            <h3>Security Case Study: Secure Auth System</h3>
          </div>
          <div className="case-study-grid">
            <div className="case-study-item">
              <h4>Problem</h4>
              <p>Många webbapplikationer använder osäkra auth-metoder som leder till dataintrång</p>
            </div>
            <div className="case-study-item">
              <h4>Lösning</h4>
              <p>Implementerade JWT med refresh tokens, bcrypt-hashing, rate limiting och CSRF-skydd</p>
            </div>
            <div className="case-study-item">
              <h4>Resultat</h4>
              <p>Zero vulnerabilities i penetrationstester, A+ SecurityHeaders rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SecuritySection
