const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const glob = require('glob')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./manifest.json'),
      }),
      new AddAssetHtmlPlugin(
        glob.sync(__dirname+'/build/**/*.js').map(path => {
          return {
            filepath: path
          }
        })
      )
    ]
  },
  chainWebpack: config => {
    if (config.mode === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }
}