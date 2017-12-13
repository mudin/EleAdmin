const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Middleware = require('./config/Middleware.js');
const path = require('path');

module.exports = {
  // source-map 生成方式选项
  devtool: 'eval-source-map',

  // __dirname 是全局Node变量，向当前执行脚本所在的目录。

  // 已多次提及的唯一入口文件
  entry: path.join(__dirname, '/app/main.js'),

  output: {
    // 打包后的文件存放的地方
    path: path.join(__dirname, '/public'),
    // 打包后输出文件的文件名
    filename: 'bundle.js'
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },

  // 本地服务器
  devServer: {
    // 本地服务器所加载的页面所在的目录
    contentBase: './public',
    // 不跳转
    historyApiFallback: true,
    // 实时刷新
    inline: true,

    before: Middleware
  },

  // 加载器
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // ,options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'app')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/app/index.html')
    }),
    new webpack.BannerPlugin('版权所有，翻版必究')
    // ,new webpack.HotModuleReplacementPlugin()
    // ,new webpack.optimize.OccurrenceOrderPlugin()
    // ,new webpack.optimize.UglifyJsPlugin()
    // ,new ExtractTextPlugin("style.css")
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(env)
    // })
  ]
};
