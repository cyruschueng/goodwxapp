import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import login from '@/components/login'
import register from '@/components/userSetting/register'
import pwdEdit from '@/components/userSetting/pwdEdit'

const home = resolve => require.ensure([], () => resolve (require('@/components/home/home.vue')), 'home')                
const index = resolve => require.ensure([], () => resolve (require('@/components/home/index.vue')), 'home')

const draftList = resolve => require.ensure([], () => resolve (require('@/components/sideBar/allDraft/ticketList.vue')))                                //票据查询
const draftIssue = resolve => require.ensure([], () => resolve (require('@/components/sideBar/issue/issueDraft.vue')))                                  //出票申请
const createData = resolve => require.ensure([], () => resolve (require('@/components/page/createData.vue')))                                           //数据生成

const accentanceApplication = resolve => require.ensure([], () => resolve (require('@/components/sideBar/acceptance/application.vue')), 'acceptance')   //承兑业务
const acceptanceQuery = resolve => require.ensure([], () => resolve (require('@/components/sideBar/acceptance/query.vue')), 'acceptance')

const receiveApplication = resolve => require.ensure([], () => resolve (require('@/components/sideBar/receive/application.vue')), 'receive')            //提示收票
const receiveQuery = resolve => require.ensure([], () => resolve (require('@/components/sideBar/receive/query.vue')), 'receive')
const receiveSign = resolve => require.ensure([], () => resolve (require('@/components/sideBar/receive/sign.vue')), 'receive')

const endorseApplication = resolve => require.ensure([], () => resolve (require('@/components/sideBar/endorsement/application.vue')), 'endorse')        //背书转让
const endorseQuery = resolve => require.ensure([], () => resolve (require('@/components/sideBar/endorsement/query')), 'endorse')
const endorseSign = resolve => require.ensure([], () => resolve (require('@/components/sideBar/endorsement/sign.vue')), 'endorse')

const discountApplication = resolve => require.ensure([], () => resolve (require('@/components/sideBar/discount/application.vue')), 'discount')         //贴现申请
const discountQuery = resolve => require.ensure([], () => resolve (require('@/components/sideBar/discount/query.vue')), 'discount')

const paymentApplication = resolve => require.ensure([], () => resolve (require('@/components/sideBar/payment/application.vue')), 'payment')            //付款申请
const paymentQuery = resolve => require.ensure([], () => resolve (require('@/components/sideBar/payment/query.vue')), 'payment')



export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      hidden:true
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      hidden: true
    },
    {
      path: '/pwdEdit',
      name: 'pwdEdit',
      component: pwdEdit,
      hidden: true
    },
    {
      path:'/home',
      name:'',
      component: home,
      hidden: true,
      children:[
        { path: '/createData', component: createData, name:'数据生成' }
      ]
    },
    {
      path:'/home',
      component: home,
      name: '',
      iconCls: 'home',
      leaf: true,
      children: [
        { path: '/index', component: index, name:'首页'},
      ]
    },
    {
      path:'/home',
      component: home,
      name: '票据查询',
      iconCls: 'ticketquery',
      children: [
        { path: '/draftList', component: draftList, name:'票据列表'},
      ]
    },
    {
      path:'/home',
      component: home,
      name: '出票申请',
      iconCls: 'issueDraft',
      children: [
        { path: '/draftIssue', component: draftIssue, name:'出票信息登记'},
      ]
    },
    {
      path:'/home',
      component: home,
      name: '承兑业务',
      iconCls: 'acceptance',
      children: [
        { path: '/acceptanceApplication', component: accentanceApplication, name:'提示承兑申请'},
        { path: '/acceptanceQuery', component: acceptanceQuery, name:'提示承兑申请查询及撤销'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '提示收票',
      iconCls: 'receive',
      children: [
        { path: '/receiveApplication', component: receiveApplication, name:'提示收票申请'},
        { path: '/receiveQuery', component: receiveQuery, name:'提示收票申请查询及撤销'},
        { path: '/receiveSign', component: receiveSign, name:'提示收票签收'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '背书转让',
      iconCls: 'endorse',
      children: [
        { path: '/endorseApplication', component: endorseApplication, name:'背书转让申请'},
        { path: '/endorseQuery', component: endorseQuery, name:'背书转让申请查询及撤销'},
        { path: '/endorseSign', component: endorseSign, name:'背书转让签收'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '贴现业务',
      iconCls: 'discount',
      children: [
        { path: '/discountApplication', component: discountApplication, name:'贴现申请'},
        { path: '/discountQuery', component: discountQuery, name:'贴现处理查询及撤销'}
      ]
    },
    {
      path:'/home',
      component: home,
      name: '付款申请',
      iconCls: 'payment',
      children: [
        { path: '/paymentApplication', component: paymentApplication, name:'提示付款申请'},
        { path: '/paymentQuery', component: paymentQuery, name:'提示付款处理查询及撤销'}
      ]
    },
  ]
})
