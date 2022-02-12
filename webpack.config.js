const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pathsNames = {
  src: 'src',
  dist: 'dist',
  assets: 'assets',
  static: 'static',
};

const createBaseConfig = (paths, { meta }) => ({
  entry: {
    app: `${paths.src}/index.tsx`,
  },
  output: {
    filename: `[name].js`,
    path: paths.dist,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-import', 'postcss-csso'],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': `${paths.src}`,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.assets}`,
          to: `${paths.assets.split(path.sep).slice(-1)[0]}`,
          noErrorOnMissing: true,
        },
        {
          from: `${paths.static}`,
          to: '',
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: `${paths.src}/index.html`,
      filename: `index.html`,
      templateParameters: {
        version: meta.version,
        license: meta.license,
      },
    }),
  ],
});

const createWatchConfig = (paths, { meta, port }) =>
  merge(createBaseConfig(paths, { meta }), {
    name: 'watch',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      port,
      liveReload: true,
      watchFiles: [`${paths.src}/**/*`],
      static: {
        publicPath: `/`,
        directory: `${paths.dist}`,
      },
      client: {
        overlay: {
          warnings: true,
          errors: true,
        },
      },
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
      }),
    ],
  });

const createBuildConfig = (paths, { meta }) =>
  merge(createBaseConfig(paths, { meta }), {
    name: 'build',
    mode: 'production',
    plugins: [],
  });

module.exports = {
  createBaseConfig,
  createWatchConfig,
  createBuildConfig,
  pathsNames,
};
