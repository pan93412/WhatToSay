const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js',
    mainCSS: './src/mainCSS.js'
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|eot|ttf|woff|woff2|otf)$/,
        use: 'file-loader'
      }
    ]
  }
}