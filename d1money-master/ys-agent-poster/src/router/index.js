import Vue from 'vue'
import Router from 'vue-router'
import Poster from '@/pages/Poster'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/poster'
        },
        {
            path: '/poster',
            name: 'Poster',
            component: Poster,
            meta: {
                title: '海报'
            }
        }
    ]
})
