var port = process.env.PORT || 3000;

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: "./dist/",
    filename: "js/[name].js",
    publicPath: "/"
  },
  devServer: {
    inline: true,
    contentBase: "./dist/",
    port: port
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          "css?sourceMap!" +
          "less?sourceMap"
        )
      }
    ]
  },
  resolve: {
    modulesDirectories: ["node_modules", __dirname + "/src"]
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new CopyWebpackPlugin([{from: "./assets"}])
  ]
};
