module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 10000,
  testMatch: ["**/spec/tests/**/*.spec.ts"],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1', // Ajusta esta ruta según tu estructura de carpetas
    '^spec/(.*)$': '<rootDir>/spec/$1',  // Si usas un alias 'spec' en las importaciones
  },
};
