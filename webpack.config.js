const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

const createEntriesFromPageList = (pages) => {
  const webpackPageEntries = {};
  const htmlWebpackPageInstances = [];

  pages.forEach((pageName) => {
    const pageDir = `src/pages/${pageName}`;
    webpackPageEntries[pageName] = `./${pageDir}/${pageName}.js`;
    htmlWebpackPageInstances.push(new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: `${pageDir}/${pageName}.pug`,
      chunks: [pageName],
    }));
  });

  return [webpackPageEntries, htmlWebpackPageInstances];
};

const [webpackPageEntries, htmlWebpackPageInstances] = createEntriesFromPageList([
  'index',
  'landing',
  'sign-in',
  'sign-up',
  'search',
  'room-details',
  'colors-type',
  'headers-footers',
  'form-elements',
  'cards',
]);

const config = {
  entry: {
    favicon: './src/favicons/favicons.js',
    ...webpackPageEntries,
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
              removeCR: true,
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
    ...htmlWebpackPageInstances,
  ],
};

module.exports = config;
