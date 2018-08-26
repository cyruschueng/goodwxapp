App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getDefAddress: function (that) {
    var th = this
    wx.request({
      url: th.globalData.api + 'getDefAddress.do?uid='+wx.getStorageSync("userInfo").data.id,
      header: {
        'content-type': 'application/json'
      },
      method: 'get',
      success: function(res) {
        console.log(res)
        that.setData({
          defAddress:res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getUserInfo: function (cb) {
    var that = this
    wx.login({
      success: function (res) {
        console.log(res)
        wx.request({
          url: that.globalData.api + 'login.do',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'get',
          success: function (res) {
            var list = res.data
            if (list[0] == -1) {
              wx.getUserInfo({
                success: function (res) {
                  wx.request({
                    url: that.globalData.api + 'register.do',
                    data: {
                      openid: list[1],
                      sessionkey: list[2],
                      nickname: res.userInfo.nickName,
                      gender: res.userInfo.gender,
                      avatar: res.userInfo.avatarUrl
                    },
                    method: 'get',
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      wx.setStorageSync('userInfo', res)
                    },
                    fail: function (res) {
                    },
                    complete: function (res) {
                    }
                  })
                }
              })
            } else {
              wx.setStorageSync('userInfo', res)
              that.globalData.userInfo = res
              console.log(res)
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '服务器请求失败',
              icon: 'loading',
              duration: 2000
            })
          },
          complete: function (res) {
          }
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  globalData: {
    userInfo: null,
    api: 'http://localhost:8080/yongren/',
    goodsCover: 'http://localhost:8080/yongren/upload/goods/'
  }
})