---
title: Vue.config.js配置 最新可用版本
date: 2020-10-12 10:18:00
---

## 最近 在学前端，然后，学了这个vue-cli脚手架，虽然，我这个vue-cli还不算入门，后我会把这个笔记补上
#### 下面是我的Vue.config.js的配置，我感觉这个复用的程度高，所以记下 了这个随笔
```
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '.', dir) // 这里采用一个点，因为vue.config.js文件和package.json文件都在同一个目录下，即根目录下
}


module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部,
  // 例如 https://www.my-app.com/
  // 如果你的应用部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如将你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 '/my-app/'

  outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
  lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
  transpileDependencies: [
    /* string or regex */
  ], // 是否为生产环境构建生成sourceMap?

  productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
     config
       .plugin('html')
       .tap(args => {
         args[0].title= '你的项目的默认的名字'
         return args
       })
   },
  configureWebpack: () => {}, // CSS 相关选项
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    extract: true, // 允许生成 CSS source maps?
    sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
    modules: false
  }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

  parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

  pwa: {}, // configure webpack-dev-server behavior
  configureWebpack: {
      resolve: {
          alias: {
            '@': resolve('src'),
            '@css': resolve('src/assets/css/'),
             // 这里采用两个@符号来代替路径的别名，因为一个@符号已经默认被设置src的路径了，为了不影响原有的功能，这里采用两个@字符
          }
      },
      plugins: [
          // 需要用到拷贝文件的插件
          new CopyWebpackPlugin([
              {
                from: path.resolve(__dirname, './static'),
                to: '.',
                ignore: ['.*']
              }
            ])
      ]
  },
  devServer: {
    open: process.platform === "darwin",
    disableHostCheck: false,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: null // string | Object
    // before: app => {}
  }, // 第三方插件配置

  pluginOptions: {
    // ...
  }
};
```