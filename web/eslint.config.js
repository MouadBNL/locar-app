import antfu from '@antfu/eslint-config';
import i18next from 'eslint-plugin-i18next';
import tseslint from 'typescript-eslint';

export default antfu({
  extends: [tseslint.configs.recommended],
  plugins: { },
  react: true,
  stylistic: {
    semi: true,
    quotes: 'single',
  },
  rules: {
    'react/no-unstable-context-value': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
  ignores: ['**/*.gen.ts', '**/*.gen.tsx'],
}, {
  plugins: { i18next },
  rules: {
    // i18next rules
    'i18next/no-literal-string': [
      'error',
      {
        framework: 'react',
        markupOnly: true,
        ignoreAttribute: ['data-testid', 'to', 'className', 'key'],
      },
    ],
  },

  ignores: ['**/*.gen.ts', '**/*.gen.tsx', '**/*.config.ts', '**/*.d.ts', '**/*.config.js'],
});
