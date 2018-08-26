//app.js
// 引入req 并挂载
import req from 'lib/request.js'
App({
  onLaunch: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
    })
    if (options.shareTicket){
      wx.setStorage({
        key: 'shareTicket',
        data: options.shareTicket,
      })
    }
    // console.log(options)
  },
  onShow: function (options){
    wx.showShareMenu({
      withShareTicket: true,
    });
    if (options.shareTicket) {
      wx.setStorage({
        key: 'shareTicket',
        data: options.shareTicket,
      })
    }
    // console.log(options)
  },
  req:req
})