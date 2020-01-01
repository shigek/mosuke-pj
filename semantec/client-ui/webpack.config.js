/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const express_ = require('express')
const _multer = require('multer')
require('./riot-ts-processer')



//const _upload = _multer({ dest: 'upload/' });
module.exports = env => {
  const mode = env || 'development'
  return {
    mode: mode,
    devtool: (mode === 'development') ? 'inline-source-map' : false,
    entry: {
      app: ['./src/main.ts']
    },
    output: {
      path: `${__dirname}/dist`,
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
      contentBase: 'dist'
    },
    module: {
      rules: [
        {
          // 拡張子 .ts
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.riot$/,
          exclude: /node_modules/,
          use: [
            {
              loader: '@riotjs/webpack-loader',
              options: {
                hot: true,
                debug: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        },
        {
          test: /\.js$$/,
          enforce: 'post',
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/presets-env']
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]',
                outputPath: 'images',
                publicPath: '/image'
              }
            }
          ]
        },

        // the following rules handle font extraction
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff',
                outputPath: 'fonts',
                publicPath: '/fonts'
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                publicPath: '/fonts'
              }
            }
          ]
        },
        {
          test: /\.otf(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/fonts/[name].[ext]',
                mimetype: 'application/font-otf',
                outputPath: 'fonts',
                publicPath: '/fonts'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.ts', '.riot']
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
        template: './views/private/index.html',
        filename: './views/private/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style/[name].bundle.css'
        //filename: "./css/[name].css"
      })
    ]
  }
}