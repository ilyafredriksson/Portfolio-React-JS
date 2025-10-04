import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaReact, FaJsSquare, FaCss3Alt, FaStar } from 'react-icons/fa'
import { SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si'
import './Projects.css'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'QR Code Generator',
      description: 'Interaktiv QR-kod generator byggd med React. Användare kan skapa QR-koder för URL:er, text, WiFi-lösenord och kontaktinfo. Inkluderar anpassningsbara färger, storlekar och nedladdning som PNG/SVG.',
      image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=QR+Code+Generator',
      technologies: ['React', 'JavaScript', 'QR.js', 'CSS3'],
      category: 'frontend',
      github: 'https://github.com/ilyafredriksson/qr-code-generator',
      live: 'https://qr-generator-ilya.netlify.app',
      icons: [FaReact, FaJsSquare, FaCss3Alt],
      featured: true
    },
    {
      id: 2,
      title: 'Crypto Tracker App',
      description: 'Realtids kryptovaluta-spårare med CoinGecko API. Visar aktuella priser, marknadskapitalisering, 24h förändringar och interaktiva diagram. Inkluderar sök- och favoritfunktioner med localStorage.',
      image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Crypto+Tracker',
      technologies: ['React', 'CoinGecko API', 'Chart.js', 'CSS3'],
      category: 'frontend',
      github: 'https://github.com/ilyafredriksson/crypto-tracker',
      live: 'https://crypto-tracker-ilya.netlify.app',
      icons: [FaReact, FaJsSquare, FaCss3Alt],
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Denna responsiva portfolio-webbplats byggd med React och Framer Motion. Inkluderar moderna animationer, kontaktformulär, projekt-showcase och optimerad prestanda för alla enheter.',
      image: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Portfolio+Site',
      technologies: ['React', 'Framer Motion', 'CSS3', 'Responsive Design'],
      category: 'frontend',
      github: 'https://github.com/ilyafredriksson/Portfolio-React-JS',
      live: 'https://ilyafredriksson-portfolio.netlify.app',
      icons: [FaReact, FaJsSquare, FaCss3Alt]
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Responsiv väderapplikation som hämtar data från OpenWeatherMap API. Visar aktuellt väder, 5-dagars prognos, väderkartor och automatisk geolokalisering med modern UI.',
      image: 'https://via.placeholder.com/400x250/06b6d4/ffffff?text=Weather+Dashboard',
      technologies: ['React', 'Weather API', 'Geolocation', 'CSS3'],
      category: 'frontend',
      github: 'https://github.com/ilyafredriksson/weather-dashboard',
      live: 'https://weather-app-ilya.netlify.app',
      icons: [FaReact, FaJsSquare, FaCss3Alt]
    },
    {
      id: 5,
      title: 'Task Manager Pro',
      description: 'Avancerat projekthanteringsverktyg med drag-and-drop Kanban board, kategorier, deadlines, progress tracking och localStorage för att spara uppgifter mellan sessioner.',
      image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Task+Manager+Pro',
      technologies: ['React', 'Drag & Drop', 'Local Storage', 'CSS Grid'],
      category: 'frontend',
      github: 'https://github.com/ilyafredriksson/task-manager-pro',
      live: 'https://task-manager-ilya.netlify.app',
      icons: [FaReact, FaJsSquare, FaCss3Alt]
    },
    {
      id: 6,
      title: 'E-commerce Store',
      description: 'Fullstack e-commerce lösning med React frontend och Node.js backend. Inkluderar produktkatalog, kundkorg, användarautentisering, beställningshantering och Stripe betalningsintegration.',
      image: 'https://via.placeholder.com/400x250/ef4444/ffffff?text=E-commerce+Store',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      category: 'fullstack',
      github: 'https://github.com/ilyafredriksson/ecommerce-fullstack',
      live: 'https://ecommerce-ilya.netlify.app',
      icons: [FaReact, SiExpress, SiMongodb],
      featured: true
    }
  ]

  const categories = [
    { key: 'all', label: 'Alla projekt' },
    { key: 'featured', label: '⭐ Utvalda' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'fullstack', label: 'Fullstack' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured'
    ? projects.filter(project => project.featured)
    : projects.filter(project => project.category === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Mina Projekt</h2>
          <p className="projects-description">
            Utforska mina projekt som visar praktiska färdigheter inom React, API-integration och modern webbutveckling. 
            Kolla särskilt in QR Code Generator och Crypto Tracker - mina utvalda projekt!
          </p>
        </motion.div>

        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map(category => (
            <button
              key={category.key}
              className={`filter-btn ${filter === category.key ? 'active' : ''}`}
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={filter} // Re-trigger animation when filter changes
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {project.featured && (
                <div className="featured-badge">
                  <FaStar /> Utvalda
                </div>
              )}
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                  </motion.a>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tech">
                  {project.icons.map((Icon, iconIndex) => (
                    <Icon key={iconIndex} className="tech-icon" />
                  ))}
                </div>

                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {project.featured && (
                  <div className="project-highlights">
                    {project.id === 1 && (
                      <div className="highlight-feature">
                        🎯 Stöder flera QR-typer: URL, Text, WiFi, vCard
                      </div>
                    )}
                    {project.id === 2 && (
                      <div className="highlight-feature">
                        📈 Live data från CoinGecko API med realtidsuppdateringar
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects