
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new DynamicCdnWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
});
