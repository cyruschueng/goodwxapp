// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import './style/index.css'
import Api from './api'
import Utils from './utils'
import Directive from './utils/directive'
import VueDND from 'awe-dnd'
// import { hostName } from './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/test.css'
import App from './App'

// 注册到全局
Vue.use(ElementUI)
Vue.use(Utils)
Vue.use(Api)
Vue.use(Directive)
Vue.use(VueDND)

let menus = JSON.parse(Vue.prototype.$sessionStorage.get('menu'))
if (menus) {
  store.commit('ADD_MENU', menus)
  router.addRoutes(store.state.menus)
}

/* 定义全局变量HOST */
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  /* 修改页面title */
  let baseTitle = '全景顺德'
  document.title = `${to.meta.title ? (to.meta.title + ' - ') : ''}${baseTitle}`
  next()
  /* 判断是否登陆 */
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
