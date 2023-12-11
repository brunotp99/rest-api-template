/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true, //clears mocks each time we run a test
  resetMocks: true,
  restoreMocks: true
};