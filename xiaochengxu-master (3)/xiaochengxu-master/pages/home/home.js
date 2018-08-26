//index.js
//获取应用实例
var app = getApp();
var mydata = app.globalData;
var thiz = this;

Page({
  data: {
    weburl: ''
  },


  onShow(ops) {
   wx.showShareMenu({
      withShareTicket: true
    })
    console.log('onShow')
    
 
    console.log('onReady')
    console.log(mydata)

    let weburl=  'https://lyqpgm.wishstart.com.cn/bflyhdapp/game.html?v=' + Math.random() + '&key1=' + mydata.code + "&key2=" + encodeURIComponent(mydata.iv) + "&key3=" + encodeURIComponent(mydata.encryptedData);

    console.log(weburl);
    
    this.setData({
      'weburl': weburl
    })    
  
    console.log(this.data)
  },
  onShareAppMessage: function (options) {
 
    console.log(this.data)
    console.log(options.webViewUrl)
    //console.log(getApp().globalData.iv)
    return {
      title: '本群排行榜在此，第一竟然是？',
      path: '/pages/index/index',
      imageUrl:'http://lyqpgm.oss-cn-beijing.aliyuncs.com/bflyhdapp/main.jpg',
      success(res) {
        var shareTicket = res.shareTickets[0] // 获取 shareTicket
        // console.log(shareTicket) // 你可以选择将这段代码取消注释，让 shareTicket 在控制台输出
        wx.getShareInfo({
          shareTicket: shareTicket,
          success(res) {
            console.log('分享成功') // 输出加密后的 openGId 信息
            
          }
        })
      }
    }
  }
})
