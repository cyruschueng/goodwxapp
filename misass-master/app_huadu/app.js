//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  globalData: {
    code: null, 
    wecha_id: null,          //用户唯一识别id
    status: null,             //用户身份，0为用户，1为企业
    headImg: null,             //用户头像
    wecha_name: null,         //微信昵称
    userInfo: null,
    longitude: null,
    latitude: null,
    phone: null,
  }
})