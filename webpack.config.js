const path                  = require("path");
const webpack               = require("webpack");
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const HtmlWebpackPlugin     = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

const config = {
    entry: [__dirname + "/src/app.js", __dirname + "/src/main.scss"],
    output: {
        filename: "[name].bundle.js",
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
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
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
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-kit-colors-n-type.html',
            template: 'src/ui-kit-colors-n-type.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-kit-form-elements.html',
            template: 'src/ui-kit-form-elements.pug'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            publicPath: "../"
        }),
    ]
};
module.exports = config;