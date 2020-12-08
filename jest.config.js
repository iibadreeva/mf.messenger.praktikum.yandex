module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testRegex: 'tests/.*\\.test.(js|jsx|ts|tsx)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js{,x},ts{,x}}', '!src/index.tsx'],
};