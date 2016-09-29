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
  plugins: [
    new webpack.DefinePlugin(JSON.stringify(config.globals)),
    new HtmlWebpackPlugin({
      pontoon: config.includePontoon,
      template: config.path.index
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

webpackConfig.module.loaders.push({
  test: /\.(js|jsx)$/,
  include: config.path.src,
  loader: 'babel?cacheDirectory',
});

module.exports = webpackConfig;
