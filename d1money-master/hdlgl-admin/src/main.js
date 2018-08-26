import Vue from 'vue'
import App from './App'
import router from './router/index'
// import router from './router/index-login'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Util from './util/util'
import axios from './axios/index'
import VueTimeago from 'vue-timeago'
import 'babel-polyfill'

Vue.use(iView)
Vue.use(VueTimeago, {
    name: 'timeago', // component name, `timeago` by default
    locale: 'en-US',
    locales: {
        'zh-CN': require('vue-timeago/locales/zh-CN.json')
    }
})
Vue.config.productionTip = false

Vue.prototype.$http = axios
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    Util.title(to.meta.title)
    next()
})

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})
let vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
Vue.use({
    vm
})
