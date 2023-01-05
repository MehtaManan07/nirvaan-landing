const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

// const eslintOptions = {
//   extensions: [".jsx"],
//   exclude: ['/node_modules/'],
//   emitWarning: true,
//   failOnError: true,
//   failOnWarning: false
// };

module.exports = {
  entry: './src/index.js',
  output: { path: path.join(__dirname, "public"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
  devServer: { contentBase: path.join(__dirname, "public"), port: 3000 },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: ["file-loader"],
      },

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.join(__dirname, "src", "form.html"),
    }),
    new ESLintPlugin({
      extensions: [".js", ".jsx"],
      exclude: ['/node_modules/'],
      emitWarning: true,
      failOnError: true,
      failOnWarning: false
    })
  ],
};
