export default [
  {
    path: '/index',
    name: 'index',
    redirect: '/index/test',
    component: resolve => require(['@/components/pages/index/index.vue'], resolve),
    children: [
      {
        path: '/index/test',
        name: 'test',
        component: resolve => require(['@/components/pages/index/page/test.vue'], resolve)
      }
    ]
  }
]
