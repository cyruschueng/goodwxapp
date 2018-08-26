import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import Actionsheet from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
import { Popup } from 'mint-ui';
import App from './App.vue'

//开启debug模式
Vue.config.debug = true;

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(InfiniteScroll)
Vue.use(Actionsheet)
Vue.component(Popup.name, Popup);

const store = new Vuex.Store({
  state: {
    screenWidth: window.innerWidth,
    smrzData: {
      name: '',
      ads: '',
      person: '',
      phone: '',
      service: '',
      serviceName: '',
      typeIDs: '',
      types: ''
    },
    spbjInput: {
      goodsName: '',
      goodsPrice: '',
      goodsExplain: ''
    }
  },
  mutations: {
    storeScreenWidth (state, n) {
      state.screenWidth = n
    },
    storeSmrzData (state, n) {
      for(var key in state.smrzData){
        state.smrzData[key] = n[key] || ''
      }
    },
    saveSpbjInput (state,d){
      for(var key in state.spbjInput){
        state.spbjInput[key] = d[key]
      }
    }
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
          path: '/buyer/jysh',
          name: 'buyer_jysh',
          component: function (resolve) {
            require(['./component/buyer/jysh.vue'], resolve)
          }
        },
        {
          path: '/buyer/jylb',
          name: 'buyer_jylb',
          component: function (resolve) {
            require(['./component/buyer/jylb.vue'], resolve)
          }
        },
        {
          path: '/buyer/jyxq',
          name: 'buyer_jyxq',
          component: function (resolve) {
            require(['./component/buyer/jyxq.vue'], resolve)
          }
        },
        {
          path: '/buyer/spxq',
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
          path: '/seller/smrz',
          name: 'seller_smrz',
          component: function (resolve) {
            require(['./component/seller/smrz.vue'], resolve)
          },
          children: [
            {
              path: '/',
              name: 'seller_smrz_index',
              component: function(resolve) {
                require(['./component/seller/smrz/index.vue'], resolve)
              }
            },
            {
              path: '/type',
              name: 'type',
              component: function(resolve) {
                require(['./component/seller/smrz/type.vue'], resolve)
              }
            }
          ] 
        },
        {
          path: '/seller/spfl',
          name: 'seller_spfl',
          component: function (resolve) {
            require(['./component/seller/goodsType.vue'], resolve)
          }
        },
        {
          path: '/seller/jylb',
          name: 'seller_jylb',
          component: function (resolve) {
            require(['./component/seller/jylb.vue'], resolve)
          }
        },
        {
          path: '/seller/jyxq',
          name: 'seller_jyxq',
          component: function (resolve) {
            require(['./component/seller/jyxq.vue'], resolve)
          }
        },
        {
          path: '/seller/twsm',
          name: 'seller_twsm',
          component: function (resolve) {
            require(['./component/seller/twsm.vue'], resolve)
          }
        },
        {
          path: '/seller/yssp',
          name: 'seller_yssp',
          component: function (resolve) {
            require(['./component/seller/yssp.vue'], resolve)
          }
        },
        {
          path: '/seller/spbj',
          name: 'spbj',
          component: function (resolve) {
            require(['./component/seller/spbj.vue'], resolve)
          }
        },
        {
          path: '/seller/smsh',
          name: 'smsh',
          component: function (resolve) {
            require(['./component/seller/smsh.vue'], resolve)
          }
        },
        {
          path: '/seller/add',
          name: 'add',
          component: function(resolve){
            require(['./component/seller/addPro.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/result/:res',
      name: 'result',
      component: function(resolve) {
        require(['./component/result.vue'], resolve)
      }
    },
    {
      path: '/upload/:id',
      name: 'upload',
      component: function(resolve) {
        require(['./component/upload.vue'], resolve)
      }
    }
  ]
})
router.beforeEach(function(to, from, next){
  commom.passPort2(function(){
    next()
  })  
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  store,
  router: router,
  render: h => h(App)
}).$mount('#app')
