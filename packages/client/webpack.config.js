const path = require('path');
const meta = require('./package.json');

const {
  createWatchConfig,
  createBuildConfig,
  pathsNames,
} = require('../../webpack.config');

const paths = {
  src: path.join(__dirname, pathsNames.src),
  dist: path.join(__dirname, pathsNames.dist),
  assets: path.join(__dirname, pathsNames.src, pathsNames.assets),
  static: path.join(__dirname, pathsNames.src, pathsNames.static),
};

const watchConfig = createWatchConfig(paths, { meta, port: 3001 });
const buildConfig = createBuildConfig(paths, { meta });

module.exports = [watchConfig, buildConfig];
