var webpack = require("webpack");
var copyWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    "app" : './src/js/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name][hash].js'
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'riotjs-loader',
            options: {
              debug: true
            }            
          }
        ]
      },
      {
        test: /\.js$|\.tag$/,
        enforce: 'post',
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: 'es2015-riot'
            }
          }
        ]
      }
    ]
  },
  resolve: {
  //    modules: ["node_modules"],
      extensions: ['*', '.js', '.tag']
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    new copyWebpackPlugin({
      filename: 'index.html',
      favicon:  './src/favicon.ico',
      template: './index.ejs'
    })
  ]
}