const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const _express = require('express');
const _multer = require('multer');
const _upload = _multer({ dest: 'upload/' });

module.exports = env => {
  const mode = env || 'development';
  return {
    mode: mode,
    devtool: (mode === 'development') ? 'inline-source-map' : false,
    entry: {
      app: ['./build/main.js']
    },
    output: {
      path: __dirname + '/dist',
      filename: 'js/[name].bundle.js'
    },
    optimization: {
      minimize: false,
      splitChunks: {
        name: 'vendor',
        chunks: 'initial'
      }
    },
    devServer: {
      contentBase: 'dist',
      before: (app, server) => {
        app.use(_express.static(path.join(__dirname, 'fontawesome5.2.0')));
        app.post('/api/download', _upload.single('file'), (req, res) => {
          res.json({ error: 'normal' });
        });
      }
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
      new webpack.ProvidePlugin({
        riot: 'riot'
      }),
      new htmlWebpackPlugin({
        template: "./views/index.html",
        filename: "./index.html"
      })
    ]
  };
};