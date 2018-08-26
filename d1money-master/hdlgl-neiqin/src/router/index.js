import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: '实地拜访数据监控'
            },
            component: Index
        }
    ]
})
