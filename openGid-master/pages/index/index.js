//index.js
//获取应用实例
var app = getApp()
var mydata = app.globalData

Page({


  data: {
    
    weburl: ''
  },
 
  onLoad() {
   
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
  },
  onReady(){
    this.setData({
      weburl: 'https://www.wishstart.com/xiaochengxu/index.html?code=' + getApp().globalData.code + "&iv=" + getApp().globalData.code + "&encryptedData=" + getApp().globalData.encryptedData
    })
  },
  onShareAppMessage: function (options) {
    console.log(options.webViewUrl)
    console.log(getApp().globalData.iv)
    console.log(app.weburl)
    
    

    return {
      title: '谁是第一',
      path: '/pages/index/index',
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
