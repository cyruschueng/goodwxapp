//index.js
//获取应用实例
var app = getApp()
App({
  onLaunch: function (ops) {
      console.log(ops.shareTicket)
      wx.getShareInfo({
        shareTicket: ops.shareTicket,
        complete(res) {
          console.log(res)
        }
      })
  }
})
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLaunch: function (ops) {
    
      console.log(ops.shareTicket)
      wx.getShareInfo({
        shareTicket: ops.shareTicket,
        complete(res) {
          console.log(res)
        }
      })
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
   
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    
  },
  onShareAppMessage() {
    return {
      title: '页面分享标题',
      path: '/pages/path/index/index',
      success(res) {
        console.log(res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
      }
    }
  }
})
