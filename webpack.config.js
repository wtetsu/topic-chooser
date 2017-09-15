const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const BASE_PLUGINS = [
    new CopyWebpackPlugin([
        { from: 'static', to: '.' },
        { from: __dirname + '/node_modules/milligram/dist/milligram.min.css', to: '.' }
    ]),
];

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './app.jsx',
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
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: (process.env.NODE_ENV === 'production')
    ? BASE_PLUGINS.concat([
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
    ])
    : BASE_PLUGINS,
    devServer: {
        contentBase: 'public'
    },
    devtool: (process.env.NODE_ENV === 'production')
    ? 'source-map'
    : ''
};
