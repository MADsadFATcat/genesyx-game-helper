const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    background: './src/core/background.ts',
    content_script: './src/core/content_script.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './ext/js'),
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {loader: 'html-loader'}
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['**/*', '../css/*'],
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    new CopyPlugin({
      patterns:
        [
          {from: './dist/js/*.js', to: path.resolve(__dirname, './ext/js', '[name][ext]')},
          {from: './dist/css/*.css', to: path.resolve(__dirname, './ext/css', '[name][ext]')},
          {from: './dist/fonts/*.*', to: path.resolve(__dirname, './ext/fonts', '[name][ext]')},
          {from: './dist/index.html', to: path.resolve(__dirname, './ext/html', '[name][ext]')},
          {from: './dist/manifest.json', to: path.resolve(__dirname, './ext', '[name][ext]')},
          {from: './dist/sounds/*.mp3', to: path.resolve(__dirname, './ext/sounds', '[name][ext]')},
          {from: './dist/img/*.png', to: path.resolve(__dirname, './ext/img', '[name][ext]')},
        ]
    }),
  ],
};