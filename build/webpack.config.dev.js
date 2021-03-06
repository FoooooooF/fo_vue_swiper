// webpack.config.js
const path=require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'main.js',
  },
  mode: 'development',
  devtool:"inline-source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.(css|less)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin()
  ]
}