const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require("path");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './docs'),
    publicPath: path.join(__dirname, './docs')
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
    ]
  },

  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }])
  ]
};