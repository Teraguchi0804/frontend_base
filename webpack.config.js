var webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'index.js'
  },
  devtool: 'source-map',
  //グローバル変数にjQueryを配置する
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: "jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        //cosnoleを取り除く
        drop_console: true
}
    })
  ]

};
