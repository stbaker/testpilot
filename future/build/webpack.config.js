const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../config');

const webpack = {
  name: 'frontend',
  target: 'web',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(config.path.base, 'src')
  },
  entry: {
    app: config.path.app
  },
  output: {
    filename: '[name].js',
    path: config.path.dist
  },
  module: {
    loaders: []
  },
  plugins: [
    new webpack.DefinePlugin(JSON.stringify(config.globals)),
    new HtmlWebpackPlugin({
      pontoon: config.includePontoon,
      template: config.path.index
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

webpack.module.loaders.push({
  test: /\.(js|jsx)$/,
  include: config.path.src,
  loader: 'babel?cacheDirectory',
});

module.exports = webpackConfig;
