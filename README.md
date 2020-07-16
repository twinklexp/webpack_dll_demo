# hello-world

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration

### webpack dll 的使用
安装插件
```shell
npm install --save-dev webpack
npm install --save-dev webpack-bundle-analyzer
npm install --save-dev add-asset-html-webpack-plugin
npm install --save-dev glob
```
* Step1. 创建生成 dll 文件的 webpack 配置文件 webpack.dll.js，名称可以自己定义。
```javascript
const webpack = require('webpack');
const path = require('path')
const vendors = [
  'vue',
  'vue-router'
]
module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name][chunkhash].js',
    library: '[name]_[chunkhash]'
  },
  entry: {
    vendor: vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'manifest.json'),  // 会在配置文件同目录下下生成一个manifest.json文件
      name: '[name]_[chunkhash]', // 和output.library保持一致
      context: __dirname
    })
  ]
}
```
通过命令```webpack --config  webpack.dll.js```就能够在build文件夹下生成dll的文件

* Step2. 在webpack的开发打包配置文件内加入dll引用插件
```javascript
new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./manifest.json'),
})
```
插件作用：References a dll manifest file to map dependency names to module ids, then requires them as needed using the internal __webpack_require__ function.

* Step3. 在webpack的开发打包配置文件加入可以帮助插入dll文件的插件
```javascript
new AddAssetHtmlPlugin(
  glob.sync(__dirname+'/build/**/*.js').map(path => {
    return {
      filepath: path
    }
  })
)
```
这个插件不仅可以在html中插入dll文件路径，还会把js文件打包进dist文件夹内。
