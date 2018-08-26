/* eslint-disable */
import Login from '@/pages/login.vue'
import NotFound from '@/pages/notfound.vue'
import RouterView from '@/pages/routerview.vue'
const defaultRouter = [{
        path: '*',
        component: Login
    },{
        path: '/',
        component: Login
    },{
        name: '全屏全景',
        path: '/allPano',
        component: resolve => require(['@/components/space/fullScreenPano.vue'], resolve)
    },{
        path: 'index',
        name: 'index',
        redirect: '/pages'
    },{
        path: '/pages',
        name: 'pages',
        redirect: '/pages/pano',
        component: RouterView
    }
]

const pagesRouter = [{
    name: '全景管理',
    path: 'pano',
    meta: { title: '全景管理' },
    redirect: '/pages/pano/mosaic',
    component: resolve => require(['@/pages/pano.vue'], resolve),
    children: [{
      path: 'mosaic',
      meta: { title: '全景管理-待拼接' },
      component: resolve => require(['@/pages/pano/mosaic.vue'], resolve)
    },{
      path: 'upload',
      meta: { title: '全景管理-待拼接' },
      component: resolve => require(['@/pages/pano/upload.vue'], resolve)
    },{
      path: 'list',
      meta: { title: '全景管理-待拼接' },
      component: resolve => require(['@/pages/pano/list.vue'], resolve)
    }]
    },{
        name: '空间管理',
        path: 'space',
        meta: { title: '空间管理' },
        component: resolve => require(['@/pages/space.vue'], resolve),
        children: [{
        path: '',
        meta: { title: '空间管理-网格' },
        component: resolve => require(['@/components/space/newCell.vue'], resolve)
        },
        {
        path: 'roam',
        meta: {title: '空间管理-漫游'},
        component: resolve => require(['@/components/space/roam.vue'], resolve)
        }]
    },{
        name: '专题管理',
        path: 'album',
        meta: { title: '专题管理' },
        component: resolve => require(['@/pages/album.vue'], resolve)
    },{
        name: '发布管理',
        path: 'publish',
        meta: { title: '发布管理' },
        redirect: '/pages/publish/drafts',
        component: resolve => require(['@/pages/publish.vue'], resolve),
        children: [{
            path: 'drafts',
            meta: { title: '发布管理-草稿箱'},
            component: resolve => require(['@/pages/publish/drafts.vue'], resolve)
        }, {
            path: 'sentItems',
            meta: { title: '发布管理-已发布' },
            component: resolve => require(['@/pages/publish/sentItems.vue'], resolve)
        }, {
            path: 'delete',
            meta: { title: '发布管理-已删除' },
            component: resolve => require(['@/pages/publish/delete.vue'], resolve)
        }]
    },{
        name: '三维管理',
        path: 'module',
        meta: { title: '三维管理' },
        component: resolve => require(['@/pages/module.vue'], resolve)
    },{
        name: '业务统计',
        path: 'static',
        meta: { title: '业务统计' },
        component: resolve => require(['@/pages/static.vue'], resolve)
    },{
        name: '拍摄需求',
        path: 'shot',
        meta: { title: '拍摄需求' },
        component: resolve => require(['@/pages/shot.vue'], resolve)
    },{
        path: 'usercenter',
        meta: { title: '用户中心' },
        component: resolve => require(['@/pages/usercenter.vue'], resolve)
    }
]

// const loginRouter
export {defaultRouter, pagesRouter}
