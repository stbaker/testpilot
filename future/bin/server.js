const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config');
const webpackConfig = require('../build/webpack.config');

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(config.server.port, config.server.host, (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://${config.server.host}:${config.server.port}/`);
});
