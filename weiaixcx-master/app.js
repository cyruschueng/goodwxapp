//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
  },
  getUserInfo:function(cb){

  },
  globalData:{
    userInfo:null,
    wxUrl: 'https://huahui.qingyy.net/weilaihexun_wxapi_tp5/public/wx.php/',
    imgUrl: 'http://www.weilaihexun.com/',
  }
})