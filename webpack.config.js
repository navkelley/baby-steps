var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

var filename = ["bundle.js"];

module.exports = {
    entry: "./public/steps.js",
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: filename.join('.'),
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};
