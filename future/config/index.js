const path = require('path');
const tryRequire = require('try-require');

const config = {
  env: process.env.NODE_ENV || 'development',
  path: {
    base: path.resolve(__dirname, '..')
  },
  server: {
    host: 'localhost',
    port: 8000
  }
};

config.path.dist = path.resolve(config.path.base, 'dist');
config.path.src = path.resolve(config.path.base, 'src');

config.path.app = path.resolve(config.path.src, 'app.js');
config.path.index = path.resolve(config.path.src, 'index.hbs');

const env = tryRequire(`../${config.env}.js`) || {};

module.exports = Object.assign(config, env);
