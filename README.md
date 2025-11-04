# Interactive Portfolio Website Project

## Project Overview
This project aims to create an interactive portfolio website to showcase front-end development skills in HTML, CSS, and JavaScript. The website features a responsive design, smooth scrolling and animations, an interactive project showcase, a contact form with validation, and a dark/light mode toggle.

## Key Features
1. Responsive Design
2. Smooth Scrolling and Animations
3. Interactive Project Showcase
4. Contact Form with Validation
5. Dark/Light Mode Toggle

## Project Structure
```
Portfolio-Frontend/
├── index.html              # Main HTML file
├── src/                    # Source files
│   ├── index.css          # Global styles + Tailwind
│   ├── main.js            # Application logic
│   └── assets/            # Bundled assets
├── public/                 # Static assets
│   ├── profile.png
│   ├── project1.webp
│   └── project2.webp
├── docs/                   # 📚 Comprehensive documentation
│   ├── README.md          # Documentation index
│   ├── ARCHITECTURE.md    # Technical architecture
│   ├── API.md             # API documentation
│   ├── CONTRIBUTING.md    # Contribution guide
│   ├── DEPLOYMENT.md      # Deployment instructions
│   ├── TROUBLESHOOTING.md # Common issues & solutions
│   ├── CHANGELOG.md       # Version history
│   └── CODE_OF_CONDUCT.md # Community guidelines
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── .prettierrc
```

## Technology Stack and Tools

### Core Technologies
- HTML5
- CSS3
- JavaScript (ES6+)

### Development Environment
1. **Code Editor**: Visual Studio Code (VS Code)
2. **Version Control**: Git + GitHub
3. **Package Manager**: npm (Node Package Manager)

### Build Tools and Frameworks
4. **Build Tool**: Vite
5. **CSS Framework**: Tailwind CSS
6. **Animation Library**: GSAP (GreenSock Animation Platform)
7. **Form Handling**: Formik + Yup

### Code Quality Tools
8. **Linter**: ESLint
9. **Formatter**: Prettier

### Testing and Optimization
10. **Responsive Design Testing**: Browser DevTools
11. **Performance Optimization**: Lighthouse

## Setup Instructions
1. Install Node.js and npm (if not already installed)
2. Set up the project with Vite:
   ```bash
   npm create vite@latest my-portfolio -- --template vanilla
   cd my-portfolio
   npm install
   ```
3. Install additional dependencies:
   ```bash
   npm install gsap formik yup
   npm install -D tailwindcss postcss autoprefixer eslint prettier eslint-config-prettier eslint-plugin-prettier
   ```
4. Set up Tailwind CSS:
   ```bash
   npx tailwindcss init -p
   ```
   Update tailwind.config.js and create src/index.css with Tailwind directives.
