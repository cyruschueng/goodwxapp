import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            meta: {
                title: '方正E家'
            },
            component: (resolve) => require(['@/pages/Index.vue'], resolve),
            children: [
                {
                    path: '/',
                    name: 'Home',
                    meta: {
                        title: '首页'
                    },
                    component: (resolve) => require(['@/pages/Home.vue'], resolve)
                },
                {
                    path: 'customer',
                    name: 'Customer',
                    meta: {
                        title: '客户'
                    },
                    component: (resolve) => require(['@/pages/Customer.vue'], resolve)
                },
                {
                    path: 'customerDetail/:id',
                    name: 'CustomerDetail',
                    meta: {
                        title: '客户详情'
                    },
                    props: true,
                    component: (resolve) => require(['@/pages/Customer/detail.vue'], resolve)
                },
                {
                    path: 'mine',
                    name: 'Mine',
                    meta: {
                        title: '我的'
                    },
                    component: (resolve) => require(['@/pages/Mine.vue'], resolve)
                }
            ]
        },
        {
            path: '/personalData',
            name: 'PersonalData',
            meta: {
                title: '个人资料'
            },
            component: (resolve) => require(['@/pages/Mine/PersonalData.vue'], resolve)
        },
        {
            path: '/uploadAvatar',
            name: 'UploadAvatar',
            meta: {
                title: '上传头像'
            },
            component: (resolve) => require(['@/pages/Mine/UploadAvatar.vue'], resolve)
        },
        {
            path: '/uploadNickname',
            name: 'UploadNickname',
            meta: {
                title: '修改名字'
            },
            component: (resolve) => require(['@/pages/Mine/UploadNickname.vue'], resolve)
        },
        {
            path: '/uploadPhone',
            name: 'UploadPhone',
            meta: {
                title: '修改手机号码'
            },
            component: (resolve) => require(['@/pages/Mine/UploadPhone.vue'], resolve)
        },
        {
            path: '/uploadWxewm',
            name: 'UploadWxewm',
            meta: {
                title: '上传二维码'
            },
            component: (resolve) => require(['@/pages/Mine/UploadWxewm.vue'], resolve)
        }
    ]
})
