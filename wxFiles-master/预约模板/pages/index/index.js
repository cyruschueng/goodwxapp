//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls:[
      '/img/bg2.png', '/img/bg.png','/img/bg.png'
    ],
    height:''
  },
  navToSubscribe(){
    var that = this;
    wx.navigateTo({
      url: '/pages/subscribe/subscribe',
    })
  },
  navToMenu(){
    var that = this;
    wx.navigateTo({
      url: '/pages/menu/menu',
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height:res.windowWidth
        })
      },
    })
  },
  
})
