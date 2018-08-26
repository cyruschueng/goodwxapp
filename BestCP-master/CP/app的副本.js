//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync('iv', res.iv)
              wx.setStorageSync('mynickName', res.userInfo.nickName)
              wx.setStorageSync('myavatarUrl', res.userInfo.avatarUrl)
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

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.request({
          url: 'https://api.gentleleetommy.cn/bestcp/onLogin',
          data:{
            code:code,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method:'POST',
          success: function (res) {
            console.log(res.data.session_key)
            wx.setStorageSync('wx_id', res.data.openid);
            wx.setStorageSync('sessionKey', res.data.session_key);
          }
        })
      }
    })
    
  },
  globalData: {
    userInfo: null
  },
  // onShareAppMessage: function (res) {
  //   // if (res.from === 'button') {
  //   //   // 来自页面内转发按钮
  //   //   console.log(res.target)
  //   // }
  //   return {
  //     title: 'sss',
  //     path: '/pages/index/index',
  //     imageUrl: 'http://bellazhang.cn/PNG/main.png',
  //     success: function (res) {
  //       // 转发成功
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     }
  //   }
  // },
  
})