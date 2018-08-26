//app.js
App({
  onLaunch: function () {
    console.log('/app/app/onLaunch/启动')
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

  getApis() {
    // getApp() 获取小程序实例，不能在该文件（app.js）中调用，该文件中直接使用 this 引用实例
  },

  getSceneValue() {
    // 场景值
    // https://www.w3cschool.cn/weixinapp/weixinapp-scene.html
  },

  onShow: function (path, query, scene, shareTicket, referrerInfo) {
    // path: 打开小程序的路径
    // query: 打开小程序的 query
    // scene: 打开小程序的场景值
    // shareTicket: 转发信息
    // referrerInfo: 当场景为由另一个小程序打开时，返回该字段
    // referrerInfo.appId: 来源小程序的 appId
    // referrerInfo.extraData: 来源小程序传过来的数据
    console.log('/app/app/onShow/显示事件')
  },

  onHide: function () {
    console.log('/app/app/onHide/隐藏事件')
  },

  onError: function () {
    console.log('/app/app/onError/发生错误事件')
  },
  globalData: {
    userInfo: null,
    author: 'lzc'
  }
})