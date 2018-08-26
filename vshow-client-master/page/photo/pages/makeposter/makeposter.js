// pages/photo/page/makeposter/makeposter.js
const app = getApp();
Page({
  data: {
    txt: '公告： 即将上线图片分享，及制作海报一系列功能，这段时间会关闭所有入口，开发完成全面开放，敬请期待。。。'
  },
  onLoad(){
    let pages = getCurrentPages();
    let firstPage = pages[0];
    getCurrentPages()[0].data = {};
    console.log(firstPage);
  },
  test(){
    
  }
})