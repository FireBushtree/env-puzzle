module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '\\.(css|less|scss|png)$': 'jest-transform-stub',
    '^tests(.*)$': '<rootDir>/tests$1',
  },
  transform: {
    '^.+\\.{tsx|ts}?$': 'ts-jest',
  },
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/es/', '/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
