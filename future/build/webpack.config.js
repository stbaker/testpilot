const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = require('../config');

const webpackConfig = {
  name: 'frontend',
  target: 'web',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(config.path.base, 'src')
  },
  entry: {
    app: [
      `webpack-dev-server/client?http://${config.server.host}:${config.server.port}/`,
      'webpack/hot/dev-server',
      config.path.app
    ]
  },
  output: {
    filename: '[name].js',
    path: config.path.dist,
    publicPath: '/'
  },
  module: {
    loaders: []
  },
  plugins: []
};

webpackConfig.module.loaders.push({
  test: /\.(js|jsx)$/,
  include: config.path.src,
  loader: 'babel?cacheDirectory',
});

webpackConfig.module.loaders.push({
  test: /\.hbs/,
  loader: 'handlebars-loader'
});

webpackConfig.plugins.push(new HtmlWebpackPlugin({
  template: `!!handlebars!${config.path.index}`
}));

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = webpackConfig;
