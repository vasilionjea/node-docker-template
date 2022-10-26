import info from 'ci-info';

// https://jestjs.io/docs/configuration
export default () => {
  return {
    testEnvironment: 'node',
    roots: ['test/'],

    // Disables CommonJS transforms (see https://jestjs.io/docs/ecmascript-modules)
    transform: {},

    setupFilesAfterEnv: ['./testing/jestRedisMock.js'],
  };
};
