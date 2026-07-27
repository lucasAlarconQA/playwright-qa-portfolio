const js = require('@eslint/js');
const playwright = require('eslint-plugin-playwright');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'writable',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  {
    files: ['tests/**/*.js'],
    ...playwright.configs['flat/recommended'],
  },
  {
    files: ['playwright.config.js'],
    languageOptions: {
      sourceType: 'module',
    },
  },
  prettierConfig,
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/'],
  },
];
