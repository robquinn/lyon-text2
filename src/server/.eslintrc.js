module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
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
    /* eslint-plugin-n (node) */
    'plugin:n/recommended',
    /* prettier */
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'googleappsscript', 'promise'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    'googleappsscript/googleappsscript': true,
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'error',
    camelcase: 'warn',
    /* eslint-plugin-import */
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'no-continue': 'off',
    'import/prefer-default-export': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': 'warn',
    'prefer-object-spread': 'warn',
    'n/no-missing-import': 'off',
    'no-undef': 'off',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
