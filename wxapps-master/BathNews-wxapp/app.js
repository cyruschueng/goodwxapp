//app.js
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取scene和shareTicket
    console.log(options.scene + "&" + options.shareTicket);
    wx.getShareInfo({
      shareTicket: options.shareTicket[0],
      success(res) {
        res.errMsg; // 错误信息
        res.encryptedData;  //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
        res.iv; // 加密算法的初始向量
        console.log(res.encryptedData);
      },
      fail() {
        console.log("fail");
      },
      complete() { }
    });
    
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
