module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    /* jest */
    'plugin:jest/recommended',
    /* airbnb */
    'airbnb',
    'airbnb-typescript/base',
    /* eslint */
    'eslint:recommended',
    /* 'plugin:@typescript-eslint */
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    /* promise */
    'plugin:promise/recommended',
    /* eslint-config-standard */
    'standard',
    /* prettier */
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'promise'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    page: true,
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': ['error', 'unix'],

    'jest/no-done-callback': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    camelcase: 'warn',
    'no-console': 'off',
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-import-module-exports': 'off',
    'jest/expect-expect': 'off',
    'no-new': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
  },
};
