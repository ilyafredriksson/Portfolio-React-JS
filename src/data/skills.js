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
  SiTypescript, 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress,
  SiJest,
  SiVite
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
    name: 'JavaScript', 
    icon: FaJsSquare, 
    level: 85, 
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
    name: 'Node.js', 
    icon: FaNodeJs, 
    level: 75, 
    color: '#339933',
    category: 'backend'
  },
  { 
    name: 'Git', 
    icon: FaGitAlt, 
    level: 80, 
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
    title: 'OWASP Top 10',
    description: 'Förståelse och implementation av OWASP Top 10 säkerhetsprinciper',
    skills: [
      'Injection prevention (SQL, NoSQL, XSS)',
      'Broken Authentication mitigation',
      'Sensitive Data Exposure protection',
      'Security Misconfiguration prevention',
      'Cross-Site Scripting (XSS) defense',
      'Insecure Deserialization protection'
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
      'Session management',
      'OAuth 2.0 integration',
      'Secure cookie handling'
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
      'Content Security Policy (CSP)',
      'Output encoding',
      'SQL/NoSQL injection prevention'
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
      'API key rotation',
      'Request validation',
      'Error handling utan information leakage'
    ],
    color: '#ef4444'
  }
]

/**
 * Additional competencies
 */
export const additionalSkills = [
  'Responsive Design',
  'REST API Development',
  'Agile/Scrum',
  'Component-Driven Development',
  'Version Control (Git)',
  'Web Performance Optimization',
  'SEO Best Practices',
  'Accessibility (WCAG)',
  'CI/CD Pipelines',
  'Testing (Jest, React Testing Library)',
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
