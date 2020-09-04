const {merge} = require('webpack-merge');
const {join,resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));

const _mode = argv.mode || "development";
const _modeFlag = _mode === "production";
const _mergeConfig = require(`./config/webpack.${_modeFlag ? 'prod' : 'dev'}.config.js`);


const webpackConfig = {
  entry: {
    main: "./src/web/index.tsx"
  },

  output: {
    path: join(__dirname,"./dist/assets"),
    filename: "script/bundle.js"
  },

  watch: !_modeFlag,

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { // 确定执行css-loader前，有几个loader已经处理了css，这里有postcss-loader
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        type: 'asset',
      },
    ]
  },

  resolve: {
    alias: {
      '@assets': resolve('src/web/assets'),
      '@components': resolve('src/web/components'),
      '@models': resolve('src/web/models'),
      '@routes': resolve('src/web/routes'),
      '@pages': resolve('src/web/pages'),
      '@utils': resolve('src/web/utils'),
      '@tools': resolve('src/web/tools'),
    },
    modules: ['node_modules', resolve('src')],
    extensions: ['.js', '.ts', '.tsx', 'jsx'],
  },

  plugins: [
    new ProgressBarPlugin(), // 显示打包进度
    new MiniCssExtractPlugin({
      filename: _modeFlag
        ? 'styles/[name].[contenthash:8].css'
        : 'styles/[name].css',
      chunkFilename: _modeFlag
        ? 'styles/[name].[contenthash:8].css'
        : 'styles/[name].css',
    })
  ],

  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "async", // 参数可能是：all，async和initial，这里表示拆分异步模块。
      minSize: 30000,  // 如果模块的大小大于30kb，才会被拆分
      minChunks: 1,
      maxAsyncRequests: 5, // 按需加载时最大的请求数，意思就是说，如果拆得很小，就会超过这个值，限制拆分的数量。
      maxInitialRequests: 3, // 入口处的最大请求数
      name: false, // 拆分块的名称
      cacheGroups: {
        commons: { // 抽离第三方库
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: "commons"
        }
      }
    }
  },

  experiments: { // 实验特性
    // 一种允许使用资源文件,而不需要配置类似于 file-loader | url-loader | raw-loader
    // 等loaders 来处理它们的导入的模块
    asset: true,
  },
  // stats: {
  //   assets: false,
  //   builtAt: false,
  //   modules: false,
  //   entrypoints: false,
  //   moduleAssets: false,
  //   cached: false,
  //   children: false,
  //   chunks: false
  // },

};

module.exports = merge(webpackConfig,_mergeConfig);



