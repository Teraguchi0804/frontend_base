var webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'index.js'
  },
  //グローバル変数にjQueryを配置する
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: "jquery"
    })
  ]
  // plugins: [
  //   new webpack.ProvidePlugin(
  //       {
  //         jQuery: "jquery",
  //         $: "jquery",
  //         _: "underscore",
  //         Backbone: "backbone",
  //         Marionette: "backbone.marionette"
  //       }
  //   )
  //   ,
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]
};
