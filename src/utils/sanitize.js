/**
 * HTML Sanitization utilities
 * Provides XSS protection by sanitizing user input
 * 
 * Note: For production, consider using DOMPurify library
 * This is a basic implementation for educational purposes
 */

/**
 * Basic HTML entity encoding
 * Converts dangerous characters to HTML entities
 * 
 * @param {string} str - String to encode
 * @returns {string} - Encoded string
 */
export const encodeHTML = (str) => {
  if (typeof str !== 'string') return ''
  
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }
  
  return str.replace(/[&<>"'/]/g, (char) => htmlEntities[char])
}

/**
 * Strip all HTML tags from string
 * Returns plain text only
 * 
 * @param {string} html - HTML string
 * @returns {string} - Plain text
 */
export const stripHTML = (html) => {
  if (typeof html !== 'string') return ''
  
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '')
  
  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
  
  return text.trim()
}

/**
 * Sanitize input for safe display
 * Combines encoding and length limiting
 * 
 * @param {string} input - User input to sanitize
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input, maxLength = 1000) => {
  if (typeof input !== 'string') return ''
  
  // Strip HTML tags
  let sanitized = stripHTML(input)
  
  // Trim whitespace
  sanitized = sanitized.trim()
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength)
  }
  
  return sanitized
}

/**
 * Sanitize HTML content (allow specific safe tags)
 * For displaying rich text content safely
 * 
 * @param {string} html - HTML content
 * @returns {string} - Sanitized HTML
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') return ''
  
  // Allowed tags for basic formatting
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'b', 'i']
  
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '')
  
  // Remove style tags
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  
  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  
  return sanitized
}

/**
 * Escape special characters for use in regular expressions
 * 
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
export const escapeRegExp = (str) => {
  if (typeof str !== 'string') return ''
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Sanitize filename for safe file operations
 * 
 * @param {string} filename - Filename to sanitize
 * @returns {string} - Safe filename
 */
export const sanitizeFilename = (filename) => {
  if (typeof filename !== 'string') return 'file'
  
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace unsafe chars with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .slice(0, 255) // Limit length
}

/**
 * Check if string contains potential XSS patterns
 * 
 * @param {string} input - Input to check
 * @returns {boolean} - True if suspicious patterns found
 */
export const containsXSS = (input) => {
  if (typeof input !== 'string') return false
  
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers
    /<iframe/i,
    /eval\(/i,
    /expression\(/i,
    /vbscript:/i,
    /data:text\/html/i
  ]
  
  return xssPatterns.some(pattern => pattern.test(input))
}

/**
 * Safe JSON parse with error handling
 * 
 * @param {string} jsonString - JSON string to parse
 * @param {*} defaultValue - Default value if parsing fails
 * @returns {*} - Parsed object or default value
 */
export const safeJSONParse = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.warn('JSON parse error:', error)
    return defaultValue
  }
}
