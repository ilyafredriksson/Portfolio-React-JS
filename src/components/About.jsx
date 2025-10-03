import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaGraduationCap, FaHeart } from 'react-icons/fa'
import './About.css'

const About = () => {
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
          <div className="about-content">
            <div className="about-text">
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Jag är en driven systemutvecklare med passion för frontend-utveckling och modern webbteknik. 
                Genom mina studier på Jensen Education har jag byggt upp en solid grund inom programmering 
                och utvecklat särskild expertis inom React, JavaScript och responsiv design.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Min bakgrund inom servicebranschen har gett mig starka kommunikationsförmågor och 
                problemlösningskapacitet som jag nu applicerar inom utveckling. Jag tror på att 
                kombinera teknisk expertis med användarfokus för att skapa meningsfulla digitala upplevelser.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Just nu söker jag en LIA-plats där jag kan bidra med min entusiasm och färdigheter 
                samtidigt som jag fortsätter utvecklas som professionell utvecklare.
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