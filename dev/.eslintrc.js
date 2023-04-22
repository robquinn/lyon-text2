module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    /* airbnb */
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
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
  },
  globals: {
    google: false,
    alert: false,
    css: true,
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

    'prettier/prettier': 'error',
    'react/prop-types': 'warn',
    camelcase: 'warn',
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'prefer-object-spread': 'warn',
    'no-undef': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
