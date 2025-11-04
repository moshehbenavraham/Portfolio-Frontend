# Technical Architecture

This document provides a comprehensive overview of the portfolio website's technical architecture, design decisions, and implementation details.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Build Pipeline](#build-pipeline)
- [Core Components](#core-components)
- [State Management](#state-management)
- [Animation System](#animation-system)
- [Form Handling](#form-handling)
- [Styling Architecture](#styling-architecture)
- [Performance Considerations](#performance-considerations)
- [Browser Support](#browser-support)
- [Security](#security)
- [Accessibility](#accessibility)

## Overview

This portfolio website is a modern, single-page application (SPA) built with vanilla JavaScript and optimized for performance, accessibility, and user experience. The architecture prioritizes simplicity, maintainability, and fast load times.

### Key Architectural Principles

1. **Progressive Enhancement** - Core functionality works without JavaScript
2. **Mobile-First Design** - Responsive from 320px upwards
3. **Performance-First** - Optimized bundle sizes and lazy loading
4. **Accessibility-First** - WCAG 2.1 AA compliant
5. **SEO-Friendly** - Semantic HTML and proper meta tags

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | - | Semantic markup and structure |
| **CSS3** | - | Custom styles and animations |
| **JavaScript** | ES2021 | Application logic and interactivity |
| **Vite** | 7.1.12 | Build tool and dev server |
| **Tailwind CSS** | 3.4.18 | Utility-first CSS framework |
| **GSAP** | 3.13.0 | Advanced animations |
| **Formik** | 2.4.6 | Form state management |
| **Yup** | 1.7.1 | Schema validation |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 9.39.1 | Code linting and quality |
| **Prettier** | 3.6.2 | Code formatting |
| **PostCSS** | 8.5.6 | CSS processing |
| **Autoprefixer** | 10.4.21 | CSS vendor prefixing |

### Why These Technologies?

#### Vite over Webpack
- **Faster** - Native ES modules, instant HMR
- **Simpler** - Zero-config for most use cases
- **Smaller** - Better tree-shaking and code splitting
- **Modern** - Built for modern browsers

#### Tailwind CSS over Custom CSS
- **Rapid development** - Utility-first approach
- **Consistency** - Design system built-in
- **Performance** - Automatic purging of unused CSS
- **Maintainability** - Reduced custom CSS

#### GSAP over CSS Animations
- **Cross-browser consistency** - Works identically everywhere
- **Advanced control** - Timeline-based animations
- **Performance** - Hardware-accelerated transforms
- **Flexibility** - Complex animation sequences

#### Formik + Yup over Native Forms
- **Validation** - Schema-based, reusable
- **Error handling** - Built-in error state management
- **UX** - Better user feedback
- **Extensibility** - Easy to add complex validation

## Project Structure

```
Portfolio-Frontend/
├── public/                    # Static assets (not processed by Vite)
│   ├── profile.png           # Profile image
│   ├── project1.webp         # Project screenshot 1
│   ├── project2.webp         # Project screenshot 2
│   └── vite.svg              # Vite logo
│
├── src/                      # Source files (processed by Vite)
│   ├── assets/               # Bundled assets
│   │   └── javascript.svg    # JavaScript logo
│   ├── main.js               # Main application entry point
│   ├── counter.js            # Counter module (unused, reference)
│   └── index.css             # Global styles + Tailwind
│
├── docs/                     # Project documentation
│   ├── CONTRIBUTING.md       # Contribution guidelines
│   ├── CODE_OF_CONDUCT.md    # Community guidelines
│   ├── CHANGELOG.md          # Version history
│   ├── DEPLOYMENT.md         # Deployment instructions
│   ├── ARCHITECTURE.md       # This file
│   ├── API.md                # API documentation
│   └── TROUBLESHOOTING.md    # Common issues
│
├── dist/                     # Production build (generated)
│   ├── index.html            # Minified HTML
│   ├── assets/               # Hashed assets
│   └── ...                   # Other built files
│
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── eslint.config.js          # ESLint configuration (v9 flat config)
├── .prettierrc               # Prettier rules
├── package.json              # Dependencies and scripts
├── package-lock.json         # Locked dependencies
├── .gitignore                # Git ignore patterns
├── LICENSE                   # MIT License
├── README.md                 # Project overview
└── CLAUDE.md                 # AI assistant guidance
```

### File Organization Philosophy

- **`public/`** - Assets referenced directly in HTML (no hash, fixed URLs)
- **`src/`** - Assets imported in JS/CSS (hashed, cache-busted)
- **`docs/`** - All project documentation in one place
- **Single `index.html`** - Simple SPA, all sections in one file
- **Single `main.js`** - All application logic centralized
- **Single `index.css`** - All styles in one place

This structure prioritizes simplicity over separation of concerns due to the project's small scope.

## Build Pipeline

### Development Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  index.html ──┐                                             │
│               │                                             │
│  src/main.js ─┼──> Vite Dev Server ──> Hot Module          │
│               │    - ES Modules       Replacement (HMR)    │
│  src/index.css ┘   - No bundling     - Instant updates     │
│               │    - Fast startup                          │
│               │                                             │
│               └──> Browser (localhost:5173)                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Command:** `npm run dev`

### Production Build Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Source Files                                                │
│  ├── index.html                                             │
│  ├── src/main.js                                            │
│  └── src/index.css                                          │
│       │                                                      │
│       ├──> Vite Build                                       │
│       │    ├── Rollup bundling                              │
│       │    ├── Tree shaking                                 │
│       │    ├── Code splitting                               │
│       │    ├── Minification                                 │
│       │    ├── Asset optimization                           │
│       │    └── Source maps                                  │
│       │                                                      │
│       └──> dist/                                            │
│            ├── index.html (minified)                        │
│            ├── assets/                                      │
│            │   ├── main.[hash].js (< 50KB gzipped)         │
│            │   └── index.[hash].css (< 20KB gzipped)       │
│            └── public assets (copied)                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Command:** `npm run build`

### CSS Processing Pipeline

```
Tailwind CSS ──> PostCSS ──> Autoprefixer ──> PurgeCSS ──> Minification
    │              │              │               │
    │              │              │               └──> Remove unused
    │              │              └──────────────────> Add vendor prefixes
    │              └─────────────────────────────────> Transform modern CSS
    └────────────────────────────────────────────────> Utility generation
```

### JavaScript Processing Pipeline

```
ES2021 Code ──> Babel (optional) ──> Rollup ──> Terser ──> dist/
     │                                  │          │
     │                                  │          └──> Minify & mangle
     │                                  └──────────────> Bundle modules
     └─────────────────────────────────────────────────> Modern syntax
```

## Core Components

### 1. Main Application (`src/main.js`)

**Purpose:** Application entry point and orchestration

**Responsibilities:**
- Initialize GSAP animations
- Set up smooth scrolling
- Handle mobile menu interactions
- Initialize and manage contact form
- Event delegation and DOM manipulation

**Architecture Pattern:** Module pattern with IIFE (Immediately Invoked Function Expression)

```javascript
// Initialization on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initSmoothScrolling();
  initMobileMenu();
  initContactForm();
});
```

### 2. Animation System

**Location:** `src/main.js` (lines 1-50)

**Components:**
- GSAP core library
- ScrollTrigger plugin (registered, reserved for future use)
- Hero section animations

**Animation Timeline:**
```
Page Load
    │
    ├──> H1 Fade In (delay: 0.2s)
    │
    ├──> H2 Fade In (delay: 0.4s)
    │
    ├──> Paragraph Fade In (delay: 0.6s)
    │
    ├──> Image Fade In + Scale (delay: 0.8s)
    │
    └──> Buttons Fade In (delay: 1.0s)
```

### 3. Navigation System

**Location:** `index.html` (header) + `src/main.js` (menu logic)

**Features:**
- Fixed header on scroll
- Smooth scrolling to sections
- Mobile hamburger menu
- Click-outside-to-close
- Active link highlighting (future enhancement)

**State Management:**
```javascript
let mobileMenuOpen = false;

toggleMenu() => {
  mobileMenuOpen = !mobileMenuOpen;
  updateMenuVisibility();
}
```

### 4. Contact Form

**Location:** `index.html` (static form) + `src/main.js` (dynamic form)

**Architecture:** Dual implementation
1. **Fallback (HTML)** - Works without JavaScript
2. **Enhanced (JS)** - Better validation and UX

**Flow:**
```
User Input ──> Yup Validation ──> FormSpree API ──> Email Sent
                    │                    │
                    │                    ├──> Success: Show message
                    │                    └──> Error: Show error
                    │
                    └──> Invalid: Show validation errors
```

## State Management

### Approach

This project uses **local state management** due to its simplicity. No global state management library (Redux, MobX, etc.) is needed.

### State Categories

1. **UI State** (in closures)
   - Mobile menu open/closed
   - Form submission state
   - Animation completion flags

2. **Form State** (Formik)
   - Field values
   - Validation errors
   - Submission status

3. **Browser State**
   - Scroll position
   - Viewport dimensions
   - Theme preference (future: localStorage)

### Example: Menu State

```javascript
// Closure-based state
const mobileMenu = (() => {
  let isOpen = false;
  
  const toggle = () => {
    isOpen = !isOpen;
    render();
  };
  
  const render = () => {
    menu.classList.toggle('hidden', !isOpen);
  };
  
  return { toggle };
})();
```

## Animation System

### GSAP Implementation

**Why GSAP?**
- Consistent 60fps animations
- Hardware acceleration
- Cross-browser compatibility
- Powerful timeline control

### Animation Patterns

#### 1. Entrance Animations
```javascript
gsap.from(element, {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power3.out'
});
```

#### 2. Stagger Animations
```javascript
gsap.from('.skill-item', {
  opacity: 0,
  scale: 0.8,
  duration: 0.5,
  stagger: 0.1
});
```

#### 3. ScrollTrigger (Future)
```javascript
gsap.from('.project-card', {
  scrollTrigger: {
    trigger: '.project-card',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 100
});
```

### Performance Optimization

- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Batch DOM reads and writes

## Form Handling

### Architecture

```
┌──────────────────────────────────────────────────────┐
│                                                        │
│  User Input                                           │
│      │                                                │
│      ├──> Formik (State Management)                  │
│      │      └──> values, errors, touched             │
│      │                                                │
│      ├──> Yup (Validation Schema)                    │
│      │      ├──> name: required string               │
│      │      ├──> email: required email format        │
│      │      └──> message: required string            │
│      │                                                │
│      └──> FormSpree (Email Delivery)                 │
│           └──> POST https://formspree.io/f/[id]      │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### Validation Schema

```javascript
const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  message: yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required')
});
```

### Error Handling

- **Validation errors** - Shown inline below fields
- **Network errors** - Global error message
- **Success** - Thank you message, form reset

## Styling Architecture

### Tailwind CSS Methodology

#### 1. Utility-First Approach

```html
<!-- Instead of custom classes -->
<button class="btn btn-primary">Click Me</button>

<!-- Use utilities -->
<button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
  Click Me
</button>
```

#### 2. Responsive Design

```html
<div class="
  w-full          <!-- Mobile: full width -->
  md:w-1/2        <!-- Tablet: half width -->
  lg:w-1/3        <!-- Desktop: third width -->
">
```

**Breakpoints:**
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)
- `2xl`: 1536px (extra large)

#### 3. Dark Mode

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### Custom CSS

**Location:** `src/index.css`

**Usage:** Only for:
- CSS custom properties (variables)
- Complex animations not possible with Tailwind
- Global resets and normalizations
- Component-specific styles requiring CSS specificity

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
}

/* Complex gradient that's cleaner as custom CSS */
.hero-gradient {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}
```

## Performance Considerations

### Bundle Size Targets

| Asset | Target | Current | Status |
|-------|--------|---------|--------|
| HTML | < 10KB | ~8KB | ✅ |
| CSS | < 30KB | ~20KB | ✅ |
| JavaScript | < 100KB | ~60KB | ✅ |
| Images | WebP, optimized | Mixed | ⚠️ |
| Total (gzipped) | < 150KB | ~88KB | ✅ |

### Optimization Techniques

1. **Code Splitting** (future)
   ```javascript
   const gsap = () => import('gsap');
   ```

2. **Tree Shaking**
   - Vite automatically removes unused code
   - Import only what you need from libraries

3. **Asset Optimization**
   - Images: WebP format with fallbacks
   - Icons: SVG sprites or Font Awesome CDN
   - Fonts: Subset fonts, load only needed weights

4. **Lazy Loading**
   ```html
   <img src="project.webp" loading="lazy" alt="Project">
   ```

5. **Caching Strategy**
   - HTML: No cache (always fresh)
   - JS/CSS: Hashed filenames (cache forever)
   - Images: Long cache with CDN

### Lighthouse Scores

**Current Targets:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Browser Support

### Target Browsers

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Last 2 versions | Full |
| Firefox | Last 2 versions | Full |
| Safari | Last 2 versions | Full |
| Edge | Last 2 versions | Full |
| Mobile Chrome | Last 2 versions | Full |
| Mobile Safari | Last 2 versions | Full |
| IE 11 | - | ❌ Not supported |

### Polyfills

None required due to:
- Modern ES2021 syntax (supported by target browsers)
- Vite's automatic transpilation for production
- GSAP's built-in cross-browser compatibility

### Progressive Enhancement

- Core content accessible without JavaScript
- Forms work without JS (fallback to native FormSpree form)
- Animations enhance experience but aren't required

## Security

### Implemented Measures

1. **Content Security Policy** (future enhancement)
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com;">
   ```

2. **XSS Prevention**
   - All user input sanitized
   - No `innerHTML` with user data
   - Formik handles escaping

3. **HTTPS Only**
   - All deployments force HTTPS
   - FormSpree endpoint uses HTTPS

4. **No Sensitive Data**
   - No API keys in frontend
   - FormSpree endpoint is public-facing (intended)

5. **Dependencies**
   - Regular `npm audit` checks
   - Automated Dependabot alerts

### Security Headers (via hosting platform)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Accessibility

### WCAG 2.1 AA Compliance

#### 1. Semantic HTML

```html
<header>
<nav>
<main>
  <section>
    <h1>, <h2>, <h3> (proper hierarchy)
  </section>
</main>
<footer>
```

#### 2. ARIA Attributes

```html
<button aria-label="Toggle mobile menu" aria-expanded="false">
<nav aria-label="Main navigation">
<form role="form" aria-labelledby="contact-heading">
```

#### 3. Keyboard Navigation

- All interactive elements are keyboard-accessible
- Logical tab order
- Focus indicators visible
- Skip links (future enhancement)

#### 4. Color Contrast

- Text: 4.5:1 minimum contrast ratio
- Large text: 3:1 minimum
- Tested with tools like WebAIM Contrast Checker

#### 5. Screen Readers

- Alt text on all images
- Labels on all form inputs
- Meaningful link text (no "click here")

### Accessibility Testing Tools

- Lighthouse accessibility audit
- axe DevTools
- WAVE browser extension
- NVDA/JAWS screen readers

---

## Future Architectural Enhancements

### Planned Improvements

1. **Component Architecture**
   - Migrate to web components or React
   - Better code organization and reusability

2. **State Management**
   - Implement centralized state (if complexity grows)
   - Local storage for theme preference

3. **Testing Infrastructure**
   - Unit tests (Jest/Vitest)
   - E2E tests (Playwright/Cypress)
   - Visual regression tests

4. **Build Optimizations**
   - Dynamic imports for heavy libraries
   - Service worker for offline support
   - Image optimization pipeline

5. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring (Web Vitals)

---

## Questions?

For questions about the architecture:

- Review inline code comments
- Check other documentation in `/docs`
- Contact: Max@ApexWebServices.com

---

**Last updated: November 2025**

