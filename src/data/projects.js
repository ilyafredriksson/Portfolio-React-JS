import { 
  FaReact, 
  FaJsSquare, 
  FaCss3Alt, 
  FaShieldAlt, 
  FaLock, 
  FaBug,
  FaKey,
  FaUserSecret 
} from 'react-icons/fa'
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si'

/**
 * Portfolio projects data
 * Organized with security-first approach
 */

export const projects = [
  {
    id: 1,
    title: 'Next.js Kurs Projekt',
    shortDescription: 'Modern Next.js applikation med server-side rendering och API routes',
    description: `
      Ett komplett Next.js projekt som demonstrerar moderna React patterns, 
      server-side rendering, API routes och optimerad prestanda.
    `,
    image: 'https://via.placeholder.com/400x250/000000/ffffff?text=Next.js+App',
    technologies: ['Next.js', 'React', 'JavaScript', 'CSS3'],
    category: 'frontend',
    github: 'https://github.com/ilyafredriksson/nextjs-kurs',
    live: 'https://nextjs-kurs-ilya.netlify.app',
    icons: [FaReact, FaJsSquare, FaCss3Alt],
    featured: true,
    securityFeatures: [
      'Server-side rendering för bättre säkerhet',
      'API routes med säker data-hantering',
      'Environment variables för känslig data',
      'Automatisk code splitting och optimering'
    ]
  },
  {
    id: 2,
    title: 'Crypto Tracker App',
    shortDescription: 'Realtids kryptovaluta-spårare med CoinGecko API och interaktiva charts',
    description: `
      Kryptovaluta-tracker med realtidsdata från CoinGecko API.
      Visar priser, marknadskapitalisering och prishistorik för populära kryptos.
    `,
    image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Crypto+Tracker',
    technologies: ['React', 'CoinGecko API', 'Chart.js', 'CSS3'],
    category: 'frontend',
    github: 'https://github.com/ilyafredriksson/react-crypto-app',
    live: 'https://crypto-tracker-ilya.netlify.app',
    icons: [FaReact, FaJsSquare, FaCss3Alt],
    featured: true,
    securityFeatures: [
      'Säker API-kommunikation med error handling',
      'Input sanitization för sök-funktionalitet',
      'LocalStorage data validation',
      'Responsive design för alla enheter'
    ]
  },
  {
    id: 3,
    title: 'QR Code Generator',
    shortDescription: 'Interaktiv QR-kod generator med stöd för flera format',
    description: `
      Modern QR-kod generator för URL:er, text, WiFi-lösenord och kontaktinfo.
      Client-side generering för maximal datasäkerhet.
    `,
    image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=QR+Generator',
    technologies: ['HTML', 'CSS', 'JavaScript', 'QR.js'],
    category: 'frontend',
    github: 'https://github.com/ilyafredriksson/QRGenerator',
    live: 'https://qr-generator-ilya.netlify.app',
    icons: [FaJsSquare, FaCss3Alt],
    featured: true,
    securityFeatures: [
      'Client-side QR generation (ingen data skickas till server)',
      'Input validation för alla data-typer',
      'Säker hantering av WiFi-lösenord',
      'XSS-skydd vid rendering'
    ]
  },
  {
    id: 4,
    title: 'BJJ App',
    shortDescription: 'Brazilian Jiu-Jitsu träningsapp för teknikspårning och progress',
    description: `
      En interaktiv träningsapp för Brazilian Jiu-Jitsu utövare.
      Spåra tekniker, träningspass och utveckling över tid.
    `,
    image: 'https://via.placeholder.com/400x250/dc2626/ffffff?text=BJJ+App',
    technologies: ['JavaScript', 'HTML', 'CSS3', 'Local Storage'],
    category: 'frontend',
    github: 'https://github.com/ilyafredriksson/bjj-app',
    live: 'https://bjj-app-ilya.netlify.app',
    icons: [FaJsSquare, FaCss3Alt],
    securityFeatures: [
      'Säker localStorage för träningsdata',
      'Input validation för användardata',
      'XSS-skydd vid rendering',
      'Data backup och export funktionalitet'
    ]
  },
  {
    id: 5,
    title: 'Booking Event System',
    shortDescription: 'Event booking-system med JavaScript och modern UI',
    description: `
      Ett komplett bokningssystem för events med kalenderfunktionalitet.
      Användare kan boka, avboka och hantera sina evenemang.
    `,
    image: 'https://via.placeholder.com/400x250/ec4899/ffffff?text=Booking+Event',
    technologies: ['JavaScript', 'HTML', 'CSS3', 'Date API'],
    category: 'frontend',
    github: 'https://github.com/ilyafredriksson/Booking-Event',
    live: 'https://booking-event-ilya.netlify.app',
    icons: [FaJsSquare, FaCss3Alt],
    securityFeatures: [
      'Data validation för bokningar',
      'Safe date handling',
      'Input sanitization',
      'Error handling och user feedback'
    ]
  },
  {
    id: 6,
    title: 'Portfolio Website',
    shortDescription: 'Modern portfolio med React, Framer Motion och glassmorphism design',
    description: `
      Denna responsiva portfolio med moderna animationer och dark theme.
      Visar projekt, färdigheter och kontaktinformation med stil.
    `,
    image: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Portfolio',
    technologies: ['React', 'Framer Motion', 'CSS3', 'Vite'],
    category: 'frontend',
    github: 'https://github.com/ilyafredriksson/Portfolio-React-JS',
    live: 'https://ilyafredriksson-portfolio.netlify.app',
    icons: [FaReact, FaJsSquare, FaCss3Alt],
    securityFeatures: [
      'Säkert contact-formulär med validation',
      'Input sanitization',
      'XSS-skydd',
      'Modern security headers'
    ]
  }
]

/**
 * Project categories for filtering
 */
export const projectCategories = [
  { 
    key: 'all', 
    label: 'Alla projekt',
    description: 'Visa alla projekt'
  },
  { 
    key: 'security', 
    label: '🔒 Säkerhet',
    description: 'Projekt med fokus på webbsäkerhet och OWASP'
  },
  { 
    key: 'featured', 
    label: '⭐ Utvalda',
    description: 'Mina bästa och mest avancerade projekt'
  },
  { 
    key: 'fullstack', 
    label: 'Fullstack MERN',
    description: 'Fullstack-projekt med MongoDB, Express, React, Node.js'
  },
  { 
    key: 'frontend', 
    label: 'Frontend',
    description: 'Frontend-projekt med React och modern JavaScript'
  }
]

/**
 * Get filtered projects by category
 */
export const getProjectsByCategory = (category) => {
  if (category === 'all') return projects
  if (category === 'featured') return projects.filter(p => p.featured)
  if (category === 'security') return projects.filter(p => p.security)
  return projects.filter(p => p.category === category)
}

/**
 * Get featured projects
 */
export const getFeaturedProjects = () => {
  return projects.filter(p => p.featured)
}

/**
 * Get security-focused projects
 */
export const getSecurityProjects = () => {
  return projects.filter(p => p.security)
}
