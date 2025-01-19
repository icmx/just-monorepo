const path = require('path');
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

const watchConfig = createWatchConfig(paths, { port: 3001 });
const buildConfig = createBuildConfig(paths);

module.exports = [watchConfig, buildConfig];
