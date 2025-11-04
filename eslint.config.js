import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Apply recommended rules to all JS files
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // ES2021 globals
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
  // Ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**', 'package-lock.json'],
  },
];
