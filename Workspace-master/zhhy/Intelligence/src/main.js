import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import App from './App.vue'

//开启debug模式
Vue.config.debug = true;

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  }
})

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: function (resolve) {
        require(['./component/index.vue'], resolve)
      }
    },
    {
      path: '/buyer',
      name: 'buyer',
      component: function (resolve) {
        require(['./component/buyer/index.vue'], resolve)
      },
      children: [
        {
          path: '',
          name: 'buyer_jysh',
          component: function (resolve) {
            require(['./component/buyer/jysh.vue'], resolve)
          }
        },
        {
          path: '/jylb',
          name: 'buyer_jylb',
          component: function (resolve) {
            require(['./component/buyer/jylb.vue'], resolve)
          }
        },
        {
          path: '/jyxq',
          name: 'buyer_jyxq',
          component: function (resolve) {
            require(['./component/buyer/jyxq.vue'], resolve)
          }
        },
        {
          path: '/spxq',
          name: 'buyer_spxq',
          component: function (resolve) {
            require(['./component/buyer/spxq.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/seller',
      name: 'seller',
      component: function (resolve) {
        require(['./component/seller/index.vue'], resolve)
      },
      children: [
        {
          path: '',
          name: 'seller_smrz',
          component: function (resolve) {
            require(['./component/seller/smrz.vue'], resolve)
          }
        },
        {
          path: '/jylb',
          name: 'seller_jylb',
          component: function (resolve) {
            require(['./component/seller/jylb.vue'], resolve)
          }
        },
        {
          path: '/jyxq',
          name: 'seller_jyxq',
          component: function (resolve) {
            require(['./component/seller/jyxq.vue'], resolve)
          }
        },
        {
          path: '/twsm',
          name: 'seller_twsm',
          component: function (resolve) {
            require(['./component/seller/twsm.vue'], resolve)
          }
        },
        {
          path: '/yssp',
          name: 'seller_yssp',
          component: function (resolve) {
            require(['./component/seller/yssp.vue'], resolve)
          }
        }
      ]
    },
  ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  store,
  router: router,
  render: h => h(App)
}).$mount('#app')
