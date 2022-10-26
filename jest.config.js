// https://jestjs.io/docs/configuration
export default () => {
  return {
    testEnvironment: 'node',
    roots: ['test/'],

    // Disables CommonJS transforms (see https://jestjs.io/docs/ecmascript-modules)
    transform: {},

    setupFilesAfterEnv: ['./testing/jestRedisMock.js'],

    collectCoverage: process.env.CI,
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
      },
    },
  };
};
