//index.js
//获取应用实例
var app = getApp()
Page({
  data: {},
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'Vainglory 虚荣数据库',
      path: '/pages/index/database/database',
      success(res) {
        var shareTicket = res.shareTickets[0] // 获取 shareTicket
        // console.log(shareTicket) // 你可以选择将这段代码取消注释，让 shareTicket 在控制台输出
        wx.getShareInfo({
          shareTicket: shareTicket,
          complete(res) {
            console.log(res) // 输出加密后的 openGId 信息
          }
        })
      }
    }
  }
})
