import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/pages/Article'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/Article'
        },
        {
            path: '/article',
            name: 'Article',
            component: Article
        }
    ]
})
