
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DynamicCdnWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    host: 'flash-local.overattribution.com',
    port: 9000,
    https: true,
    historyApiFallback: {
      index: '/index.html'
    }
  }
});
