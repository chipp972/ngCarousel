const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const APP = __dirname

module.exports = {
  context: APP,
  entry: {
    ngapp: './ngapp/app.js'
  },
  output: {
    path: './public',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}
