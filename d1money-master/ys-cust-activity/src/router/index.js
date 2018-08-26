import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            name: 'ActivityIframe',
            component: (resolve) => require(['@/pages/ActivityIframe'], resolve),
            props: true
        }
    ]
})
