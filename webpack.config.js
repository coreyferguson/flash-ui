
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const stage = process.env.stage || 'dev';
const envConfig = path.resolve(__dirname, `src/config/config-${stage}.json`);

module.exports = {
  mode: stage === 'prod' ? 'production' : 'development',
  entry: './src/index.js',
  resolve: {
    alias: { config: envConfig }
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: {
      index: '/index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
};
