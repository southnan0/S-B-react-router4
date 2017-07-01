const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');


const common = require('./webpack.common.config');
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    node_modules: path.join(__dirname, 'node_modules')
};

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, 'dev'),
        publicPath: '/dev/',
        filename: 'bundle.js'
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                        name: "[path][name].[ext]"
                    }
                }]
            },
            {test: /\.jsx?$/, use: [{loader: 'babel-loader'}], include: PATHS.app},
            {
                test: /\.less$/,
                use: ['isomorphic-style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __WINDOW__: {}
        }),
        new webpack.LoaderOptionsPlugin({
            devtool: 'eval-source-map',
            debug: true,
            watch: true,
            colors: true,
        })
    ]
})








