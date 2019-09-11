const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: __dirname + "/src/app.js",
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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-kit-colors-n-type.html',
            template: 'src/ui-kit-colors-n-type.pug',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'ui-kit-form-elements.html',
            template: 'src/ui-kit-form-elements.pug',
            inject: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            publicPath: "../"
        }),
    ]
};
module.exports = config;