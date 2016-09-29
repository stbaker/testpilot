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
  plugins: []
};

webpack.module.loaders.push({
  test: /\.(js|jsx)$/,
  include: config.path.src,
  loader: 'babel?cacheDirectory',
});

webpack.module.loaders.push({
  test: /\.hbs/,
  loader: 'handlebars-loader'
});

webpack.plugins.push(new HtmlWebpackPlugin({
  template: `!!handlebars!${config.path.index}`
}));

module.exports = webpack;
