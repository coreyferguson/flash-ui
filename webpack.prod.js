
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const resolver = require('./module-to-cdn-resolver');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new DynamicCdnWebpackPlugin({ resolver })
  ],
  performance: {
    hints: 'error',
    maxEntrypointSize: 112640
  }
});
