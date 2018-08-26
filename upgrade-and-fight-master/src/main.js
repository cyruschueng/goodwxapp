import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/logs/main',    // _
      '^pages/index/main',  // 首页
      'pages/hourglass/main', // 限时闯关答题
      'pages/hourglass-subject/main',
      'pages/pk/main',
      'pages/wait/main',
      'pages/errorlog/main',    // 错题库
      'pages/pk-subject/main',
      'pages/finalexam/main',   // 终极考核室
      'pages/rank/main',  // 排行榜
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: '升级打怪',
      navigationBarTextStyle: '#fff',
    },
  },
};
