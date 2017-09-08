const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: './app.js'
    },
    module: {
        loaders: [
        {
            test: /\.js(x?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'static', to: '.' },
            { from: __dirname + '/node_modules/milligram/dist/milligram.min.css', to: '.' }
        ]),
        new UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            compressor: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devServer: {
        contentBase: 'public'
    }
};
