import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/activity'
        },
        {
            path: '/activity',
            name: 'Activity',
            component: (resolve) => require(['@/pages/Activity'], resolve),
            meta: {
                title: '活动列表'
            },
            props: true
        },
        {
            path: '/activityDetail/:id',
            name: 'ActivityDetail',
            component: (resolve) => require(['@/pages/ActivityDetail'], resolve),
            props: true
        },
        {
            path: '/activityIframe/:id',
            name: 'ActivityIframe',
            component: (resolve) => require(['@/pages/ActivityIframe'], resolve),
            props: true
        }
    ]
})
