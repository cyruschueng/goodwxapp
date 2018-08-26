import Vue from 'vue'
import Router from 'vue-router'
import Main from './main.js'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/login',
      component: resolve => require(['@/components/pages/login/login.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/pages/login/login.vue'], resolve)
    },
    {
      path: '/demo',
      name: 'demo',
      component: resolve => require(['@/components/pages/demo/demo.vue'], resolve)
    },
    {
      path: '*',
      name: '404',
      component: resolve => require(['@/components/pages/404.vue'], resolve)
    },
    {
      path: '/main',
      name: 'main',
      redirect: '/index',
      component: resolve => require(['@/components/pages/main/main.vue'], resolve),
      children: [
        ...Main
      ]
    }
  ]
})
