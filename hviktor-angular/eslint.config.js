// @ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  // 0) Globale ignores (gjelder alt)
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.angular/**', '**/coverage/**', '**/*.d.ts'],
  },

  // 1) TypeScript (app + library) + inline templates i komponenter
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      // Hvis du vil ha flere "style-ish" lint regler (kan krangle litt med Prettier):
      // ...tseslint.configs.stylistic,

      ...angular.configs.tsRecommended,
    ],

    // Viktig for å lint'e inline templates (template: `...`) i .ts-filer
    processor: angular.processInlineTemplates,

    rules: {
      // Tilpass selector-regler til deres prefix (du bruker f.eks. hvi-alert)
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'hvi', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'hvi', style: 'camelCase' },
      ],

      // Eksempler på nyttige defaults (juster etter smak)
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // 2) HTML templates (separate .html-filer)
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
