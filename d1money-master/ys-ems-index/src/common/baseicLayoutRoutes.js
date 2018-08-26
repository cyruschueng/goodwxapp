import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
    app,
    models: () => models.map(m => import(`../models/${m}.js`)),
    component,
});

// 页内导航,不需要成为导航菜单的
export const getBaseicLayoutRoutesData = app => [
    {
        name: '好文分享',
        path: '/enterpriseApplication/articleApp',
        exact: true,
        component: dynamicWrapper(app, ['project'], () => import('../routes/EnterpriseApplication/ArticleApp')),
    },
    {
        name: '发布文章',
        path: '/enterpriseApplication/articleApp/publishArticle',
        exact: true,
        component: dynamicWrapper(app, [], () => import('../routes/EnterpriseApplication/ArticleApp/PublishArticle')),
    },
]
