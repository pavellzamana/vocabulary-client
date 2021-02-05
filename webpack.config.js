const path = require('path');
const HtmlWebpacPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/* boolean variables indicate development and prouction mode */
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const isProductionEnv = !isDevelopmentEnv;

/* return config object for config.optimization property */
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProductionEnv) {
    config.minimizer = [new TerserPlugin(), new OptimizeCssAssetsPlugin()];
  }
  return config;
};

/* return pattern for file name depend on mode */
const getFileName = (extension) =>
  isDevelopmentEnv ? `[name].bundle.${extension}` : `[name].[contenthash].${extension}`;

/* configuration object */
module.exports = {
  mode: 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: isDevelopmentEnv && 'source-map',
  optimization: optimization(),
  plugins: [
    new HtmlWebpacPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        collapseWhitespace: isProductionEnv,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: isDevelopmentEnv,
    overlay: true,
    transportMode: 'ws',
  },
};
