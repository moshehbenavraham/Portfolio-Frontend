// This file configures PostCSS, a tool that transforms CSS with JavaScript
// Updated for Tailwind CSS v4

// We're using ES module syntax to export the configuration
export default {
  // The 'plugins' object specifies which PostCSS plugins to use
  plugins: {
    // Tailwind CSS v4 - uses new @tailwindcss/postcss plugin
    '@tailwindcss/postcss': {},

    // Enable Autoprefixer
    // Autoprefixer automatically adds vendor prefixes to CSS rules
    autoprefixer: {},
  },
};

//EoF
