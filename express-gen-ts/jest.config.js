module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 10000,
    testMatch: ['**/tests/**/*.test.ts'],
    moduleNameMapper: {
      '^@src/(.*)$': '<rootDir>/src/$1',
    },
  };
  
