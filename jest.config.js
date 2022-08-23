module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  roots: [
    './src',
    './examples',
  ],
  collectCoverageFrom: [
    './src/**/*.ts',
  ],
  coverageDirectory: './.build/coverage',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
