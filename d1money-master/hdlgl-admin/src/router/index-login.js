import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            meta: {
                title: '企业登录'
            },
            component: Login
        }
    ]
})
