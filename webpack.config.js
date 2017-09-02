module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: __dirname,
    filename: "./dist/app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  devtool: "source-map"
};
