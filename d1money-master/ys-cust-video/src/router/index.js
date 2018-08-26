import Vue from 'vue'
import Router from 'vue-router'
import VideoDetail from '@/pages/VideoDetail'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/video-detail'
        },
        {
            path: '/video-detail',
            name: 'VideoDetail',
            component: VideoDetail,
            meta: {
                title: '方正E家'
            },
            props: true
        }
    ]
})
