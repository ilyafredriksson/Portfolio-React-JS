import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaUserSecret, FaShieldAlt } from 'react-icons/fa'
import { securitySkills } from '../../data/skills'
import Security3DScene from '../3d/Security3DScene'
import './SecuritySection.css'

const SecuritySection = () => {
  const [show3D, setShow3D] = useState(true)

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
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={() => setShow3D(!show3D)}
                style={{
                  padding: '0.75rem 2rem',
                  background: show3D ? 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)' : '#333',
                  color: 'white',
                  border: '2px solid #00d4ff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                {show3D ? '3D Säkerhetsvy Aktiv' : 'Visa 3D Säkerhetsvy'}
              </button>
            </div>
          </div>
        </motion.div>

        {show3D && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Security3DScene />
          </motion.div>
        )}

        <div className="security-grid">
          {securitySkills.map((item, index) => (
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
