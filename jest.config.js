/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
    "^.+\\.module\\.(css|scss)$": "jest-css-modules-transform",
    "^.+\\.(svg|png|jpg|jpeg|gif)$": "jest-transform-stub"  
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};