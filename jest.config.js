module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  moduleNameMapper: {
    appConfig: '<rootDir>/src/context/config/config-local.json',
    'aws-sdk': '<rootDir>/__mocks__/aws-sdk.js'
  },
  setupFiles: [
    './test/setupJest.js'
  ]
};