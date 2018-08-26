//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    srcString: 'https://api.meiquanhui.com/manage/testH5/myChatTest.html'
  },
  onLoad: function () {
    // this.setData({
    //   srcString: this.data.srcString + '?index=1'
    // })
  },

  onShareAppMessage(options) {
    console.log(options.webViewUrl)//使用webview时才有值
    return {
      title: '分享',
      path: options.webViewUrl,
      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
   
  }
})
