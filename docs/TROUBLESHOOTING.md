# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with the portfolio website during development, building, and deployment.

## Table of Contents

- [Development Issues](#development-issues)
- [Build Issues](#build-issues)
- [Deployment Issues](#deployment-issues)
- [Browser Issues](#browser-issues)
- [Form Issues](#form-issues)
- [Animation Issues](#animation-issues)
- [Styling Issues](#styling-issues)
- [Performance Issues](#performance-issues)
- [Debugging Tools](#debugging-tools)
- [Getting Help](#getting-help)

---

## Development Issues

### Dev Server Won't Start

#### Issue: `npm run dev` fails

**Symptoms:**
```
Error: Cannot find module 'vite'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

#### Issue: Port 5173 is already in use

**Symptoms:**
```
Error: Port 5173 is already in use
```

**Solutions:**

**Option 1: Kill the process using the port**
```bash
# Find process
lsof -i :5173
# or
netstat -ano | findstr :5173  # Windows

# Kill process
kill -9 [PID]
# or
taskkill /PID [PID] /F  # Windows
```

**Option 2: Use a different port**
```bash
npm run dev -- --port 3000
```

**Option 3: Add to vite.config.js**
```javascript
export default {
  server: {
    port: 3000,
    strictPort: false, // Automatically try next available port
  }
}
```

---

#### Issue: Hot Module Replacement (HMR) not working

**Symptoms:**
- Changes not reflected automatically
- Need to manually refresh browser

**Solutions:**

**1. Check browser console for errors**
```
[vite] connected.
```

**2. Clear browser cache**
- Chrome: Ctrl+Shift+Del → Clear cache
- Or use incognito mode

**3. Restart dev server**
```bash
# Stop (Ctrl+C) and restart
npm run dev
```

**4. Check firewall/antivirus**
- May block WebSocket connections
- Temporarily disable to test

**5. Use polling (last resort)**
```javascript
// vite.config.js
export default {
  server: {
    watch: {
      usePolling: true,
    }
  }
}
```

---

### Node/npm Version Issues

#### Issue: Incompatible Node version

**Symptoms:**
```
error: The engine "node" is incompatible with this module
```

**Solution:**

**Check required versions:**
```bash
node --version  # Should be 16.x or higher
npm --version   # Should be 7.x or higher
```

**Update Node:**

**Using nvm (recommended):**
```bash
# Install nvm: https://github.com/nvm-sh/nvm

# Install latest LTS
nvm install --lts
nvm use --lts

# Verify
node --version
```

**Direct download:**
- Visit https://nodejs.org
- Download LTS version
- Install and restart terminal

---

## Build Issues

### Build Fails

#### Issue: Build fails with "out of memory" error

**Symptoms:**
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Or add to package.json scripts
"scripts": {
  "build": "NODE_OPTIONS=--max-old-space-size=4096 vite build"
}
```

---

#### Issue: Module not found errors

**Symptoms:**
```
Error: Cannot find module 'gsap' or 'formik'
```

**Solutions:**

**1. Install missing dependencies**
```bash
npm install gsap formik yup
```

**2. Clear cache and reinstall**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**3. Check import paths**
```javascript
// Correct
import gsap from 'gsap';

// Incorrect
import gsap from './gsap'; // ❌
```

---

#### Issue: CSS not being generated

**Symptoms:**
- No CSS file in `dist/assets/`
- Unstyled website after build

**Solutions:**

**1. Check Tailwind config**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

**2. Check PostCSS config**
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**3. Verify CSS imports**
```javascript
// src/main.js
import './index.css'; // Must be present
```

---

### Build Size Issues

#### Issue: Bundle size too large

**Symptoms:**
- `dist/assets/main.[hash].js` > 500KB
- Slow page load times

**Solutions:**

**1. Analyze bundle**
```bash
npm install -D rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [visualizer()],
}

# Build and check stats.html
npm run build
```

**2. Check for duplicate dependencies**
```bash
npm dedupe
```

**3. Dynamic imports**
```javascript
// Before (loads immediately)
import gsap from 'gsap';

// After (loads on demand)
const loadGSAP = async () => {
  const gsap = await import('gsap');
  return gsap.default;
};
```

---

## Deployment Issues

### 404 Errors After Deployment

#### Issue: Pages work locally but show 404 on deployed site

**Symptoms:**
- Homepage loads fine
- Refresh on any section causes 404
- Direct URLs don't work

**Solutions:**

**For Netlify:**
Create `public/_redirects`:
```
/*    /index.html   200
```

**For Vercel:**
Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**For GitHub Pages:**
Create `public/404.html` (copy of `index.html`)

**For Apache:**
Create `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

#### Issue: Assets not loading after deployment

**Symptoms:**
- Images return 404
- CSS/JS not loading
- Console errors: `Failed to load resource`

**Solutions:**

**1. Check base path in vite.config.js**

**For subdirectory deployment (GitHub Pages):**
```javascript
export default {
  base: '/Portfolio-Frontend/', // Must match repo name
}
```

**For root domain:**
```javascript
export default {
  base: '/', // Default
}
```

**2. Use relative paths for images**
```html
<!-- Correct -->
<img src="/profile.png" alt="Profile">

<!-- Incorrect for subdirectory -->
<img src="profile.png" alt="Profile">
```

**3. Verify files are in dist/**
```bash
ls -la dist/
ls -la dist/assets/
```

---

#### Issue: Environment variables not working

**Symptoms:**
```javascript
import.meta.env.VITE_API_KEY // undefined
```

**Solutions:**

**1. Check variable naming**
```bash
# .env
VITE_API_KEY=abc123  # ✅ Correct (prefixed with VITE_)
API_KEY=abc123       # ❌ Won't work
```

**2. Restart dev server**
```bash
# Changes to .env require restart
npm run dev
```

**3. Set on hosting platform**

**Netlify:**
- Site settings → Environment variables
- Add key-value pairs

**Vercel:**
- Project settings → Environment Variables
- Add for Production/Preview/Development

**4. Rebuild after adding variables**
```bash
npm run build
```

---

## Browser Issues

### Cross-Browser Compatibility

#### Issue: Site works in Chrome but not Safari/Firefox

**Solutions:**

**1. Check browser console**
- Open DevTools (F12)
- Look for JavaScript errors
- Note any unsupported features

**2. Check CSS features**
```css
/* Use autoprefixer (already configured) */
/* Check caniuse.com for browser support */
```

**3. Polyfills (if needed)**
```bash
npm install core-js

# Import in main.js
import 'core-js/stable';
```

**4. Test in multiple browsers**
- Chrome, Firefox, Safari, Edge
- Use BrowserStack or LambdaTest for testing

---

#### Issue: Layout broken on mobile

**Symptoms:**
- Text overflowing
- Elements overlapping
- Horizontal scrolling

**Solutions:**

**1. Check viewport meta tag**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**2. Test responsive breakpoints**
```bash
# Chrome DevTools
# Toggle device toolbar (Ctrl+Shift+M)
# Test various screen sizes
```

**3. Check Tailwind responsive classes**
```html
<!-- Ensure mobile-first approach -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Mobile: full width
  Tablet: half width
  Desktop: third width
</div>
```

**4. Fix fixed widths**
```css
/* Bad */
.container {
  width: 1200px; /* Too wide for mobile */
}

/* Good */
.container {
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
}
```

---

### Performance Issues in Browser

#### Issue: Slow page load

**Symptoms:**
- Lighthouse score < 50
- Long load times
- Laggy animations

**Solutions:**

**1. Run Lighthouse audit**
```bash
# Chrome DevTools → Lighthouse tab → Generate report
```

**2. Optimize images**
```bash
# Convert to WebP
npm install -g sharp-cli
sharp input.png --output output.webp

# Use in HTML
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>
```

**3. Lazy load images**
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

**4. Reduce bundle size**
```bash
# Check bundle size
npm run build

# Look for large files in dist/assets/
```

---

## Form Issues

### Form Not Submitting

#### Issue: Contact form doesn't submit

**Symptoms:**
- Button click does nothing
- No success/error message
- No email received

**Solutions:**

**1. Check browser console**
```javascript
// Look for errors
Failed to fetch
CORS error
Network error
```

**2. Verify FormSpree endpoint**
```javascript
// src/main.js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrbzklwz';

// Test in browser console
fetch('https://formspree.io/f/mrbzklwz', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', message: 'test' })
})
.then(r => r.json())
.then(d => console.log(d));
```

**3. Check FormSpree quota**
- Login to https://formspree.io
- Check submission count (free: 50/month)
- Upgrade plan if exceeded

**4. Test without JavaScript**
- Disable JavaScript in browser
- Form should still submit (fallback)

---

#### Issue: Validation errors not showing

**Symptoms:**
- Form submits with invalid data
- No error messages displayed

**Solutions:**

**1. Check Yup schema**
```javascript
const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  message: yup.string().required('Message is required'),
});
```

**2. Verify error display logic**
```javascript
// Ensure error divs exist
<div class="error-message text-red-600">
  {formik.errors.email}
</div>
```

**3. Test validation manually**
```javascript
// Browser console
contactSchema.validate({ name: '', email: 'invalid', message: '' })
  .catch(err => console.log(err.errors));
```

---

## Animation Issues

### GSAP Animations Not Working

#### Issue: Animations don't play

**Symptoms:**
- Elements appear without animation
- No smooth transitions
- Console errors related to GSAP

**Solutions:**

**1. Check GSAP import**
```javascript
// Correct
import gsap from 'gsap';

// Verify in console
console.log(gsap.version); // Should print version number
```

**2. Check element selection**
```javascript
// Ensure elements exist
const element = document.querySelector('.hero-title');
if (!element) {
  console.error('Element not found!');
  return;
}

gsap.from(element, { opacity: 0 });
```

**3. Verify animation properties**
```javascript
// Good
gsap.from('.element', {
  opacity: 0,
  y: 50,
  duration: 1,
});

// Bad (missing duration)
gsap.from('.element', {
  opacity: 0,
});
```

**4. Check for JavaScript errors**
- Open console
- Look for errors before animations
- Fix any blocking errors

---

#### Issue: Animations choppy/laggy

**Symptoms:**
- Stuttering animations
- Frame drops
- Slow performance

**Solutions:**

**1. Use GPU-accelerated properties**
```javascript
// Good (GPU-accelerated)
gsap.to(element, {
  x: 100,        // translateX
  y: 50,         // translateY
  opacity: 0,
  scale: 1.2,
});

// Bad (causes layout reflow)
gsap.to(element, {
  left: '100px',  // ❌
  top: '50px',    // ❌
  width: '200px', // ❌
});
```

**2. Use will-change sparingly**
```css
.animating-element {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animating-element.done {
  will-change: auto;
}
```

**3. Reduce animation complexity**
```javascript
// Simplify animations
// Reduce number of elements animating simultaneously
// Use stagger instead of animating all at once
gsap.from('.items', {
  opacity: 0,
  stagger: 0.1, // Animate one at a time
});
```

---

## Styling Issues

### Tailwind Classes Not Applied

#### Issue: Tailwind utilities not working

**Symptoms:**
- Classes in HTML but no styling
- Default browser styles showing

**Solutions:**

**1. Check CSS import**
```javascript
// src/main.js - must import CSS
import './index.css';
```

**2. Check Tailwind directives**
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**3. Verify content paths**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

**4. Rebuild/restart dev server**
```bash
# Stop dev server (Ctrl+C)
npm run dev
```

**5. Check for typos**
```html
<!-- Correct -->
<div class="bg-blue-500">

<!-- Incorrect -->
<div class="bg-blue">     <!-- ❌ No color value -->
<div class="background-blue-500"> <!-- ❌ Wrong property name -->
```

---

#### Issue: Custom CSS not working

**Symptoms:**
- Custom styles in `index.css` not applied
- Tailwind utilities override custom styles

**Solutions:**

**1. Use !important (sparingly)**
```css
.custom-class {
  color: red !important;
}
```

**2. Increase specificity**
```css
/* Instead of */
.button { color: red; }

/* Use */
.custom-section .button { color: red; }
```

**3. Use Tailwind layers**
```css
@layer components {
  .custom-button {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
}
```

**4. Check load order**
```javascript
// main.js - order matters!
import './index.css';        // Custom styles
import './another-style.css'; // Override custom styles
```

---

## Performance Issues

### Large Bundle Size

**See:** [Build Size Issues](#build-size-issues) above

---

### Slow Lighthouse Scores

#### Issue: Low performance score

**Common causes and fixes:**

| Issue | Solution |
|-------|----------|
| **Large images** | Convert to WebP, optimize size |
| **Unused CSS** | Ensure Tailwind purge is working |
| **Large JavaScript** | Code split, lazy load |
| **No caching** | Configure cache headers |
| **No compression** | Enable gzip/brotli |
| **Render-blocking resources** | Defer/async scripts |

**Quick wins:**

```html
<!-- Defer non-critical scripts -->
<script src="script.js" defer></script>

<!-- Preload critical assets -->
<link rel="preload" href="font.woff2" as="font" crossorigin>

<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Description">
```

---

## Debugging Tools

### Browser DevTools

#### Console
```javascript
// Debug variables
console.log('Value:', value);

// Debug objects
console.table(arrayOfObjects);

// Measure performance
console.time('operation');
// ... code ...
console.timeEnd('operation');
```

#### Network Tab
- Check failed requests (red)
- Verify asset sizes
- Check response times
- Look for 404s

#### Performance Tab
- Record page load
- Identify bottlenecks
- Check for long tasks
- Measure frame rate

#### Lighthouse
- Performance audit
- Accessibility check
- SEO analysis
- Best practices review

---

### VS Code Extensions

Recommended for debugging:

- **ESLint** - Show linting errors inline
- **Prettier** - Format on save
- **Tailwind CSS IntelliSense** - Autocomplete classes
- **Error Lens** - Inline error display
- **Import Cost** - Show bundle size of imports

---

### Command-Line Tools

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format

# Build and check for errors
npm run build

# Preview production build
npm run preview
```

---

## Getting Help

### Before Asking for Help

1. **Check this guide** - Your issue may be covered
2. **Search closed issues** - On GitHub repository
3. **Check browser console** - For JavaScript errors
4. **Try incognito mode** - Rule out extensions
5. **Clear cache** - Old assets may be cached
6. **Update dependencies** - Run `npm update`

### How to Ask for Help

**Include this information:**

```markdown
## Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 11, macOS 13]
- Browser: [e.g., Chrome 120]
- Node version: [run `node --version`]
- npm version: [run `npm --version`]

## Screenshots
If applicable

## Console Errors
Any errors from browser console

## What I've Tried
List attempted solutions
```

### Where to Get Help

1. **GitHub Issues** - https://github.com/moshehbenavraham/Portfolio-Frontend/issues
2. **Email** - Max@ApexWebServices.com
3. **Documentation** - Check `/docs` folder
4. **Stack Overflow** - Tag: `vite`, `tailwindcss`, `gsap`

---

## Common Error Messages

### Quick Reference

| Error | Likely Cause | Solution |
|-------|-------------|----------|
| `Cannot find module` | Missing dependency | `npm install` |
| `Port already in use` | Dev server running | Kill process or use different port |
| `Out of memory` | Build size too large | Increase Node memory |
| `CORS error` | API request blocked | Check endpoint configuration |
| `404 Not Found` | Missing file or routing issue | Check build output and redirects |
| `Failed to fetch` | Network error | Check internet connection |
| `Unexpected token` | Syntax error | Check console for line number |
| `Module parse failed` | Import error | Check import syntax |

---

**Still having issues?** Contact Max@ApexWebServices.com

---

**Last updated: November 2025**

