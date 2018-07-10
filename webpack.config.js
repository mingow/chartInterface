
var path = require("path");

module.exports = {

  mode: "development",

  entry: __dirname + "/src/index.js",

  output: {
    path: path.resolve(__dirname,'dist'),
    filename: "bundle.js",
    publicPath:'temp/'
  },

  module:{
    rules:[
      {
        test: /\.js$/,
        loader:"babel-loader",
        exclude: /node_modules/,
        options:{
          presets:["es2015","react"]
        }
      }
    ]
  },

  devServer: {
    contentBase: "./",
    historyApiFallback: true,
    inline: true
  }
}
