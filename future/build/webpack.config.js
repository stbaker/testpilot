const path = require('path');

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
  }
};

webpack.module.loaders.push({
  test: /\.(js|jsx)$/,
  include: config.path.src,
  loader: 'babel?cacheDirectory',
});

module.exports = webpack;
