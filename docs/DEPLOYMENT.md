# Deployment Guide

This guide covers various deployment options for the portfolio website, including setup, configuration, and troubleshooting.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Building for Production](#building-for-production)
- [Deployment Platforms](#deployment-platforms)
  - [Netlify](#netlify-recommended)
  - [Vercel](#vercel)
  - [GitHub Pages](#github-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
  - [Traditional Web Hosting](#traditional-web-hosting)
- [Environment Variables](#environment-variables)
- [Custom Domain Setup](#custom-domain-setup)
- [SSL/HTTPS Configuration](#sslhttps-configuration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js v16+ and npm v7+ installed
- Git repository initialized
- All dependencies installed (`npm install`)
- Production build tested locally (`npm run build && npm run preview`)

## Building for Production

### 1. Create Production Build

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates an optimized build in the `dist/` directory with:
- Minified JavaScript and CSS
- Optimized images
- Generated source maps (for debugging)
- Asset hashing for cache busting

### 2. Preview Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build before deployment.

### 3. Verify Build

Check that:
- [ ] All pages load correctly
- [ ] Images are displayed properly
- [ ] Navigation works smoothly
- [ ] Contact form submits successfully
- [ ] Animations function as expected
- [ ] Mobile responsiveness is maintained
- [ ] No console errors appear

## Deployment Platforms

### Netlify (Recommended)

Netlify offers automatic deployments, form handling, and excellent performance.

#### Option 1: Deploy via Git (Continuous Deployment)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize Netlify
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required variables

#### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project
netlify init

# Build and deploy
npm run build
netlify deploy --prod
```

#### Netlify Configuration File

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### Vercel

Vercel provides excellent performance and is optimized for frontend frameworks.

#### Deploy via Git

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration

3. **Configure (if needed)**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Vercel Configuration File

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

### GitHub Pages

Free hosting directly from your GitHub repository.

#### Using `gh-pages` Package

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/Portfolio-Frontend"
   }
   ```

3. **Update vite.config.js**
   ```javascript
   import { defineConfig } from 'vite';

   export default defineConfig({
     base: '/Portfolio-Frontend/', // Your repo name
   });
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

#### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### AWS S3 + CloudFront

For enterprise-level hosting with AWS infrastructure.

#### 1. Create S3 Bucket

```bash
# Install AWS CLI
# Follow: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-portfolio-website
```

#### 2. Configure Bucket for Static Website

```bash
# Enable static website hosting
aws s3 website s3://your-portfolio-website \
  --index-document index.html \
  --error-document index.html
```

#### 3. Set Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-website/*"
    }
  ]
}
```

Apply policy:

```bash
aws s3api put-bucket-policy \
  --bucket your-portfolio-website \
  --policy file://bucket-policy.json
```

#### 4. Deploy to S3

```bash
# Build project
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-portfolio-website --delete
```

#### 5. Set Up CloudFront (Optional but Recommended)

- Go to AWS CloudFront console
- Create distribution
- Origin: Your S3 bucket
- Default root object: `index.html`
- SSL certificate: Request via ACM
- Custom error pages: 404 → /index.html (for SPA routing)

---

### Traditional Web Hosting

For shared hosting providers (GoDaddy, Bluehost, HostGator, etc.).

#### Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload via FTP/SFTP**
   - Connect to your hosting via FTP client (FileZilla, Cyberduck)
   - Upload all contents of `dist/` folder to `public_html` or `www` directory
   - Ensure all files maintain their directory structure

3. **Configure .htaccess** (for Apache servers)

   Create `.htaccess` in your web root:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>

   # Enable compression
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
   </IfModule>

   # Browser caching
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
     ExpiresByType image/gif "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/webp "access plus 1 year"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

---

## Environment Variables

### FormSpree Configuration

The contact form uses FormSpree. The endpoint is currently hardcoded in `src/main.js`:

```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrbzklwz';
```

To use environment variables:

1. **Create `.env` file** (for local development):
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
   ```

2. **Update `src/main.js`**:
   ```javascript
   const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
   ```

3. **Add to `.gitignore`**:
   ```
   .env
   .env.local
   .env.production
   ```

4. **Configure on hosting platform**:
   - **Netlify**: Site settings → Environment variables
   - **Vercel**: Project settings → Environment Variables
   - **GitHub Actions**: Repository settings → Secrets → Actions

---

## Custom Domain Setup

### Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Update your domain's DNS records:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Vercel

1. Go to Project settings → Domains
2. Add your domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### GitHub Pages

1. Add `CNAME` file to `public/` directory:
   ```
   yourdomain.com
   ```
2. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   ```

---

## SSL/HTTPS Configuration

All recommended platforms (Netlify, Vercel, GitHub Pages) provide free automatic SSL certificates via Let's Encrypt.

### Enabling HTTPS

- **Netlify**: Automatic (Site settings → Domain management → HTTPS)
- **Vercel**: Automatic for all domains
- **GitHub Pages**: Automatic (Settings → Pages → Enforce HTTPS)
- **CloudFront**: Use AWS Certificate Manager (ACM)

### Force HTTPS Redirect

Add to `netlify.toml`:
```toml
[[redirects]]
  from = "http://yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true
```

---

## Performance Optimization

### Pre-Deployment Checklist

- [ ] Minify JavaScript and CSS (handled by Vite)
- [ ] Optimize images (use WebP format when possible)
- [ ] Enable gzip/brotli compression
- [ ] Set up browser caching headers
- [ ] Remove unused CSS (Tailwind purge is automatic)
- [ ] Lazy load images and components
- [ ] Use CDN for assets

### Image Optimization

```bash
# Install sharp for image optimization
npm install -D vite-plugin-imagemin

# Add to vite.config.js
import viteImagemin from 'vite-plugin-imagemin';

export default {
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: { plugins: [{ name: 'removeViewBox' }] },
      webp: { quality: 80 }
    })
  ]
};
```

### Lighthouse Score Targets

Aim for these scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Run audit:
```bash
npm install -g lighthouse
lighthouse https://your-deployed-site.com --view
```

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: Out of memory**
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Deployment Issues

**404 on page refresh**
- Ensure SPA redirects are configured (see platform-specific sections)

**Assets not loading**
- Check `base` path in `vite.config.js`
- Verify all asset paths are relative

**Environment variables not working**
- Ensure variables are prefixed with `VITE_`
- Rebuild after adding new variables

**FormSpree not receiving emails**
- Verify endpoint URL is correct
- Check FormSpree dashboard for quota limits
- Ensure form submission returns 200 status

### Performance Issues

**Slow initial load**
- Enable code splitting
- Lazy load heavy libraries (GSAP, etc.)
- Optimize images

**Large bundle size**
```bash
# Analyze bundle
npm run build -- --mode=analyze

# Or use rollup-plugin-visualizer
npm install -D rollup-plugin-visualizer
```

---

## Rollback Strategy

### Netlify

```bash
# List deployments
netlify list

# Rollback to previous deployment
netlify rollback
```

### Vercel

- Go to Deployments tab
- Click "..." on previous deployment
- Select "Promote to Production"

### GitHub Pages

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

---

## Monitoring and Analytics

### Add Google Analytics

Add to `index.html` (before closing `</head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitoring Services

- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry, LogRocket
- **Performance**: New Relic, Datadog

---

## Support

For deployment issues:

- Check platform-specific documentation
- Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Contact: Max@ApexWebServices.com

---

**Last updated: November 2025**

