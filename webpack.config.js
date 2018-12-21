const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './public'
            }
          },
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 8192
          //   }
          // },
          "url-loader",
          "file-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }
};