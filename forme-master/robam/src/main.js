import Vue from 'vue'
import vueRouter from 'vue-router'
import store from './store'

import App from './App'
import Index from './components/Index.vue'
import Task from './components/Task.vue'
import Jiugongge from './components/Jiugongge.vue'

import codoonBrige from './assets/scripts/codoon-native-bridge'
//codoonshare
var bridge = new codoonBrige();
var options = {
  shareImgUrl : "http://activity-codoon.b0.upaiyun.com/robam/upload/share.png",
  shareLineLink : "https://www.codoon.com/activity/v1/robam/share.html",
  shareDescContent :'纵情跑，只为放肆吃！掌控身体，纵享美食！老板电器疯狂卡路里——趁现在，动起来！',
  shareCodoonLineLink : "https://www.codoon.com/activity/v1/robam/index.html",
  shareTitle : '老板电器618疯狂卡路里——趁现在，动起来！'
};
bridge.nativeTopButtonShare({
  sCodoonShareImgUrl : options.shareImgUrl,
  sCodoonShareLineLink : options.shareLineLink,
  sCodoonShareDescContent : options.shareDescContent,
  sCodoonShareCodoonLineLink : options.shareCodoonLineLink,
  sCodoonShareTitle : options.shareTitle,
  oCodoonShareDestination : {
    'codoonTimeline' : false,
    'codoonGroup' : false,
    'weixinToFriend' : true,
    'weixinToTimeline' : true,
    'sinaWeibo' : true,
    'tencentQQ' : false,
    'tencentQzone' : false
  }
});

Vue.use(vueRouter);

//2位小数
Vue.filter('fixNumber', function (value) {
  return parseInt(value*100)/100;
})

//年月日
Vue.filter('timePrase',function (value) {
  var timeArr=value.split('-');
  var month=parseInt(timeArr[1]);
  var Date=parseInt(timeArr[2]);
  return month+'月'+Date+'日';
})

/**
 * 定义路由
 * */
const routes = [
  {path: '/', component: Index},//首页
  {path: '/task', component: Task},//答题主页
  {path: '/jiugongge', component: Jiugongge},//九宫格
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