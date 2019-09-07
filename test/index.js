
// requires all tests in `project/test/src/components/**/*.spec.js`
const tests = require.context('./spec/', true, /\.spec\.js$/);
tests.keys().forEach(tests);

// // requires all components in `project/src/components/**/*.js`
const components = require.context('../src/', true, /\.js$/);
components.keys().filter(item => item !== './index.js').forEach(components);
