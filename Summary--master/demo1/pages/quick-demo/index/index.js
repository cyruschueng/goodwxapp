//index.js
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  getUserInfo(cb){
    let app = getApp();
    app.globalData = app.globalData || {}
    if(app.globalData.userInfo){
      typeof cb == "function" && cb(app.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(app.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //事件处理函数
  bindViewTap: ()=> {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let that = this
    //调用应用实例的方法获取全局数据
    this.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
