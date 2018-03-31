const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    options: path.join(__dirname, 'src', 'options.js'),
    background: path.join(__dirname, 'src', 'background.js'),
    inject: path.join(__dirname, 'src', 'inject.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]-[local]__[hash:base64:5]',
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background'],
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new CopyPlugin([
      { from: 'manifest.json', to: '.' },
      { from: 'src/assets', to: '.' },
    ]),
    new WriteFilePlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
  },
};

module.exports = config;
