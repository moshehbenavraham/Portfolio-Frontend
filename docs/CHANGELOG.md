# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Add unit tests for form validation
- Implement blog section
- Add project detail modals
- Implement light/dark mode persistence
- Add page loading animations
- Integrate Google Analytics
- Add resume download functionality
- Implement progressive web app (PWA) features

---

## [0.4.0] - 2025-11-05

### Added
- GitHub Actions workflow for automated deployment to GitHub Pages
- `.nojekyll` file to prevent Jekyll processing on GitHub Pages
- GitHub Pages configuration in vite.config.js with base path
- Proper DOMContentLoaded wrapper for all DOM-dependent code
- Null checks throughout JavaScript for better error handling
- `for` attributes on form labels for improved accessibility
- `required` attributes on form inputs
- Hover effects on form submit button

### Changed
- Removed unused Formik dependency (15 packages removed, reducing bundle size)
- Removed unused Vite/JavaScript logo imports and injection code
- Removed commented counter.js import
- Removed duplicate static form from HTML (now fully JavaScript-generated)
- Form validation now uses proper preventDefault logic (only prevents on errors)
- Form inputs now use `.trim()` for better validation
- Improved form label styling with `block font-medium` classes
- Enhanced profile image alt text: "Professional headshot of Max Gibson, AI & Web Developer"
- Changed project "Learn More" buttons to "Get in Touch" linking to #contact
- Updated error message styling with `text-sm mt-1` for better visibility

### Fixed
- **Critical**: Fixed broken form submission by adding FormSpree action URL to JavaScript-generated form
- **Critical**: Fixed form validation logic preventing successful submissions
- Fixed timing issues by wrapping code in DOMContentLoaded event listener
- Fixed smooth scrolling setup to run after DOM is ready
- Fixed mobile menu setup with proper null checks
- Fixed accessibility issues:
  - Added proper `for` attributes to form labels
  - Improved alt text on images
  - Fixed broken project links (changed from `#` to `#contact`)
- Fixed Prettier formatting issues in mobile menu code

### Removed
- Formik dependency (was installed but never used)
- Unused Vite and JavaScript logo imports (main.js lines 1-26)
- Commented counter.js code
- Duplicate static form from index.html

### Security
- Added input sanitization with `.trim()` on all form values
- Improved error handling with null checks throughout codebase
- All code passes ESLint and Prettier checks
- Zero npm audit vulnerabilities
- Build successful with no errors

### Deployment
- Configured for GitHub Pages deployment at: https://moshehbenavraham.github.io/Portfolio-Frontend/
- Automated deployment via GitHub Actions on push to main branch
- Production build optimized: 610ms build time, assets properly prefixed

---

## [0.3.0] - 2025-11-04

### Added
- Custom favicon.svg with MG initials and code brackets
- Blue-to-purple gradient professional design
- Comprehensive documentation suite in `/docs`:
  - Documentation index (docs/README.md)
  - Technical architecture guide (docs/ARCHITECTURE.md)
  - API integration documentation (docs/API.md)
  - Contribution guidelines (docs/CONTRIBUTING.md)
  - Deployment handbook for 5 platforms (docs/DEPLOYMENT.md)
  - Troubleshooting guide (docs/TROUBLESHOOTING.md)
  - Code of Conduct (docs/CODE_OF_CONDUCT.md)

### Changed
- **MAJOR**: Upgraded Tailwind CSS from v3.4.18 to v4.1.16
- Updated all dependencies to latest versions:
  - Vite 7.1.12 (was 5.3.3)
  - ESLint 9.39.1 with flat config (was 8.57.1 with .eslintrc.json)
  - Prettier 3.6.2
  - Autoprefixer 10.4.21
  - PostCSS 8.5.6
  - GSAP 3.13.0
  - Formik 2.4.6
  - Yup 1.7.1
- Migrated to ESLint 9 flat config format (eslint.config.js)
- Updated PostCSS config for Tailwind v4 (@tailwindcss/postcss plugin)
- Updated CSS syntax from @tailwind directives to @import 'tailwindcss'
- Fixed Prettier config (bracketSameLine replaces deprecated jsxBracketSameLine)
- Reorganized project structure (moved files to /src/)
- Updated all documentation with accurate version numbers

### Fixed
- Tailwind v4 breaking changes:
  - Replaced bg-opacity-* utilities with opacity-* or /opacity syntax
  - Updated all deprecated utility classes to v4 compatible versions
- Documentation version mismatches across all files
- ESLint configuration references (updated to flat config format)
- Missing favicon file

### Security
- Zero npm audit vulnerabilities
- All dependencies updated to latest secure versions

---

## [0.2.0] - 2024-11-XX

### Added
- Contact form with FormSpree integration
- Email validation using Yup schema
- Form submission error handling and user feedback
- Mobile hamburger menu with smooth animations
- Click-outside-to-close functionality for mobile menu
- ESLint configuration for code quality
- Prettier configuration for consistent code formatting
- Comprehensive project documentation

### Changed
- Updated navigation to be fully responsive
- Improved mobile menu UX with better touch targets
- Refactored form handling to use Formik

### Fixed
- Mobile menu not closing when clicking navigation links
- Form validation not showing proper error messages
- Header z-index issue causing overlap problems

---

## [0.1.0] - 2024-XX-XX

### Added
- Initial project setup with Vite
- Tailwind CSS integration for styling
- GSAP animations for hero section
- Basic HTML structure with all main sections:
  - Hero section with animated introduction
  - About section with personal bio
  - Skills section with technology showcase
  - Projects section with portfolio items
  - Contact section with form
- Smooth scrolling implementation
- Responsive navigation bar
- Dark mode support with Tailwind utilities
- Font Awesome icons integration
- Profile image and project assets
- Basic SEO meta tags
- Favicon implementation

### Technical Setup
- Vite 7.1.12 build tool configuration
- PostCSS with Autoprefixer
- Node.js package management
- Git version control initialization
- Project folder structure

---

## Version History

### Version Numbering

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Change Categories

- **Added** - New features or functionality
- **Changed** - Changes to existing functionality
- **Deprecated** - Features that will be removed in future versions
- **Removed** - Features that have been removed
- **Fixed** - Bug fixes
- **Security** - Security vulnerability fixes

---

## How to Update This Changelog

When making changes to the project:

1. Add your changes to the `[Unreleased]` section
2. Use the appropriate category (Added, Changed, Fixed, etc.)
3. Write clear, concise descriptions of changes
4. When releasing a new version:
   - Change `[Unreleased]` to the new version number with date
   - Create a new `[Unreleased]` section at the top
   - Update version links at the bottom (if applicable)

### Example Entry

```markdown
## [0.3.0] - 2024-12-01

### Added
- New blog section with article listings
- RSS feed for blog posts

### Changed
- Updated contact form styling for better accessibility

### Fixed
- Resolved scroll animation performance issues on mobile
```

---

## Contact

For questions about version history or releases:

**Max Gibson**  
Email: Max@ApexWebServices.com  
GitHub: [@moshehbenavraham](https://github.com/moshehbenavraham)

---

*This changelog is maintained to help track the evolution of the portfolio website and to provide transparency about what changes have been made in each version.*

