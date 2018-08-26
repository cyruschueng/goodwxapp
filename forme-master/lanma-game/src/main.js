import Vue from 'vue'
import vueRouter from 'vue-router'
import store from './store'

import App from './App'
import Index from './components/Index.vue'
import Startrule from './components/Startrule.vue'
import Photo from './components/Photo.vue'
import Game from './components/Game.vue'

import codoonBrige from './assets/scripts/codoon-native-bridge'
//codoonshare
var bridge = new codoonBrige();
var options = {
  shareImgUrl : "http://activity-codoon.b0.upaiyun.com/czech-republic/upload/share.jpg",
  shareLineLink : "https://www.codoon.com/activity/v1/czech-republic/share.html",
  shareDescContent :'好朋友，你还在苦等欧洲签证？我已经跑完了整个“捷克”赢得跑马护照，你也来试试！',
  shareCodoonLineLink : "https://www.codoon.com/activity/v1/czech-republic/index.html",
  shareTitle : '捷克酷跑之旅·释放跑能量！勇闯6关，赢取捷克跑马护照'
};
bridge.nativeTopButtonShare({
  sCodoonShareImgUrl : options.shareImgUrl,
  sCodoonShareLineLink : options.shareLineLink,
  sCodoonShareDescContent : options.shareDescContent,
  sCodoonShareCodoonLineLink : options.shareCodoonLineLink,
  sCodoonShareTitle : options.shareTitle,
  oCodoonShareDestination : {
    'codoonTimeline' : true,
    'codoonGroup' : false,
    'weixinToFriend' : true,
    'weixinToTimeline' : true,
    'sinaWeibo' : true,
    'tencentQQ' : true,
    'tencentQzone' : true
  }
});

Vue.use(vueRouter);


/**
 * 定义路由
 * */
const routes = [
  {path: '/', component: Index},//首页
  {path: '/startrule', component: Startrule},//游戏前提示规则
  {path: '/photo', component: Photo},//游戏前提示规则
  {path: '/game', component: Game},//游戏页
]
/**
 * 创建router实例
 * */
const router = new vueRouter({
  routes
})

/**
 * 创建和挂载根实例
 * */
const app = new Vue({
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')