const APP = __dirname

module.exports = {
  context: APP,
  entry: {
    app: './ngapp/app.js'
  },
  output: {
    path: './public',
    filename: 'ngapp.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
