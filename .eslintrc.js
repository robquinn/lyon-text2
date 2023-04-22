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
    /* eslint-plugin-promise */
    'plugin:promise/recommended',
    /* eslint-config-standard-with-typescript */
    'standard-with-typescript',
    /* prettier */
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'promise'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'prettier/prettier': 'error',
    camelcase: 'warn',
    'import/no-extraneous-dependencies': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'prefer-object-spread': 'warn',
    'spaced-comment': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
};
