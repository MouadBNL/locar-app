import antfu from '@antfu/eslint-config';
import tseslint from 'typescript-eslint';

export default antfu({
  extends: [tseslint.configs.recommended],
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
});
