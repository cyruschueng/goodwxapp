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
      redirect: '/pages/index',
      component: RouterView,
      children: [{
        // 全景管理
        path: 'index',
        meta: {
          title: '目录'
        },
        // redirect: '/pages/pano/mosaic',
        component: resolve => require(['@/pages/pano.vue'], resolve)
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
        // 用户中心
        path: 'usercenter',
        meta: {
          title: '用户中心'
        },
        component: resolve => require(['@/pages/usercenter.vue'], resolve)
      },
      {
        path: 'gridAlbum',
        meta: {
          title: '空间专题管理'
        },
        component: resolve => require(['@/pages/gridAlbum.vue'], resolve)
      }
      ]
    }
  ]
})
