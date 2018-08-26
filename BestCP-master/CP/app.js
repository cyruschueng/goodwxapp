//app.js
App({
  onShow:function(ops){
    console.log("ops.scene = " + ops.scene);
    if ((ops.scene == 1044 || ops.scene == 1008) && ops.shareTicket) {
      console.log("onClickShare")
      var shareTicket = ops.shareTicket;
      console.log(ops)
      wx.getShareInfo({
        shareTicket: shareTicket,
        success: function (res) {
          var that = this;
          var encryptedData = res.encryptedData;
          console.log("encryptedData = " + encryptedData);
          var iv = res.iv;
          console.log("iv = " + iv);
          // 分享
          wx.request({
            url: 'https://api.gentleleetommy.cn/bestcp/groupClick',
            data: {
              wx_id: wx.getStorageSync('wx_id'),
              encryptedData: encryptedData,
              sessionKey: wx.getStorageSync('sessionKey'),
              iv: iv
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              wx.setStorageSync('group_id', res.data.group_id);
              console.log("groupClick = " + res.data.status);
              if (res.data.status == "success" || res.data.status == "insert")
                wx.redirectTo({
                  url: '../result/result',
                })
            }
          })
        }
      })
    }
    else if(ops.scene == 1007 || ops.scene == 1044){
      wx.request({
        url: 'https://api.gentleleetommy.cn/bestcp/testResult',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          wx_id: wx.getStorageSync("wx_id")
        },
        success: function (res) {
          if(res.data.rate){
            wx.redirectTo({
              url: '../rate/rate',
            })
          }
        }
      })
      
    }
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
              console.log("userinfo"+res.userInfo)
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
            console.log("wx_id" + res.data.openid)
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