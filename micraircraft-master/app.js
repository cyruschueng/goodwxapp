//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function(options) {
      if (options.shareTickets) {
          // 获取转发详细信息
          var s = wx.getShareInfo({
              shareTicket: options.shareTickets[0],
              success(options) {
                  options.errMsg; // 错误信息
                  options.encryptedData;  //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                  options.iv; // 加密算法的初始向量
                  console.log("success");
                  console.log(options);
              },
              fail() { 
                  console.log("fail");
              },
              complete() { 
                  console.log("fail");
              }
          });
      }
      // console.log('s=>' + s)
      console.log('options=>')
      console.log(options)
      if (options.scene == 1044) {
          console.log('shareTicket=>')
          console.log(options.shareTicket)
      }
  },
  globalData: {
    userInfo: null
  }
})