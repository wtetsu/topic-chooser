const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

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
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'static', to: '.' },
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
        })
    ],
    devServer: {
        contentBase: 'public'
    }
};
