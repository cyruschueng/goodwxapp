//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    arr:[{name:"李飞"},{name:"李飞1"},{name:"李飞2"},{name:"李飞4"},]
  },
  //事件处理函数
   toQunYou:function(event){
     wx.navigateTo({
      url: '../qunyou/qy'
     })
   },
   onShareAppMessage: function (res) {
    return {
      title: '我来看看',
      path: 'pages/index/index',
      success: function(res) {
        var shareTickets = res.shareTickets; 
        wx.getShareInfo({
           shareTicket: shareTickets,
           success: function (res) {
             console.log(res.encryptedData)
             wx.request({
               url: 'https://m.app.shangquanpai.com/decode',
               data: {
                 encryptedData:res.encryptedData,
                 iv: res.iv,
                 sessionKey: wx.getStorageSync('session_key')
               },
               method: 'POST',
               header: {
                 'content-type': 'application/json' // 默认值
               },
               success: function (res) {
                 console.log(res);
               }
             }) 
           },
         fail: function (res) {  
         }  
        })
      },
      fail: function(res) {
       
      }
    }
  },

  onLoad: function () { 
     wx.showShareMenu({  
        withShareTicket: true  
     });  
     
  }
})
