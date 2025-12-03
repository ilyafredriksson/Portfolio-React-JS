/**
 * Validation utilities for form inputs and security
 * Implements OWASP input validation best practices
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * 
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with errors
 */
export const validatePassword = (password) => {
  const minLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    errors: {
      minLength: !minLength ? 'Lösenordet måste vara minst 8 tecken' : null,
      hasUpperCase: !hasUpperCase ? 'Lösenordet måste innehålla minst en stor bokstav' : null,
      hasLowerCase: !hasLowerCase ? 'Lösenordet måste innehålla minst en liten bokstav' : null,
      hasNumber: !hasNumber ? 'Lösenordet måste innehålla minst en siffra' : null,
      hasSpecialChar: !hasSpecialChar ? 'Lösenordet måste innehålla minst ett specialtecken' : null
    }
  }
}

/**
 * Validate contact form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result
 */
export const validateContactForm = (formData) => {
  const errors = {}

  // Name validation (2-50 characters, only letters and spaces)
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Namnet måste vara minst 2 tecken'
  } else if (formData.name.length > 50) {
    errors.name = 'Namnet får max vara 50 tecken'
  } else if (!/^[a-öA-ÖäÄöÖåÅ\s-]+$/.test(formData.name)) {
    errors.name = 'Namnet får bara innehålla bokstäver, mellanslag och bindestreck'
  }

  // Email validation
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Ogiltig email-adress'
  }

  // Subject validation (3-100 characters)
  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'Ämnet måste vara minst 3 tecken'
  } else if (formData.subject.length > 100) {
    errors.subject = 'Ämnet får max vara 100 tecken'
  }

  // Message validation (10-1000 characters)
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Meddelandet måste vara minst 10 tecken'
  } else if (formData.message.length > 1000) {
    errors.message = 'Meddelandet får max vara 1000 tecken'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Client-side rate limiting
 * Prevents spam by limiting submissions
 * 
 * @param {string} key - Unique key for rate limit (e.g., 'contact_form')
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} timeWindow - Time window in milliseconds
 * @returns {Object} - Rate limit check result
 */
export const checkRateLimit = (key, maxAttempts = 3, timeWindow = 60000) => {
  const now = Date.now()
  const storageKey = `rateLimit_${key}`
  
  try {
    const attempts = JSON.parse(localStorage.getItem(storageKey) || '[]')
    
    // Filter out old attempts outside time window
    const recentAttempts = attempts.filter(timestamp => now - timestamp < timeWindow)
    
    if (recentAttempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...recentAttempts)
      const timeUntilReset = Math.ceil((timeWindow - (now - oldestAttempt)) / 1000)
      return {
        allowed: false,
        message: `För många försök. Försök igen om ${timeUntilReset} sekunder.`
      }
    }
    
    // Add current attempt
    recentAttempts.push(now)
    localStorage.setItem(storageKey, JSON.stringify(recentAttempts))
    
    return { allowed: true }
  } catch (error) {
    // If localStorage fails, allow the attempt
    console.warn('Rate limit check failed:', error)
    return { allowed: true }
  }
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Sanitize string for safe display (basic)
 * Removes potentially dangerous characters
 * 
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return ''
  
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .slice(0, 1000) // Limit length
}
