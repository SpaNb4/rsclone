const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(path.resolve(__dirname, environment.paths.source, 'templates'));
const htmlPluginEntries = templateFiles.map(
    (template) =>
        new HTMLWebpackPlugin({
            inject: true,
            hash: false,
            filename: template,
            template: path.resolve(environment.paths.source, 'templates', template),
        })
);

module.exports = {
    entry: path.resolve(environment.paths.source, 'js', 'index.ts'),
    module: {
        rules: [
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|gif|jpe?g|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[name].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            name: 'assets/img/[name].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'assets/audio/[name].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    output: {
        filename: 'js/[name].js',
        path: environment.paths.output,
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(environment.paths.source, 'assets/img', ''),
                    to: path.resolve(environment.paths.output, 'assets/img', ''),
                },
                {
                    from: path.resolve(environment.paths.source, 'assets/audio', ''),
                    to: path.resolve(environment.paths.output, 'assets/audio', ''),
                },
                {
                    from: path.resolve(environment.paths.source, '', 'favicon.ico'),
                    to: path.resolve(environment.paths.output, '', 'favicon.ico'),
                },
            ],
        }),
    ].concat(htmlPluginEntries),
    target: 'web',
};
