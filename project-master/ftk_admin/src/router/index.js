import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import home from '@/components/home/home'
import index from '@/components/home/index'

/*import userlist from '@/components/page/user/userlist'
import uBusiness from '@/components/page/user/uBusiness'

import authlist from '@/components/page/auth/authlist'

import business from '@/components/page/business/business'

import checklist from '@/components/page/checklist/checklist'*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden:true
    },
    /*{
      path:'/',
      component: home,
      name: '',
      iconCls: 'home',
      leaf: true,
      children: [
        { path: '/index', component: index, name:'首页'},
      ]
    },*/
    {
      path:'/',
      component: home,
      name: '',
      iconCls: 'usermanage',
      leaf: true,
      children: [
        { path:'/userlist', component: resolve=>require(['@/components/page/user/userlist'], resolve), name:'用户管理'}
      ]
    },
    {
      path:'/',
      component: home,
      name: '',
      iconCls: 'submenu',
      hidden: true,
      children: [
        { path:'/uBusiness', component: resolve=>require(['@/components/page/user/uBusiness'], resolve), name:'用户资金业务'}
      ]
    },
    {
      path:'/',
      component: home,
      name: '',
      iconCls: 'userauth',
      leaf: true,
      children: [
        { path:'/authlist', component: resolve=>require(['@/components/page/auth/authlist'], resolve), name:'用户认证'}
      ]
    },
    {
      path:'/',
      component: home,
      name: '',
      iconCls: 'fundlist',
      leaf: true,
      children: [
        { path:'/business', component: resolve=>require(['@/components/page/business/business'], resolve), name:'资金业务'}
      ]
    },
    {
      path:'/',
      component: home,
      name: '',
      iconCls: 'checklist',
      leaf: true,
      children: [
        { path:'/checklist', component: resolve=>require(['@/components/page/checklist/checklist'], resolve), name:'资料清单'}
      ]
    },
  ]
})
