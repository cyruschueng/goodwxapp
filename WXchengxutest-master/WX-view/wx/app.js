// var WXBizDataCrypt = require('./utils/WXBizDataCrypt')
//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //1.拉取用户信息 存储
          wx.getUserInfo({
            data: {
              withCredentials: true
            },
            success: function (datas) {
              var userInfo = datas.userInfo;
              // console.log(userInfo)
              var logincode = res.code    //code
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                url: 'https://xcx.aichukad.com/index.php/Home/User/getopenid',
                data: {
                  code: res.code,
                  appid: 'wx262195675d561b15',
                  secret: '8cab2a491d11301f5a2b355f2e9591a5',
                  encryptedData: datas.encryptedData,
                  iv: datas.iv,
                },
                method: 'POST',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  // 2.后台换取 openId, sessionKey 
                  // console.log(res.data)
                  userInfo.openid = res.data.openid;
                  userInfo.unionid = res.data.unionid;
                  // console.log(userInfo);
                  //3.存到本地
                  wx.setStorage({
                    key: 'u_Info',
                    data: userInfo,
                  });


                },
                fail: function (res) {
                }
              });
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})