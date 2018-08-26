import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/',
    layout: 'UserLayout',
    children: [
      {
        name: '登录',
        path: '/',
        component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
      },
    ],
  },
];
