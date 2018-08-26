/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { defaultRouter } from './config'
import Login from '@/pages/login.vue'
import NotFound from '@/pages/notfound.vue'
import RouterView from '@/pages/routerview.vue'

Vue.use(Router)
/**
export default new Router({
  mode: 'hash',
  routes: defaultRouter
})
 */
/**/
const scrollBehavior = (to, from, savedPosition) => {
  // console.log(`scroll behavior :`, arguments)
  if (savedPosition) {
    // console.log(savedPosition)
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    // console.log(position)
    return position
  }
}
export default new Router({
  mode: 'hash',
  scrollBehavior,
  routes: [
    {
      path: '*',
      component: Login
    },
    {
      path: '/',
      component: Login
    },
    {
      path: 'index',
      name: 'index',
      redirect: '/pages'
    },
    {
      // 全景全屏
      name: 'allPano',
      path: '/allPano',
      component: resolve => require(['@/components/space/fullScreenPano.vue'], resolve)
    },
    {
      path: '/pages',
      name: 'pages',
      redirect: '/pages/pano',
      component: RouterView,
      children: [{
        // 全景管理
        path: 'pano',
        meta: {
          title: '全景管理'
        },
        redirect: '/pages/pano/mosaic',
        component: resolve => require(['@/pages/pano.vue'], resolve),
        children: [{// 待拼接 mosaic
          path: 'mosaic',
          meta: {
            title: '全景管理-待拼接'
          },
          component: resolve => require(['@/pages/pano/mosaiclist.vue'], resolve)
        },
        {// 待处理 upload
          path: 'upload',
          meta: {
            title: '全景管理-待处理'
          },
          component: resolve => require(['@/pages/pano/upload.vue'], resolve)
        },
        {// 已入库 list
          path: 'list',
          meta: {
            title: '全景管理-已入库'
          },
          component: resolve => require(['@/pages/pano/list.vue'], resolve)
        }]
      },
      {
        // 空间管理
        path: 'space',
        meta: {
          title: '空间管理'
        },
        component: resolve => require(['@/pages/space.vue'], resolve),
        children: [{
          // 网格
          path: '',
          meta: {
            title: '空间管理-网格'
          },
          component: resolve => require(['@/components/space/newCell.vue'], resolve)
        },
        {
          // 漫游
          path: 'roam',
          name: 'roam',
          meta: {
            title: '空间管理-漫游'
          },
          component: resolve => require(['@/components/space/roam.vue'], resolve)
        }]
      },
      {
        // 专题管理
        path: 'album',
        meta: {
          title: '专题管理'
        },
        component: resolve => require(['@/pages/album.vue'], resolve)
      },
      {
          // 发布修改
          path: 'publishEdit',
          meta: {
            title: '编辑'
          },
          component: resolve => require(['@/pages/publishEdit.vue'], resolve)
      },
      {
        // 发布管理
        path: 'publish',
        meta: {
          title: '发布管理'
        },
        redirect: '/pages/publish/drafts',
        component: resolve => require(['@/pages/publish.vue'], resolve),
        children: [{
          path: 'drafts',
          meta: {
            title: '发布管理-草稿箱'
          },
          component: resolve => require(['@/pages/publish/drafts.vue'], resolve)
        }, {
          path: 'sentItems',
          meta: {
            title: '发布管理-已发布'
          },
          component: resolve => require(['@/pages/publish/sentItems.vue'], resolve)
        }, {
          path: 'delete',
          meta: {
            title: '发布管理-已删除'
          },
          component: resolve => require(['@/pages/publish/delete.vue'], resolve)
        }]
      },
      {
        // 三维管理
        path: 'module',
        meta: {
          title: '三维管理'
        },
        component: resolve => require(['@/pages/module.vue'], resolve)
      },
      {
        // 业务统计
        path: 'static',
        meta: {
          title: '业务统计'
        },
        redirect: '/pages/static/panoCompute',
        component: resolve => require(['@/pages/static.vue'], resolve),
        children: [{
          path: 'panoCompute',
          meta: {
            title: '业务统计-全景流量'
          },
          component: resolve => require(['@/pages/static/panoCompute.vue'], resolve)
        }, {
          path: 'gridCompute',
          meta: {
            title: '业务统计-网格流量'
          },
          component: resolve => require(['@/pages/static/gridCompute.vue'], resolve)
        }, {
          path: 'albumCompute',
          meta: {
            title: '业务统计-专题流量'
          },
          component: resolve => require(['@/pages/static/albumCompute.vue'], resolve)
        }, {
          path: 'userCompute',
          meta: {
            title: '业务统计-用户流量'
          },
          component: resolve => require(['@/pages/static/userCompute.vue'], resolve)
        }
        ]},
      {
        // 拍摄需求
        path: 'shot',
        meta: {
          title: '拍摄需求'
        },
        component: resolve => require(['@/pages/shot/shot.vue'], resolve)
      },
      {
        // 用户中心
        path: 'usercenter',
        meta: {
          title: '用户中心'
        },
        component: resolve => require(['@/pages/usercenter.vue'], resolve)
      }
      ]
    }
  ]
})
