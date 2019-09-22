
// requires all tests in `project/test/src/components/**/*.spec.js`
const tests = require.context('./spec/', true, /\.spec\.js$/);
tests.keys().forEach(tests);

// // requires all tests in `project/src/**/*.test.js`
const components = require.context('../src', true, /\.test\.js$/);
components.keys().forEach(components);
