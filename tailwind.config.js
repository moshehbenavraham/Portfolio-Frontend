/** @type {import('tailwindcss').Config} */
// This comment is for TypeScript. It tells the editor that this object should match Tailwind's configuration type.

export default {
  // The 'content' array tells Tailwind which files to scan for classes to include in your CSS
  content: [
    './index.html', // Scans the main HTML file
    './src/**/*.{js,ts,jsx,tsx}', // Scans all JS/TS files in src directory
  ],

  // The 'theme' section is where you customize Tailwind's default design system
  theme: {
    // The 'extend' object lets you add to Tailwind's default theme rather than overwriting it entirely
    extend: {},
  },

  // The 'plugins' array lets you add third-party plugins to extend Tailwind's functionality
  plugins: [],
};

// EoF
