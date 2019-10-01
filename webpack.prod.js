
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new DynamicCdnWebpackPlugin()
  ],
  // performance: {
  //   hints: 'error',
  //   maxEntrypointSize: 112640
  // }
});
