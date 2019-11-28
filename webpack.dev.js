
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const resolver = require('./module-to-cdn-resolver');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DynamicCdnWebpackPlugin({ resolver })
  ],
  devServer: {
    contentBase: './dist',
    host: 'flash-local.growme.fyi',
    port: 9000,
    https: true,
    historyApiFallback: {
      index: '/index.html'
    }
  }
});
