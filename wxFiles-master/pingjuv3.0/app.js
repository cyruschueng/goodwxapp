//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          wx.request({
            url: that.api + 'login',
            data: {
              code: res.code
            },
            method: 'post',
            header: {
              "Content-Type": "application/json"
            },
            success: function (res) {
              console.log("login")
              if (res.data.code == 1) {
                wx.setStorageSync('code', res.data.code);
                wx.setStorageSync('openid', res.data.data.openid);
                wx.setStorageSync('session_key', res.data.data.session_key);
                if (!res.data.data.uid) {
                  wx.getUserInfo({
                    success: function (res) {
                      console.log("微信")
                      console.log(res)
                      wx.request({
                        url: that.api + 'wxuser',
                        data: {
                          avatarUrl: res.userInfo.avatarUrl,
                          openid: wx.getStorageSync('openid'),
                          nickName: res.userInfo.nickName,
                          sex: 1,
                          marital :'保密',
                          age:'18-23岁',
                          constellation:'双鱼座',
                          province: res.userInfo.province,
                          city: res.userInfo.city,
                          country: res.userInfo.country,
                        },
                        method: 'post',
                        header: {
                          "Content-Type": "application/json"
                        },
                        success: function (res) {
                          console.log("注册")
                          console.log(res)
                        },
                        fail: function (res) {
                          wx.showToast({
                            title: '注册请求失败',
                            icon: 'loading',
                            duration: 2000
                          })
                        }
                      })
                    },
                    fail: function (res) {
                      wx.showToast({
                        title: '记得完善信息哦',
                        icon: 'loading',
                        image: '/img/60.png',
                        duration: 2000
                      })
                    },
                    complete: function (res) {
                    }
                  })
                } else {
                  console.log(res.data.data.userInfo)
                  res.data.data.userInfo.avatar = res.data.data.userInfo.avatar.replace('\\','');
                  res.data.data.userInfo.avatar = res.data.data.userInfo.avatar.replace('\\','');
                  res.data.data.userInfo.avatar = res.data.data.userInfo.avatar.replace('\\','');
                  res.data.data.userInfo.avatar = res.data.data.userInfo.avatar.replace('\\','');
                  res.data.data.userInfo.avatar = res.data.data.userInfo.avatar.replace('\\','');
                  wx.setStorageSync('userInfo', res.data.data.userInfo);
                }
              } else {

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
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络异常',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  api: 'https://dateapp.superprism.cn/index.php/apiv1/',
  globalData: {
    userInfo: null,
  }
})