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

    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': 'error',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'class-methods-use-this': 'off',
    'react/prop-types': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    camelcase: 'warn',
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'prefer-object-spread': 'warn',
    'no-undef': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
