const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    favicon: './src/favicons/favicons.js',
    index: './src/pages/index/_resources.js',
    landing: './src/pages/landing/_resources.js',
    login: './src/pages/login/_resources.js',
    registration: './src/pages/registration/_resources.js',
    search: './src/pages/search-room-filter/_resources.js',
    room: './src/pages/room-details/_resources.js',
    colors: './src/pages/ui-colors-type/_resources.js',
    headers: './src/pages/ui-headers-footers/_resources.js',
    elements: './src/pages/ui-form-elements/_resources.js',
    cards: './src/pages/ui-cards/_resources.js',
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, './docs'),
  },
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              debug: true,
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: path.resolve(__dirname, './src/img/'),
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        exclude: [
          path.resolve(__dirname, './src/fonts/'),
          path.resolve(__dirname, './src/favicons/'),
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pages/index/index.pug',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'ui-colors-type.html',
      template: 'src/pages/ui-colors-type/ui-colors-type.pug',
      chunks: ['colors'],
    }),
    new HtmlWebpackPlugin({
      filename: 'ui-form-elements.html',
      template: 'src/pages/ui-form-elements/ui-form-elements.pug',
      chunks: ['elements'],
    }),
    new HtmlWebpackPlugin({
      filename: 'ui-cards.html',
      template: 'src/pages/ui-cards/ui-cards.pug',
      chunks: ['cards'],
    }),
    new HtmlWebpackPlugin({
      filename: 'ui-headers-footers.html',
      template: 'src/pages/ui-headers-footers/ui-headers-footers.pug',
      chunks: ['headers'],
    }),
    new HtmlWebpackPlugin({
      filename: 'landing.html',
      template: 'src/pages/landing/landing.pug',
      chunks: ['landing'],
    }),
    new HtmlWebpackPlugin({
      filename: 'search-room-filter.html',
      template: 'src/pages/search-room-filter/search-room-filter.pug',
      chunks: ['search'],
    }),
    new HtmlWebpackPlugin({
      filename: 'room-details.html',
      template: 'src/pages/room-details/room-details.pug',
      chunks: ['room'],
    }),
    new HtmlWebpackPlugin({
      filename: 'registration.html',
      template: 'src/pages/registration/registration.pug',
      chunks: ['registration'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: 'src/pages/login/login.pug',
      chunks: ['login'],
    }),
  ],
};

module.exports = config;
