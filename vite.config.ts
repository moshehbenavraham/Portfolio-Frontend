import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // Base path for GitHub Pages deployment
  base: '/Portfolio-Frontend/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Increase chunk size warning limit (default is 500 kB)
    chunkSizeWarningLimit: 600,
  },
});
