import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            name: 'ProductIframe',
            component: (resolve) => require(['@/pages/ProductIframe'], resolve),
            props: true
        }
    ]
})
