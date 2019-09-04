
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
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
