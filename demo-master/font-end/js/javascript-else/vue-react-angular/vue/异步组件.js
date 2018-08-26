// 在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了进一步简化，Vue.js 允许将组件定义为一个工厂函数，异步地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如：
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 将组件定义传入 resolve 回调函数
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
// 工厂函数接收一个 resolve 回调，在收到从服务器下载的组件定义时调用。也可以调用 reject(reason) 指示加载失败。这里使用 setTimeout 只是为了演示，实际上如何获取组件完全由你决定。推荐配合 webpack 的代码分割功能 来使用：

Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})
// 你可以在工厂函数中返回一个 Promise，所以当使用 webpack 2 + ES2015 的语法时可以这样：

Vue.component(
  'async-webpack-example',
  // 该 `import` 函数返回一个 `Promise` 对s象。
  () => import('./my-async-component')
)

module.exports = file => () => import('@/views/' + file + '.vue')
module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
