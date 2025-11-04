// Import the defineConfig function from the 'vite' package
// This function helps provide better type inference for the configuration
import { defineConfig } from 'vite';

// Export the configuration object using the defineConfig function
export default defineConfig({
  // The 'plugins' array is where you can add Vite plugins to extend Vite's functionality
  // Currently, it's empty, meaning no additional plugins are being used
  plugins: [],

  // Base path for GitHub Pages deployment
  // This ensures all asset paths are correct when deployed to https://username.github.io/Portfolio-Frontend/
  base: '/Portfolio-Frontend/',

  // Other Vite configuration options can be added here
});

// EoF
