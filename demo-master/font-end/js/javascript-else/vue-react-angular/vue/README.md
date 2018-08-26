```
生命周期

computed vs watch

lodash  vs util

1.整个闭环store.dispatch('action') -> action -> commit -> mutation -> getter -> computed，
2.mapState、mapGetters、mapActions、mapMutations，
3.在我的组件里只允许出现 dispatch 和 mapGetters

自定义插件：过滤器，全局方法，指令，mixin

```

团队
滴滴，饿了么，小米，掘金，手淘


## vue 官方
```
# vue生态
vue 
https://cn.vuejs.org/v2/guide/
vue-router 
https://router.vuejs.org/zh-cn/
vuex 
https://vuex.vuejs.org/zh-cn/


饿了么，对vue的理解
https://zhuanlan.zhihu.com/ElemeFE?topic=Vue.js（vue的实用技巧）

滴滴公司，vue实践（团队成员分享对vue生态的理解）
https://github.com/DDFE/DDFE-blog

Vue相关开源项目库集合
https://github.com/opendigg/awesome-github-vue/blob/master/README.md

网易云信WEB端SDK，以VUE前端框架作为前端UI及缓存数据框架，进行开发的手机移动端适配DEMO
https://github.com/netease-im/NIM_Web_Demo_H5

模仿小米官网，入门vue，没用vue-router和vuex
https://github.com/wendaosanshou/mi-by-vue
```


## vue-cli img
###[img](https://www.cnblogs.com/xiaojingyuan/p/7080768.html)
```
assets 
<img src="../assets/a.png">相对路径，url-loader不处理

static
动态
<img v-for="item in imgarr" :src="item.img">
imgarr:[
  {img:"./static/a.png"} 绝对路径，url-loader不处理
]
imgarr:[
  {img:require("./static/a.png")} 绝对路径，url-loader处理
]
```

## vuex
```
Action 提交的是 mutation，而不是直接变更状态。

vue-devtools;
https://www.cnblogs.com/mmzuo-798/p/6928532.html
```

## vue-router
```
{
    path: '/personInfo',
    name: 'personInfo',
    meta: {
      title: '个人中心',
      requireAuth: true,
      keepAlive: true
    },
    component: personInfo
  },

```