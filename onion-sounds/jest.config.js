module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // fix this
  moduleNameMapper: {
    '^@adapters/(.*)': '<rootDir>/stateless/src/adapters/$1',
    '^@config/(.*)': '<rootDir>/stateless/src/config/$1',
    '^@domain/(.*)': '<rootDir>/stateless/src/domain/$1',
    '^@entity/(.*)': '<rootDir>/stateless/src/entity/$1',
    '^@repositories/(.*)': '<rootDir>/stateless/src/repositories/$1',
    '^@schemas/(.*)': '<rootDir>/stateless/src/schemas/$1',
    '^@errors/(.*)': '<rootDir>/stateless/src/errors/$1',
    '^@events/(.*)': '<rootDir>/stateless/src/events/$1',
    '^@models/(.*)': '<rootDir>/stateless/src/models/$1',
    '^@use-cases/(.*)': '<rootDir>/stateless/src/use-cases/$1',
    '^@packages/(.*)': '<rootDir>/packages/$1',
  },
};
