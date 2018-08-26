// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'//引入vuex store
import './assets/js/iconfont.js' // iconfont

//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

//引入axios
import axios from 'axios'
Vue.prototype.axios=axios

//引入js-cookie
import cookie from 'js-cookie'
Vue.prototype.cookie=cookie

//引入vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

//引入全局变量
import './assets/js/global.js'

//公共函数
import {globalMethods} from './mixin/globalMethods'
Vue.mixin(globalMethods)



//vue devtools
Vue.config.devtools = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
