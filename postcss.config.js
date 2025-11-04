// This file configures PostCSS, a tool that transforms CSS with JavaScript

// We're using ES module syntax to export the configuration
export default {
  // The 'plugins' object specifies which PostCSS plugins to use
  plugins: {
    // Enable Tailwind CSS processing
    // Tailwind is a utility-first CSS framework that helps you build custom designs quickly
    tailwindcss: {},

    // Enable Autoprefixer
    // Autoprefixer automatically adds vendor prefixes to CSS rules
    // (like -webkit- or -moz-) to ensure compatibility across different browsers
    autoprefixer: {},
  },
};

//EoF
