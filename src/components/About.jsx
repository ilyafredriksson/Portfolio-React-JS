import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaGraduationCap, FaHeart } from 'react-icons/fa'
import About3DScene from './3d/About3DScene'
import './About.css'

const About = () => {
  const [show3D, setShow3D] = useState(true)
  
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Om mig</h2>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
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
              {show3D ? '3D Vy Aktiv' : 'Visa 3D'}
            </button>
          </div>
          
          {show3D && <About3DScene />}
          
          <div className="about-content">
            <div className="about-text">
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Jag är en passionerad frontend-utvecklare med specialisering i webbsäkerhet. 
                Med gedigen kunskap i HTML, CSS, JavaScript, React och Node.js skapar jag moderna 
                webbapplikationer som kombinerar elegant design med robust säkerhet.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Min styrka ligger i att utveckla användarvänliga gränssnitt med säkerhet som prioritet. 
                Jag följer branschens bästa metoder och håller mig ständigt uppdaterad med nya 
                teknologier och säkerhetsstandarder som OWASP Top 10.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Jag söker nu en utmanande roll där jag kan bidra med mina kunskaper och 
                samtidigt växa som utvecklare i ett dynamiskt team.
              </motion.p>
            </div>

            <div className="about-highlights">
              <motion.div 
                className="highlight-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <FaCode className="highlight-icon" />
                <h3>Utveckling</h3>
                <p>Fokus på moderna teknologier som React, JavaScript och responsiva webbapplikationer</p>
              </motion.div>

              <motion.div 
                className="highlight-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <FaGraduationCap className="highlight-icon" />
                <h3>Utbildning</h3>
                <p>Systemutvecklare på Jensen Education med fokus på fullstack-utveckling</p>
              </motion.div>

              <motion.div 
                className="highlight-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <FaHeart className="highlight-icon" />
                <h3>Passion</h3>
                <p>Älskar att lösa problem och skapa användarvänliga lösningar som gör skillnad</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About