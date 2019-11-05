const path                  = require('path');
const webpack               = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
    entry: [__dirname + '/src/app.js', __dirname + '/src/main.scss'],
    output: {
        filename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            debug: true,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
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
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(png|gif|svg|jpe?g)$/,
                exclude: path.resolve(__dirname, './src/fonts/'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }]
            }
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
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/index.html',
            template: 'src/pages/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-colors-type.html',
            template: 'src/pages/ui-colors-type.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-form-elements.html',
            template: 'src/pages/ui-form-elements.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-cards.html',
            template: 'src/pages/ui-cards.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-headers-footers.html',
            template: 'src/pages/ui-headers-footers.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'landing.html',
            template: 'src/pages/landing/landing.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'search-room-filter.html',
            template: 'src/pages/search-room-filter.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'room-details.html',
            template: 'src/pages/room-details.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration.html',
            template: 'src/pages/registration.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'sign-in.html',
            template: 'src/pages/sign-in.pug'
        })
    ]
};
module.exports = config;