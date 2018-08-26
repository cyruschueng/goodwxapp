import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/productList'
        },
        {
            path: '/productList',
            name: 'ProductList',
            component: (resolve) => require(['@/pages/ProductList.vue'], resolve),
            meta: {
                title: '产品分享列表'
            },
            props: true
        },
        {
            path: '/productDetail/:id',
            name: 'ProductDetail',
            component: (resolve) => require(['@/pages/ProductDetail.vue'], resolve),
            props: true
        },
        {
            path: '/productIframe/:id',
            name: 'ProductIframe',
            component: (resolve) => require(['@/pages/ProductIframe.vue'], resolve),
            props: true
        }
    ]
})
