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
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ['**/*', '../css/*'],
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),
    new CopyPlugin([
      {from: './dist/js/*.js', to: path.resolve(__dirname, './ext/js'), flatten: true},
      {from: './dist/css/*.css', to: path.resolve(__dirname, './ext/css'), flatten: true},
      {from: './dist/fonts/*.*', to: path.resolve(__dirname, './ext/fonts'), flatten: true},
      {from: './dist/index.html', to: path.resolve(__dirname, './ext/html'), flatten: true},
      {from: './dist/manifest.json', to: path.resolve(__dirname, './ext'), flatten: true},
      {from: './dist/sounds/*.mp3', to: path.resolve(__dirname, './ext/sounds'), flatten: true},
      {from: './dist/img/*.png', to: path.resolve(__dirname, './ext/img'), flatten: true},
    ]),
  ],
};