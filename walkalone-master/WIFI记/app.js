//app.js
function login(){
  // 登录
  wx.login({
    success: res => {
      var code = res.code
      wx.getUserInfo({
        'withCredentials': true,
        'success': function (info) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://sapi.51tui.vip/login/index',
            data: {
              'code': code,
              'rawData': info.rawData,
              'signature': info.signature,
              'encryptedData': info.encryptedData,
              'iv': info.iv
            },
            success: function (res) {
              //console.log(res)
              wx.setStorageSync('token', res.data.msg)
            }
          })
        }
      })

    }
  })
}

App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        //检测token是否存在
        var tokenInfo = wx.getStorageSync('token')
        var token = tokenInfo.data
        if(token == '' || token == null || token == undefined){
          login()
        }
      },
      fail: function () {
        //登录态过期
        // 登录
        login()
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
  globalData: {
    userInfo: null
  }
})