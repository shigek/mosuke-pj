var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    "app": './js/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'riot-tag-loader',
            options: {
              debug: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
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
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ['*', '.js', '.tag']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new htmlWebpackPlugin({
      template: "./views/index.html",
      filename: "./index.html"
    })
  ]  
}