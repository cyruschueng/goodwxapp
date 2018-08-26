import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from '@/store/api/http'
import storage from '@/store/api/localStorage'
import utils from '@/utils/utils'
import ver from '@/utils/verification'
import VDistpicker from 'v-distpicker'
// 构建时注释
import ElementUI from 'element-ui'
import './assets/theme-chalk/index.css'
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'

Vue.use(HappyScroll)
Vue.use(ElementUI)
Vue.component('v-distpicker', VDistpicker)
// 构建时注释
Vue.config.productionTip = true
Vue.prototype.$_api = api
Vue.prototype.$_utils = utils
Vue.prototype.$_storage = storage
Vue.prototype.$_ver = ver

Vue.directive('title', {
  inserted: (el, binding) => {
    document.title = binding.value
  }
})

// 拦截路由
// router.beforeEach((to, from, next) => {
//   // store.commit('changeAdminleftnavnum', to.name)
//   // console.log(to)
//   store.commit('setData', { key: 'ToPath', val: to.path })
//   if (typeof store.state.globalData.token !== 'undefined') {
//     if (to.name === 'login') {
//       next({ path: '/index' })
//     } else {
//       // 判断限列PermissionListName
//       next()
//     }
//   } else if (typeof store.state.globalData.token === 'undefined') {
//     if (to.name !== 'login' ) {
//       next({ path: '/login' })
//     } else {
//       next()
//     }
//   }
// })
// router.afterEach(() => {
//   window.scrollTo(0, 0)
// })

const init = () => {
  utils.FormatDate()
  let globalDataLoca = storage.get('globalData')
  const globalData = typeof globalDataLoca === 'string' ? {} : globalDataLoca
  store.commit('setData', { key: 'globalData', val: globalData })
  // if (typeof globalDataLoca !== 'string') {
  //   store.commit('stopmClientInit')
  // }
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    }
  })
}
init()
