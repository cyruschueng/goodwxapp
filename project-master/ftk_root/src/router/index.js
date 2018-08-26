import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import home from '@/components/home/home'
import index from '@/components/home/index'

import userlist from '@/components/page/user/userlist'

/*import fundlist from '@/components/page/funds/fundlist'

import checklist from '@/components/page/checklist/checklist'

import enterprise from '@/components/page/enterprise/enterprise'

import news from '@/components/page/editor/editor'*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      // component: resolve => (['@/components/login'], resolve),
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
      path:'/home',
      component: home,
      name: '',
      iconCls: 'usermanage',
      leaf: true,
      children: [
        { path:'/userlist', component: userlist, name:'用户管理'}
      ]
    },{
      path:'/home',
      component: home,
      name: '',
      iconCls: 'fundlist',
      leaf: true,
      children: [
        { path:'/fundlist', component: resolve => require(['@/components/page/funds/fundlist'], resolve), name:'资金业务'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '',
      iconCls: 'checklist',
      leaf: true,
      children: [
        { path:'/checklist', component: resolve => require(['@/components/page/checklist/checklist'], resolve), name:'默认清单'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '',
      iconCls: 'companymanage',
      leaf: true,
      children: [
        { path:'/enterprise', component: resolve => require(['@/components/page/enterprise/enterprise'], resolve), name:'企业管理'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '',
      iconCls: 'news',
      leaf: true,
      children: [
        { path:'/newslistR', component: resolve => require(['@/components/page/news/newsList'], resolve), name:'平台资讯'}
      ]
    },
     {
      path:'/home',
      component: home,
      name: '',
      hidden: true,
      children: [
        { path:'/editorR', component: resolve => require(['@/components/page/news/editor'], resolve), name:'新增/编辑'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '',
      iconCls: 'news',
      leaf: true,
      children: [
        { path:'/newslist', component: resolve => require(['@/components/page/editor/newsList'], resolve), name:'票据资讯'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '',
      hidden: true,
      children: [
        { path:'/editor', component: resolve => require(['@/components/page/editor/editor'], resolve), name:'新增/编辑'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '虚拟业务',
      iconCls: 'news',
      children: [
        { path:'/user', component: resolve => require(['@/components/page/virtual/user'], resolve), name:'虚拟用户'},
        { path:'/funds', component: resolve => require(['@/components/page/virtual/funds'], resolve), name:'资金业务'},
        { path:'/buy', component: resolve => require(['@/components/page/virtual/buy'], resolve), name:'我要收票'},
        { path:'/sell', component: resolve => require(['@/components/page/virtual/sell'], resolve), name:'我要卖票'}
      ]
    }
  ]
})
