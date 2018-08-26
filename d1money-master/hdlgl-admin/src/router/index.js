import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Home from '@/view/pages/index'
import VisitStatistics from '@/view/pages/VisitStatistics.vue'
import VisitData from '@/view/pages/VisitData.vue'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            meta: {
                title: '首页'
            },
            component: Index,
            children: [
                {
                    path: '/',
                    redirect: '/Home'
                },
                {
                    path: '/home',
                    name: 'Home',
                    meta: {
                        title: '数据监控',
                        icon: 'speedometer'
                    },
                    component: Home
                },
                {
                    path: '/visitData',
                    name: 'VisitData',
                    meta: {
                        title: '拜访数据',
                        icon: 'social-buffer'
                    },
                    component: VisitData
                },
                {
                    path: '/visitStatistics',
                    name: 'VisitStatistics',
                    meta: {
                        title: '拜访统计',
                        icon: 'pie-graph'
                    },
                    component: VisitStatistics
                }
            ]
        }
    ]
})
