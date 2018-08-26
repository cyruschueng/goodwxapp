import Vue from 'vue'
import Router from 'vue-router'
import Video from '@/pages/Video'
import VideoDetail from '@/pages/VideoDetail'

Vue.use(Router)

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/video'
        },
        {
            path: '/video',
            name: 'Video',
            component: Video,
            meta: {
                title: '视频'
            }
        },
        {
            path: '/video-detail/:videoid',
            name: 'VideoDetail',
            component: VideoDetail,
            meta: {
                title: '视频'
            },
            props: true
        }
    ]
})
