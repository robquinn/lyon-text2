/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  globalSetup: './test/global-setup.ts',
  globalTeardown: './test/global-teardown.ts',
  testEnvironment: './test/puppeteer-environment.ts',
  reporters: ['default'],
};
