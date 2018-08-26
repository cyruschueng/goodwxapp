//app.js
App({
  globalData: {
    userInfo: null,
    openid: null
  },
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
  getOpenid: function (cb) {
    var that = this
    if (this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.openid)
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.getUserInfo({
            withCredentials: true,
            success: function (resu) {
              wx.request({
                url: "https://xcx.toupaiyule.com/wxlogin",
                data: {
                  code: res.code,
                  encryptedData: resu.encryptedData,
                  iv: resu.iv
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  that.globalData.openid = res.data.openid;
                  // return res.data.openid;
                  typeof cb == "function" && cb(that.globalData.openid)                  
                }
              })
            }
          })
        }
      });
    }
  },
  //页面事件
  onShareAppMessage: function () {
    return {
      title: '头牌娱乐小程序',
      path: '/pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        });
        // Get the share inticket
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          image: '../images/error.png',
          icon: 'success',
          duration: 2000
        });
      }
    }
  }
})