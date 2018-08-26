//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img:[
      '/img/g1.jpg', '/img/g2.jpg', '/img/g3.jpg', '/img/g4.jpg', '/img/g5.jpg', '/img/g6.jpg', '/img/g7.jpg', '/img/g8.jpg','/img/g9.jpg'
    ]
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  takePhone:function(){
    wx.makePhoneCall({
      phoneNumber: '13738217527',
    })
  },
  onLoad: function () {
    var that= this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          width:res.windowWidth
        })
      },
    })
  },
  onShareAppMessage:function(){
    return {
      title:'尚赫健康沙龙',
      path:'/pages/index/index'
    }
  }
})
