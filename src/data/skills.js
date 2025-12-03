import { 
  FaReact, 
  FaJsSquare, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaNodeJs,
  FaShieldAlt,
  FaLock,
  FaKey,
  FaBug
} from 'react-icons/fa'
import { 
  SiJest,
  SiVite,
  SiNextdotjs,
  SiExpress,
  SiMongodb
} from 'react-icons/si'

/**
 * Technical skills data
 */

export const skills = [
  { 
    name: 'HTML5', 
    icon: FaHtml5, 
    level: 95, 
    color: '#E34F26',
    category: 'frontend'
  },
  { 
    name: 'CSS3', 
    icon: FaCss3Alt, 
    level: 90, 
    color: '#1572B6',
    category: 'frontend'
  },
  { 
    name: 'JavaScript (ES6+)', 
    icon: FaJsSquare, 
    level: 90, 
    color: '#F7DF1E',
    category: 'frontend'
  },
  { 
    name: 'React.js', 
    icon: FaReact, 
    level: 85, 
    color: '#61DAFB',
    category: 'frontend'
  },
  { 
    name: 'Next.js', 
    icon: SiNextdotjs, 
    level: 75, 
    color: '#000000',
    category: 'frontend'
  },
  { 
    name: 'Node.js', 
    icon: FaNodeJs, 
    level: 80, 
    color: '#339933',
    category: 'backend'
  },
  { 
    name: 'Express.js', 
    icon: SiExpress, 
    level: 75, 
    color: '#000000',
    category: 'backend'
  },
  { 
    name: 'MongoDB', 
    icon: SiMongodb, 
    level: 70, 
    color: '#47A248',
    category: 'backend'
  },
  { 
    name: 'Git', 
    icon: FaGitAlt, 
    level: 85, 
    color: '#F05032',
    category: 'tools'
  },
  { 
    name: 'Vite', 
    icon: SiVite, 
    level: 75, 
    color: '#646CFF',
    category: 'tools'
  },
  { 
    name: 'Jest', 
    icon: SiJest, 
    level: 70, 
    color: '#C21325',
    category: 'tools'
  }
]

/**
 * Security expertise
 */
export const securitySkills = [
  {
    icon: FaShieldAlt,
    title: 'XSS Prevention',
    description: 'Skydd mot Cross-Site Scripting attacker',
    skills: [
      'Input sanitization och validering',
      'Output encoding',
      'Content Security Policy (CSP)',
      'DOMPurify implementation',
      'Secure DOM manipulation',
      'HTTP-only cookies'
    ],
    color: '#8b5cf6'
  },
  {
    icon: FaLock,
    title: 'CSRF Protection',
    description: 'Skydd mot Cross-Site Request Forgery',
    skills: [
      'CSRF tokens implementation',
      'SameSite cookie attribute',
      'Double submit cookies',
      'Origin header validation',
      'Custom request headers',
      'State-changing request protection'
    ],
    color: '#ec4899'
  },
  {
    icon: FaKey,
    title: 'Säker API Hantering',
    description: 'Best practices för säker API-utveckling',
    skills: [
      'JWT authentication',
      'Rate limiting',
      'Input validation',
      'CORS konfiguration',
      'API versioning',
      'Secure error handling'
    ],
    color: '#10b981'
  },
  {
    icon: FaBug,
    title: 'HTTPS & Transport Security',
    description: 'Säker datakommunikation och kryptering',
    skills: [
      'TLS/SSL implementation',
      'HSTS (HTTP Strict Transport Security)',
      'Secure headers (Helmet.js)',
      'Certificate management',
      'Mixed content prevention',
      'Secure WebSocket (WSS)'
    ],
    color: '#f59e0b'
  }
]

/**
 * Additional competencies
 */
export const additionalSkills = [
  'UI/UX Design',
  'Responsive Design',
  'REST API Development',
  'Agile/Scrum metodologi',
  'Jira projekthantering',
  'Component-Driven Development',
  'Git & GitHub',
  'Web Performance Optimization',
  'Chrome DevTools',
  'Problem Solving & Debugging'
]

/**
 * Soft skills
 */
export const softSkills = [
  'Problemlösning',
  'Teamwork',
  'Kommunikation',
  'Självständig',
  'Anpassningsbar',
  'Detalj-orienterad',
  'Tidshantering',
  'Kontinuerligt lärande'
]

/**
 * Get skills by category
 */
export const getSkillsByCategory = (category) => {
  return skills.filter(skill => skill.category === category)
}
