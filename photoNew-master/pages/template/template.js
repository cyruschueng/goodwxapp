const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js';
Page({
  data:{
    itemBar:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  navUrl(e){
    console.log(e);
    console.log(e.currentTarget.dataset.itembar);
    if(e.currentTarget.dataset.itembar == 2) {
      console.log(111);
      this.setData({
        itemBar: 2
      })
    } else {
      console.log(222);
      wx.reLaunch({
        url: e.currentTarget.dataset.url,
      })
    }
  }

})
// module.exports.navUrl = navUrl;
