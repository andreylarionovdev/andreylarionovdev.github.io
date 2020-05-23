const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    favicon: './src/favicons/favicons.js',
    index: './src/pages/index/index.js',
    landing: './src/pages/landing/landing.js',
    login: './src/pages/sign-in/sign-in.js',
    registration: './src/pages/sign-up/sign-up.js',
    search: './src/pages/search/search.js',
    room: './src/pages/room-details/room-details.js',
    colors: './src/pages/colors-type/colors-type.js',
    headers: './src/pages/headers-footers/headers-footers.js',
    elements: './src/pages/form-elements/form-elements.js',
    cards: './src/pages/cards/cards.js',
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
        exclude: [
          path.resolve(__dirname, './src/img/'),
          path.resolve(__dirname, './src/components/'),
        ],
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
      filename: 'colors-type.html',
      template: 'src/pages/colors-type/colors-type.pug',
      chunks: ['colors'],
    }),
    new HtmlWebpackPlugin({
      filename: 'form-elements.html',
      template: 'src/pages/form-elements/form-elements.pug',
      chunks: ['elements'],
    }),
    new HtmlWebpackPlugin({
      filename: 'cards.html',
      template: 'src/pages/cards/cards.pug',
      chunks: ['cards'],
    }),
    new HtmlWebpackPlugin({
      filename: 'headers-footers.html',
      template: 'src/pages/headers-footers/headers-footers.pug',
      chunks: ['headers'],
    }),
    new HtmlWebpackPlugin({
      filename: 'landing.html',
      template: 'src/pages/landing/landing.pug',
      chunks: ['landing'],
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: 'src/pages/search/search.pug',
      chunks: ['search'],
    }),
    new HtmlWebpackPlugin({
      filename: 'room-details.html',
      template: 'src/pages/room-details/room-details.pug',
      chunks: ['room'],
    }),
    new HtmlWebpackPlugin({
      filename: 'sign-up.html',
      template: 'src/pages/sign-up/sign-up.pug',
      chunks: ['registration'],
    }),
    new HtmlWebpackPlugin({
      filename: 'sign-in.html',
      template: 'src/pages/sign-in/sign-in.pug',
      chunks: ['login'],
    }),
  ],
};

module.exports = config;
