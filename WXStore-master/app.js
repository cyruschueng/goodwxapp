//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    const serverHost = this.globalData.serverHost;
    // 登录
    let code = null;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if (res.code) {
          code = res.code;
        } else {
          console.log('登录失败！' + res.errMsg)
        }
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
              wx.request({
                url: serverHost + 'person/login',
                method: "POST",
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                data: {
                  code: code || "",
                  userInfo: JSON.stringify(res)
                },
                fail: e => {
                  console.log(e);
                },
                success: res => {
                  console.log('login' + JSON.stringify(res));
                  this.globalData.userid = res.data;
                  wx.setStorage({ key: 'userid', data: res.data })
                }
              })
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
  globalData: {
    userid: '',
    userInfo: null,
    userAddress: null,
    serverHost: "http://vadonmo.com:8080/store/"
  }
})