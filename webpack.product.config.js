const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const pkg = require('./package.json');
const common = require('./webpack.common.config');
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    node_modules: path.join(__dirname, 'node_modules')
};
// pack into vendors unless server side depend on.
const whiteLists = [
    'express',
    'body-parser',
    'compression',
    'ejs',
    'antd',
    'lodash',
    'formidable',
    'socket.io'
];

const vendors = Object.keys(pkg.dependencies).filter((v) => {
    return whiteLists.indexOf(v) === -1
});

module.exports = merge(common, {
    entry: {
        app: PATHS.app,
        vendors: vendors
    },
    devtool: false,
    output: {
        path: PATHS.build,
        filename: '[name].[chunkhash:4].js',
        chunkFilename: '[name].[chunkhash:4].js',
    },
    node: {
        console: true, fs: 'empty', tls: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                        name: '[path][name].[ext]'
                    }
                }]
            },
            {test: /\.jsx?$/, use: ['babel-loader'], include: PATHS.app},
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'isomorphic-style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors'}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'  //why ''
            },
            __DEV__: false
        }),
        new CleanPlugin([PATHS.build]),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:4].css',
            allChunks: true
        })
    ]
})

