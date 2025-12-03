# 🚀 Portfolio - Ilya Fredriksson

**Modern Portfolio med fokus på Frontend Development & Webbsäkerhet**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.22-FF0080?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Innehåll

- [Om Projektet](#om-projektet)
- [Funktioner](#funktioner)
- [Säkerhetsfokus](#säkerhetsfokus)
- [Teknologier](#teknologier)
- [Kom Igång](#kom-igång)
- [Projektstruktur](#projektstruktur)
- [Säkerhetsfunktioner](#säkerhetsfunktioner)
- [Deployment](#deployment)

## 🎯 Om Projektet

Detta är min professionella portfolio som demonstrerar mina färdigheter inom:
- **Frontend Development** med React och modern JavaScript
- **MERN Stack** (MongoDB, Express, React, Node.js)
- **Webbsäkerhet** enligt OWASP Top 10 standarder
- **Modern UI/UX Design** med Framer Motion animationer

Portfolion är byggd med säkerhet i fokus och implementerar best practices för att skydda mot vanliga säkerhetshot som XSS, injection-attacker och CSRF.

## ✨ Funktioner

### Huvudfunktioner
- ✅ **Responsiv Design** - Perfekt på alla enheter (mobil, tablet, desktop)
- ✅ **Moderna Animationer** - Smooth transitions med Framer Motion
- ✅ **Säkert Contact-formulär** - Med input validation och sanitization
- ✅ **SEO-optimerad** - Strukturerad data och meta-tags
- ✅ **Projektshowcase** - Filtrerbara projekt med säkerhetsfokus
- ✅ **Security Section** - Dedikerad sektion för webbsäkerhetskompetens
- ✅ **Error Boundary** - Graceful error handling
- ✅ **Performance Optimized** - Lazy loading och code splitting

### Unika Säljpunkter
- 🔒 **OWASP-medveten utveckling**
- ⚡ **MERN Stack expertis**
- 🎨 **Modern UI/UX design**
- 🛡️ **Säkerhet som prioritet #1**

## 🔒 Säkerhetsfokus

Detta projekt demonstrerar praktisk implementation av webbsäkerhet:

### Implementerade Säkerhetsåtgärder

#### 1. Input Validation & Sanitization
```javascript
// src/utils/validation.js - Omfattande validering
- Email format validation
- Password strength checking
- Form data validation
- Rate limiting (client-side)
```

#### 2. XSS Protection
```javascript
// src/utils/sanitize.js - Skydd mot XSS
- HTML entity encoding
- Tag stripping
- Input sanitization
- Safe JSON parsing
```

#### 3. Secure Form Handling
- ✅ Input sanitization på alla formulärfält
- ✅ Client-side rate limiting
- ✅ Error messages utan information leakage
- ✅ Secure error boundary implementation

#### 4. Security Headers (För Production)
```javascript
// Rekommenderas att lägga till i backend:
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- Strict-Transport-Security
```

## 🛠️ Teknologier

### Frontend
- **React 19.1.1** - UI Library
- **Vite 7.1.7** - Build tool & dev server
- **Framer Motion 12.23.22** - Animationer
- **React Icons 5.5.0** - Ikoner

### Säkerhet & Validation
- **Custom validation utilities** - Input validation
- **Sanitization functions** - XSS protection
- **Rate limiting** - Spam prevention
- **Error boundaries** - Säker error handling

### Development Tools
- **ESLint** - Code linting
- **EmailJS** - Contact form backend

## 🚀 Kom Igång

### Förutsättningar
- Node.js (v18 eller senare)
- npm eller yarn

### Installation

1. **Klona projektet**
```bash
git clone https://github.com/ilyafredriksson/Portfolio-React-JS.git
cd Portfolio-React-JS
```

2. **Installera dependencies**
```bash
npm install
```

3. **Konfigurera EmailJS (för contact-formulär)**
   
   Uppdatera `src/data/contact.js` med dina EmailJS credentials:
   ```javascript
   export const contactFormConfig = {
     emailJsServiceId: 'YOUR_SERVICE_ID',
     emailJsTemplateId: 'YOUR_TEMPLATE_ID',
     emailJsUserId: 'YOUR_USER_ID'
   }
   ```

4. **Starta development server**
```bash
npm run dev
```

5. **Öppna i browser**
   
   Navigera till `http://localhost:5173`

### Build för Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Projektstruktur

```
Portfolio-React-JS/
├── src/
│   ├── components/
│   │   ├── common/              # Återanvändbara komponenter
│   │   │   └── ErrorBoundary/   # Error handling
│   │   ├── layout/              # Layout komponenter
│   │   └── sections/            # Huvudsektioner
│   │       ├── HeroSection/     # Hero med säkerhetsfokus
│   │       ├── SecuritySection/ # Säkerhetskompetens
│   │       └── ContactSection/  # Säkert formulär
│   ├── data/                    # Statisk data
│   │   ├── projects.js          # Projekt med security features
│   │   ├── skills.js            # Tekniska färdigheter
│   │   └── contact.js           # Kontaktinformation
│   ├── hooks/                   # Custom React hooks
│   │   ├── useForm.js           # Form handling med validation
│   │   └── useLocalStorage.js  # Säker localStorage
│   ├── utils/                   # Hjälpfunktioner
│   │   ├── validation.js        # Input validation
│   │   └── sanitize.js          # XSS protection
│   ├── styles/                  # Globala stilar
│   │   └── variables.css        # CSS variabler
│   ├── App.jsx                  # Main app med Error Boundary
│   └── main.jsx                 # Entry point
├── public/                      # Statiska filer
├── index.html                   # HTML med SEO
├── package.json
└── README.md
```

## 🔐 Säkerhetsfunktioner

### Validation Layer
```javascript
// Input validation för alla formulär
- Namn: 2-50 tecken, endast bokstäver
- Email: RFC-compliant email format
- Meddelande: 10-1000 tecken
- Rate limiting: Max 3 försök per minut
```

### Sanitization Layer
```javascript
// XSS-skydd genom sanitization
- HTML tag stripping
- Entity encoding
- Script injection prevention
- Safe output rendering
```

### Error Handling
```javascript
// Säker error handling
- Error Boundary komponenter
- No information leakage
- User-friendly error messages
- Development vs Production modes
```

## 🌐 Deployment

### Netlify (Rekommenderas)

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variables:**
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_USER_ID`

### Vercel

1. **Framework Preset:** Vite
2. **Build Command:** `npm run build`
3. **Output Directory:** `dist`

## 📈 Performance

- ⚡ **Lighthouse Score:** 95+ (Performance)
- 🎯 **First Contentful Paint:** < 1.5s
- ♿ **Accessibility:** WCAG 2.1 AA compliant
- 🔍 **SEO:** Optimerad med structured data

## 🤝 Kontakt

**Ilya Fredriksson**

- 📧 Email: ilya.fredriksson@example.com
- 🔗 LinkedIn: [linkedin.com/in/ilya-fredriksson](https://linkedin.com/in/ilya-fredriksson)
- 💻 GitHub: [github.com/ilyafredriksson](https://github.com/ilyafredriksson)
- 🌐 Portfolio: [ilyafredriksson.com](https://ilyafredriksson.com)

## 📝 Licens

Detta projekt är licensierat under MIT License - se [LICENSE](LICENSE) filen för detaljer.

## 🙏 Acknowledgments

- React team för ett fantastiskt framework
- Framer Motion för smooth animationer
- OWASP för säkerhetsstandarder
- Open source community

---

**Built with ❤️ and 🔒 security in mind by Ilya Fredriksson**

# Bygg för produktion  
npm run build
```

## 📁 Projektstruktur

```
src/
├── components/          # React komponenter
│   ├── Navigation.jsx   # Huvudnavigation
│   ├── Hero.jsx        # Hero-sektion
│   ├── About.jsx       # Om mig-sektion
│   ├── Skills.jsx      # Färdigheter
│   ├── Projects.jsx    # Projekt-showcase
│   └── Contact.jsx     # Kontaktformulär
├── App.jsx             # Huvudkomponent
└── main.jsx           # Entry point
```

## 🎯 Live Demo

Besök den live versionen: [https://ilyafredriksson-portfolio.netlify.app](https://ilyafredriksson-portfolio.netlify.app)

## 📞 Kontakt

- **GitHub**: [ilyafredriksson](https://github.com/ilyafredriksson)
- **LinkedIn**: [ilya-fredriksson](https://linkedin.com/in/ilya-fredriksson)
- **Email**: ilya.fredriksson@example.com

## 📄 Licens

Detta projekt är öppet för alla som vill använda det som inspiration för sin egen portfolio.

---

**🎓 Skapad som en del av mina studier på Jensen Education - Systemutvecklare**

*Söker för närvarande LIA-plats inom frontend/fullstack utveckling*
