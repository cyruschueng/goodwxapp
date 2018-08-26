// pages/home/home.js
var app = getApp()
var mydata = app.globalData
var thiz = this
Page({


    onShow(){
      console.log('index')
      wx.showShareMenu({
        withShareTicket: true
      })
 
 
    },
      onShareAppMessage: function (options) {
      console.log(this.data)
      console.log(options.webViewUrl)
      //console.log(getApp().globalData.iv)
      return {
        title: '本群排行榜在此，第一竟然是？',
        path: '/pages/index/index',
        success(res) {
          var shareTicket = res.shareTickets[0] // 获取 shareTicket
          // console.log(shareTicket) // 你可以选择将这段代码取消注释，让 shareTicket 在控制台输出
          wx.getShareInfo({
            shareTicket: shareTicket,
            success(res) {
              //console.log(res) // 输出加密后的 openGId 信息
         
             
            }
          })
        }
      }
    }
    
})