5. Configure ESLint and Prettier (create .eslintrc.json and .prettierrc)
6. Update package.json scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "lint": "eslint src --ext .js",
     "format": "prettier --write \"src/**/*.{js,jsx,css,html}\""
   }
   ```

## Current Status
- Basic project structure set up with Vite
- Initial HTML, CSS, and JavaScript files created
- Git version control initialized with GitHub Desktop

## Next Steps
1. Implement the responsive design using Tailwind CSS
2. Add smooth scrolling and animations with GSAP
3. Create the interactive project showcase
4. Implement the contact form with Formik and Yup
5. Add the dark/light mode toggle functionality
6. Optimize performance and run Lighthouse audits
7. Deploy the website (consider using GitHub Pages or Netlify for free hosting)

## Documentation

Comprehensive documentation is available in the [`/docs`](./docs) directory:

- **[Getting Started](./README.md)** - This file - project overview and setup
- **[Documentation Index](./docs/README.md)** - Complete documentation guide
- **[Architecture](./docs/ARCHITECTURE.md)** - Technical architecture and design
- **[API Reference](./docs/API.md)** - External API integrations
- **[Contributing Guide](./docs/CONTRIBUTING.md)** - How to contribute
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deploy to production
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Changelog](./docs/CHANGELOG.md)** - Version history
- **[Code of Conduct](./docs/CODE_OF_CONDUCT.md)** - Community guidelines

## Contributing
This is a personal portfolio project, but suggestions and feedback are welcome! 

Before contributing, please:
1. Read the [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
2. Review the [Contributing Guide](./docs/CONTRIBUTING.md)
3. Check existing issues and pull requests

To contribute:
- Open an issue to discuss major changes
- Submit a pull request for improvements
- Follow the coding standards outlined in the documentation

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Max Gibson aka Mosheh Ben Avraham - Max@ApexWebServices.com

Project Link: https://github.com/moshehbenavraham/my-portfolio

## package-lock.json

The `package-lock.json` file is an automatically generated file that provides a detailed, versioned description of the exact dependency tree for a Node.js project. Here's a comprehensive description of what's going on in this file:

1. Project Metadata:
   - The file starts with basic project information like name ("my-portfolio") and version ("0.0.0").
   - It specifies the lockfileVersion (3), which indicates the version of the package-lock.json format being used.

2. Dependencies:
   - The file lists all direct and indirect dependencies of the project, including their exact versions and download locations.
   - It includes both production dependencies (like "gsap") and development dependencies (like "autoprefixer", "postcss", "tailwindcss", and "vite").

3. Dependency Tree:
   - Each dependency is listed with its full dependency tree, ensuring that every project using this lock file will have identical dependencies.
   - This includes nested dependencies (dependencies of dependencies) and their specific versions.

4. Integrity Checks:
   - For each package, there's an "integrity" field containing a hash. This is used to verify that the package hasn't been tampered with and is the exact version specified.

5. Resolved URLs:
   - The "resolved" field for each package provides the exact URL from which the package was downloaded, ensuring reproducibility.

6. Platform-specific Packages:
   - Some packages (like those under "@esbuild/") are platform-specific and are marked as "optional". These will only be installed on the relevant platforms.

7. Peer Dependencies:
   - Some packages list their peer dependencies, which are dependencies that the package works with but doesn't directly include.

8. Development vs Production:
   - The file distinguishes between dependencies needed for development and those required for production.

9. Version Ranges:
   - While the project's `package.json` might specify version ranges (e.g., "^3.13.0" for gsap), the lock file pins down exact versions to ensure consistency across different environments.

10. Funding:
    - Some packages include "funding" information, providing links where users can financially support the package maintainers.

11. Licenses:
    - The file includes license information for each package, which is crucial for compliance in many projects.

The primary purpose of this file is to ensure that all developers working on the project, as well as deployment processes, use exactly the same versions of dependencies. This prevents issues arising from slight differences in package versions across different environments.

## package.json

Certainly! I'll provide a comprehensive description of the `package.json` file you've shared:

```json
{
  "name": "my-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md,json}\" --config ./.prettierrc"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.39.1",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.4",
    "postcss": "^8.5.6",
    "prettier": "^3.6.2",
    "tailwindcss": "^3.4.18",
    "vite": "^7.1.12"
  },
  "dependencies": {
    "formik": "^2.4.6",
    "gsap": "^3.13.0",
    "yup": "^1.7.1"
  }
}
```

Here's a breakdown of this `package.json` file:

1. Project Metadata:
   - `"name"`: "my-portfolio" - This is the name of your project.
   - `"private"`: true - This flag indicates that the package is private and should not be published to npm.
   - `"version"`: "0.0.0" - This is the current version of your project. The "0.0.0" suggests it's in very early development.
   - `"type"`: "module" - This specifies that the project uses ECMAScript modules (ES modules) instead of CommonJS.

2. Scripts:
   - These are npm scripts that can be run using `npm run <script-name>`:
     - `"dev"`: "vite" - Starts the development server using Vite.
     - `"build"`: "vite build" - Builds the project for production using Vite.
     - `"preview"`: "vite preview" - Locally previews the production build.
     - `"lint"`: "eslint ." - Checks for linting errors in all files.
     - `"lint:fix"`: "eslint . --fix" - Automatically fixes linting errors where possible.
     - `"format"`: "prettier --write ..." - Formats code using Prettier.

3. DevDependencies:
   - These are dependencies used only for development and building:
     - `"@eslint/js"`: "^9.39.1" - ESLint's recommended JavaScript rules.
     - `"autoprefixer"`: "^10.4.21" - A PostCSS plugin to parse CSS and add vendor prefixes automatically.
     - `"eslint"`: "^9.39.1" - JavaScript linting tool for code quality.
     - `"eslint-config-prettier"`: "^10.1.8" - Disables ESLint rules that conflict with Prettier.
     - `"eslint-plugin-prettier"`: "^5.5.4" - Runs Prettier as an ESLint rule.
     - `"postcss"`: "^8.5.6" - A tool for transforming CSS with JavaScript.
     - `"prettier"`: "^3.6.2" - Opinionated code formatter.
     - `"tailwindcss"`: "^3.4.18" - A utility-first CSS framework.
     - `"vite"`: "^7.1.12" - A build tool that aims to provide a faster and leaner development experience for modern web projects.

4. Dependencies:
   - These are runtime dependencies required for the application to function:
     - `"formik"`: "^2.4.6" - Form state management library.
     - `"gsap"`: "^3.13.0" - GreenSock Animation Platform, a popular JavaScript animation library.
     - `"yup"`: "^1.7.1" - Schema validation library for form validation.

5. Version Notation:
   - The `^` before version numbers (e.g., `"^3.13.0"`) means that npm can install later minor or patch versions, but not major versions. This allows for bug fixes and non-breaking changes.

This `package.json` file describes a project that appears to be a personal portfolio website. It uses Vite as the build tool and development server, incorporates Tailwind CSS for styling, and includes GSAP for animations. The project is set up to use modern JavaScript features (ES modules) and is configured for a development workflow with separate scripts for development, building, and previewing the production build.

## File: eslint.config.js

# ESLint Configuration (eslint.config.js)

The `eslint.config.js` file is a configuration file for ESLint 9+, which uses the new flat config format. It defines the rules and settings that ESLint uses to analyze your code for potential errors, style violations, and bad practices. Here's a breakdown of the configuration:

```javascript
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        globalThis: 'readonly',
        Promise: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'package-lock.json'],
  },
];
```

## Key Sections

### Files
Specifies that the configuration applies to all JavaScript file types (`.js`, `.jsx`, `.mjs`, `.cjs`).

### Language Options
- `ecmaVersion: 2021`: Supports ECMAScript 2021 syntax
- `sourceType: 'module'`: Uses ES modules (import/export syntax)
- `globals`: Defines browser and ES2021 global variables as read-only

### Plugins
Integrates the Prettier plugin for code formatting within ESLint.

### Rules
- Applies ESLint's recommended rules
- Applies Prettier's configuration to avoid conflicts
- Treats Prettier formatting issues as ESLint errors

### Ignores
Excludes `dist/`, `node_modules/`, and `package-lock.json` from linting.

By using this ESLint configuration, your project ensures:

1. Code is checked for potential errors and bad practices.
2. The codebase maintains a consistent style, integrating with Prettier for formatting.
3. Modern JavaScript features (up to ES2021) are supported.
4. The code is written with browser compatibility in mind.

This configuration helps maintain code quality, reduces potential bugs, and ensures a consistent coding style across your project.

## File: .prettierrc

# Prettier Configuration (.prettierrc)

The `.prettierrc` file is a configuration file for Prettier, an opinionated code formatter. It specifies how your code should be formatted, ensuring consistency across your entire project. Here's a breakdown of each option in our `.prettierrc` file:

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSameLine": true
}
```

