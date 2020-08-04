module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
    browser: true,
  }, // global variables
  parserOptions: {
    sourceType: 'module', // for import from ""; support
  },
  rules: {
    'prettier/prettier': 'warn',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
  ],
};
