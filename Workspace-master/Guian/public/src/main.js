import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);

const test = { template: '<div><h2>我是第 1 个子页面{{ $route.params.id }}</h2></div>' }
import index from './component/index.vue';
import gaxq from './component/gaxq.vue';
import fskPage from './component/fushikang.vue';
import chaye from './component/chaye.vue';
import chengdu from './component/chengdu.vue';

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/fskPage',
      name: 'fskPage',
      component: fskPage
    },
    {
      path: '/chaye',
      name: 'chaye',
      component: chaye
    },
    {
      path: '/gaxq',
      name: 'gaxq',
      component: gaxq
    },
    {
      path: '/chengdu',
      name: 'chengdu',
      component: chengdu
    }
  ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  // render: h => h(App),
  render: (function (h) {  
    return h(App);  
  })
}).$mount('#app')