## Options Explained

1. `"semi": true`
   - This option ensures that semicolons are added at the end of statements.
   - Example: `const greeting = "Hello";`

2. `"tabWidth": 2`
   - Sets the number of spaces per indentation level.
   - This means each level of indentation will use 2 spaces.

3. `"printWidth": 100`
   - Specifies the line length where Prettier will try to wrap code.
   - Lines of code will attempt to wrap at 100 characters.

4. `"singleQuote": true`
   - Uses single quotes instead of double quotes for string literals.
   - Example: `const name = 'John'` instead of `const name = "John"`

5. `"trailingComma": "es5"`
   - Adds trailing commas wherever possible when multi-line, as long as it's valid ES5.
   - Applies to objects, arrays, etc.
   - Example:
     ```javascript
     const obj = {
       a: 1,
       b: 2,
     };
     ```

6. `"bracketSameLine": true`
   - Puts the `>` of a multi-line JSX element at the end of the last line instead of alone on the next line.
   - Note: This replaces the deprecated `jsxBracketSameLine` option.
   - Example:
     ```jsx
     <button
       className="btn"
       onClick={handleClick}>
       Click me
     </button>
     ```

This Prettier configuration ensures:

1. Consistent use of semicolons and quotes throughout the project.
2. Readable line lengths and indentation.
3. Modern JavaScript/ES5 compatible trailing comma usage.
4. Compact JSX syntax for multi-line elements.

By using this Prettier configuration, your project maintains a consistent and clean code style, improving readability and reducing potential conflicts in version control due to formatting differences.

--------

EoF