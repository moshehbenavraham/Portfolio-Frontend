# API Documentation

This document describes all external API integrations, endpoints, and third-party services used in the portfolio website.

## Table of Contents

- [Overview](#overview)
- [FormSpree Integration](#formspree-integration)
- [Font Awesome CDN](#font-awesome-cdn)
- [Future API Integrations](#future-api-integrations)
- [Rate Limits and Quotas](#rate-limits-and-quotas)
- [Error Handling](#error-handling)
- [Testing APIs](#testing-apis)

---

## Overview

This portfolio website currently integrates with two external services:

1. **FormSpree** - Contact form email delivery
2. **Font Awesome CDN** - Icon library

All integrations are designed to:
- Fail gracefully if services are unavailable
- Minimize external dependencies
- Respect user privacy
- Load asynchronously when possible

---

## FormSpree Integration

### Overview

FormSpree is a form backend service that handles form submissions and delivers them via email without requiring a backend server.

**Official Documentation:** https://formspree.io/docs

### Configuration

#### Endpoint

```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrbzklwz';
```

**Location:** `src/main.js` (line 96)

#### Form Submission

**Method:** `POST`  
**Content-Type:** `application/json`

**Request Format:**

```javascript
POST https://formspree.io/f/mrbzklwz
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response Format:**

```javascript
// Success (200 OK)
{
  "ok": true,
  "next": "https://formspree.io/thanks"
}

// Error (400 Bad Request)
{
  "ok": false,
  "error": "Email is invalid",
  "errors": [
    {
      "field": "email",
      "message": "Email is invalid"
    }
  ]
}

// Rate Limit (429 Too Many Requests)
{
  "ok": false,
  "error": "Too many requests"
}
```

### Implementation

#### JavaScript Fetch API

```javascript
const submitForm = async (values) => {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        message: values.message,
      }),
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};
```

### Form Validation

**Client-Side Validation (Yup Schema):**

```javascript
import * as yup from 'yup';

const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});
```

### Error Handling

#### Network Errors

```javascript
catch (error) {
  if (error.name === 'NetworkError') {
    displayError('Network connection failed. Please check your internet connection.');
  } else if (error.name === 'TypeError') {
    displayError('Unable to reach the server. Please try again later.');
  } else {
    displayError('An unexpected error occurred. Please try again.');
  }
}
```

#### FormSpree-Specific Errors

```javascript
if (response.status === 429) {
  displayError('Too many submissions. Please try again in a few minutes.');
} else if (response.status === 400) {
  const data = await response.json();
  displayError(data.error || 'Invalid form data. Please check your inputs.');
} else if (response.status === 500) {
  displayError('Server error. Please try again later.');
}
```

### Success Handling

```javascript
const handleSuccess = () => {
  // Display success message
  const successMessage = document.createElement('div');
  successMessage.className = 'bg-green-100 text-green-800 p-4 rounded-lg mb-4';
  successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
  
  // Reset form
  formik.resetForm();
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
};
```

### Fallback Mechanism

If JavaScript fails, the HTML form submits directly to FormSpree:

```html
<form action="https://formspree.io/f/mrbzklwz" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### FormSpree Dashboard

Access your form submissions:
- URL: https://formspree.io/forms/mrbzklwz/submissions
- View submissions
- Export to CSV
- Configure notifications
- Check quota usage

---

## Font Awesome CDN

### Overview

Font Awesome provides icon fonts and SVG icons via CDN.

**Official Documentation:** https://fontawesome.com/docs

### Configuration

#### CDN Link

```html
<script 
  src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" 
  defer
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
```

**Location:** `index.html` (line 26)

#### Version

- **Current:** 5.15.3
- **Type:** Free version
- **Format:** JavaScript (SVG with JavaScript)

### Usage

#### Icon Syntax

```html
<!-- Solid style -->
<i class="fas fa-envelope"></i>

<!-- Brands -->
<i class="fab fa-github"></i>

<!-- Regular style -->
<i class="far fa-heart"></i>
```

#### Current Icons Used

```html
<!-- Navigation -->
<i class="fas fa-home"></i>
<i class="fas fa-user"></i>
<i class="fas fa-code"></i>
<i class="fas fa-project-diagram"></i>
<i class="fas fa-envelope"></i>

<!-- Social Media -->
<i class="fab fa-github"></i>
<i class="fab fa-linkedin"></i>
<i class="fab fa-twitter"></i>

<!-- Skills -->
<i class="fab fa-html5"></i>
<i class="fab fa-css3-alt"></i>
<i class="fab fa-js"></i>
<i class="fab fa-react"></i>
<i class="fab fa-node-js"></i>

<!-- Contact -->
<i class="fas fa-paper-plane"></i>
```

### Performance Considerations

#### Pros
- No build step required
- Automatic caching via CDN
- Fast delivery from edge locations

#### Cons
- External dependency (blocking if CDN fails)
- Loads entire icon set (~73KB)

#### Optimization Options

**Option 1: Subset Icons (Future Enhancement)**

Use Font Awesome Kit (requires account):
```html
<script src="https://kit.fontawesome.com/your-kit-id.js"></script>
```

**Option 2: Self-Host Icons**

1. Install Font Awesome npm package
2. Import only needed icons
3. Bundle with Vite

```bash
npm install @fortawesome/fontawesome-free
```

```javascript
// src/main.js
import '@fortawesome/fontawesome-free/css/all.min.css';
```

**Option 3: Switch to SVG Sprites**

Replace with inline SVG icons for better control and smaller bundle.

### Fallback

If Font Awesome fails to load, icons won't display but functionality remains intact. Consider adding text labels:

```html
<i class="fas fa-envelope" aria-hidden="true"></i>
<span class="sr-only">Email</span> Contact
```

---

## Future API Integrations

### Planned Integrations

#### 1. Google Analytics

**Purpose:** Track visitor behavior and site performance

**Implementation:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Privacy Considerations:**
- Add cookie consent banner
- Anonymize IP addresses
- Comply with GDPR/CCPA

#### 2. GitHub API

**Purpose:** Display recent repositories and contributions

**Endpoint:** `https://api.github.com/users/moshehbenavraham`

**Rate Limit:** 60 requests/hour (unauthenticated)

**Example:**
```javascript
const fetchGitHubRepos = async () => {
  const response = await fetch('https://api.github.com/users/moshehbenavraham/repos?sort=updated&per_page=6');
  const repos = await response.json();
  return repos;
};
```

#### 3. Blog API (if implementing blog)

**Options:**
- **Dev.to API:** Display articles from Dev.to
- **Medium RSS:** Fetch Medium articles
- **Headless CMS:** Contentful, Sanity, Strapi

**Example (Dev.to):**
```javascript
const fetchDevToArticles = async () => {
  const response = await fetch('https://dev.to/api/articles?username=yourusername');
  const articles = await response.json();
  return articles;
};
```

---

## Rate Limits and Quotas

### FormSpree

| Plan | Submissions/Month | Archive |
|------|-------------------|---------|
| **Free** | 50 | 30 days |
| **Basic** | 1,000 | Forever |
| **Pro** | 10,000 | Forever |

**Current Plan:** Free (50 submissions/month)

**Rate Limiting:**
- Max 1 submission per email per form per minute
- HTTP 429 status code when limit exceeded

**Monitoring:**
- Check FormSpree dashboard regularly
- Set up email notifications for quota warnings
- Consider upgrading if traffic increases

### Font Awesome CDN

**No rate limits** - served via Cloudflare CDN with:
- Global edge caching
- Automatic failover
- DDoS protection

### GitHub API (Future)

| Authentication | Rate Limit |
|----------------|------------|
| **Unauthenticated** | 60 requests/hour |
| **Authenticated** | 5,000 requests/hour |

**Headers to Check:**
```javascript
const response = await fetch('https://api.github.com/users/username');
console.log(response.headers.get('X-RateLimit-Remaining'));
console.log(response.headers.get('X-RateLimit-Reset'));
```

---

## Error Handling

### Best Practices

#### 1. User-Friendly Error Messages

```javascript
const errorMessages = {
  400: 'Invalid form data. Please check your inputs.',
  429: 'Too many requests. Please try again in a few minutes.',
  500: 'Server error. Please try again later.',
  503: 'Service temporarily unavailable. Please try again later.',
  network: 'Network connection failed. Please check your internet connection.',
  default: 'An unexpected error occurred. Please try again.',
};
```

#### 2. Retry Logic

```javascript
const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

#### 3. Timeout Handling

```javascript
const fetchWithTimeout = async (url, options, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
```

---

## Testing APIs

### FormSpree Testing

#### Local Testing

```bash
# Start dev server
npm run dev

# Fill out form at http://localhost:5173
# Check FormSpree dashboard for submissions
```

#### Manual Testing

```bash
# Test with curl
curl -X POST https://formspree.io/f/mrbzklwz \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

#### Automated Testing (Future)

```javascript
// test/contact-form.test.js
import { describe, it, expect, vi } from 'vitest';

describe('Contact Form', () => {
  it('should submit form successfully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true })
    });
    
    const result = await submitForm({
      name: 'Test',
      email: 'test@example.com',
      message: 'Test message'
    });
    
    expect(result.ok).toBe(true);
  });
});
```

### Font Awesome Testing

#### Check if loaded

```javascript
// In browser console
console.log(window.FontAwesome ? 'Loaded' : 'Not loaded');
```

#### Fallback test

```javascript
// Temporarily block CDN in DevTools Network tab
// Verify site still functions without icons
```

---

## API Security

### Best Practices

#### 1. Environment Variables

For future APIs requiring keys:

```javascript
// .env
VITE_API_KEY=your_api_key_here

// src/main.js
const API_KEY = import.meta.env.VITE_API_KEY;
```

#### 2. HTTPS Only

All API calls use HTTPS:
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrbzklwz'; // ✅
// Never use: http://formspree.io/... // ❌
```

#### 3. Input Sanitization

```javascript
const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS
    .slice(0, 1000); // Limit length
};
```

#### 4. Rate Limiting (Frontend)

```javascript
let lastSubmission = 0;
const MIN_INTERVAL = 5000; // 5 seconds

const canSubmit = () => {
  const now = Date.now();
  if (now - lastSubmission < MIN_INTERVAL) {
    return false;
  }
  lastSubmission = now;
  return true;
};
```

---

## API Monitoring

### Health Checks

Create `/api-status` page (future enhancement):

```javascript
const checkAPIHealth = async () => {
  const apis = [
    { name: 'FormSpree', url: 'https://formspree.io' },
    { name: 'Font Awesome CDN', url: 'https://cdnjs.cloudflare.com' },
  ];
  
  const results = await Promise.all(
    apis.map(async (api) => {
      try {
        const response = await fetch(api.url, { method: 'HEAD' });
        return { ...api, status: response.ok ? 'up' : 'down' };
      } catch {
        return { ...api, status: 'down' };
      }
    })
  );
  
  return results;
};
```

### Logging

```javascript
const logAPICall = (endpoint, method, status, duration) => {
  console.log(`[API] ${method} ${endpoint} - ${status} (${duration}ms)`);
  
  // Send to analytics (future)
  // gtag('event', 'api_call', { endpoint, method, status, duration });
};
```

---

## Questions?

For questions about API integrations:

- Review FormSpree documentation: https://formspree.io/docs
- Check Font Awesome docs: https://fontawesome.com/docs
- Contact: Max@ApexWebServices.com

---

**Last updated: November 2025**

