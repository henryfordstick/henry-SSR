const {join,resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 下一次打包时清除之前打包的文件
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/assets/',
    filename: 'scripts/[name].[contenthash:8].bundle.js',
    assetModuleFilename: 'images/[name].[contenthash:8].bundle[ext]',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true, // 是否缓存
        parallel: true, // 是否并行打包
        sourceMap: false,
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      title: 'CRM系统架构',
      filename: '../views/index.html',
      template: resolve(__dirname, '../src/web/index.prod.html'),
      inject: true,
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ]
};