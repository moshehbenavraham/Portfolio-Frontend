# Contributing to Portfolio Website

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Portfolio-Frontend.git
   cd Portfolio-Frontend
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/moshehbenavraham/Portfolio-Frontend.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Verify everything works**
   - Open http://localhost:5173 in your browser
   - Check that all sections load properly
   - Test the contact form validation

## Development Workflow

### Creating a New Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features or enhancements
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `style/` - UI/styling changes
- `test/` - Adding or updating tests

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Coding Standards

### JavaScript

- Use ES6+ syntax
- Follow the existing ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Avoid deeply nested code (max 3 levels)

**Example:**
```javascript
// Good
const calculateTotalPrice = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Bad
function calc(x) {
  let s = 0;
  for (let i = 0; i < x.length; i++) {
    s = s + x[i].p;
  }
  return s;
}
```

### CSS/Tailwind

- Use Tailwind utility classes when possible
- Create custom CSS classes only when necessary
- Follow the BEM naming convention for custom classes
- Use CSS variables for consistent theming
- Maintain responsive design principles (mobile-first)

**Example:**
```html
<!-- Good -->
<button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
  Click Me
</button>

<!-- Avoid inline styles -->
<button style="background: blue; padding: 10px;">
  Click Me
</button>
```

### HTML

- Use semantic HTML5 elements
- Include proper ARIA attributes for accessibility
- Ensure all images have alt text
- Maintain proper heading hierarchy (h1 → h2 → h3)

### Code Formatting

This project uses Prettier and ESLint for code formatting and quality:

```bash
# Format code
npm run format

# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix
```

**Run these commands before committing!**

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commit messages
git commit -m "feat(contact-form): add email validation with Yup"
git commit -m "fix(navigation): resolve mobile menu not closing on link click"
git commit -m "docs(readme): update setup instructions for M1 Macs"
git commit -m "style(hero): improve button spacing and hover effects"

# Bad commit messages
git commit -m "update stuff"
git commit -m "fix bug"
git commit -m "changes"
```

### Commit Best Practices

- Keep commits small and focused
- Write clear, descriptive commit messages
- Reference issue numbers when applicable (e.g., "fixes #123")
- Ensure each commit is buildable and testable

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes**
   ```bash
   npm run dev     # Manual testing
   npm run build   # Ensure build succeeds
   npm run lint    # Check for linting errors
   ```

3. **Format your code**
   ```bash
   npm run format
   npm run lint:fix
   ```

### Submitting a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request on GitHub**
   - Use a clear, descriptive title
   - Fill out the PR template completely
   - Reference any related issues
   - Add screenshots for UI changes
   - Request review from maintainers

3. **PR Title Format**
   ```
   feat(scope): add new feature
   fix(scope): resolve specific bug
   docs: update contributing guidelines
   ```

### PR Description Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested locally
- [ ] Tested on mobile devices
- [ ] Tested on different browsers
- [ ] All lint checks pass
- [ ] Build succeeds

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] My changes generate no new warnings
- [ ] I have updated the documentation accordingly
```

### After Submission

- Respond to review comments promptly
- Make requested changes in new commits
- Once approved, a maintainer will merge your PR

## Reporting Bugs

### Before Submitting a Bug Report

- Check the existing issues to avoid duplicates
- Test with the latest version
- Gather relevant information (browser, OS, etc.)

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g., Windows 11, macOS 13]
 - Browser: [e.g., Chrome 120, Firefox 121]
 - Node version: [e.g., 18.17.0]
 - npm version: [e.g., 9.6.7]

**Additional context**
Any other relevant information.
```

## Suggesting Enhancements

### Enhancement Proposal Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, mockups, or examples.

**Implementation ideas**
If you have ideas on how to implement this.
```

## Questions?

If you have questions about contributing, feel free to:

- Open a discussion on GitHub
- Contact Max Gibson at Max@ApexWebServices.com
- Review existing documentation in the `/docs` folder

## Recognition

Contributors will be acknowledged in the project's README.md file. Thank you for helping make this project better!

---

**Happy Contributing! 🚀**

