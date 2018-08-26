//app.js

App({
  data:{
    text:''
  },
  globalData: {
    url:""
  }, 
  
  onLaunch: function (ops) {
      if (ops.scene == 1044) {
        console.log("scene")
        console.log(ops.shareTicket)
      }
    wx.checkSession({

      success: function (e) {
        //session 未过期，并且在本生命周期一直有效
        console.log("登陆有效")
        console.log(e)
      },

      fail: function (e) {
        console.log("登陆失效")
        //登录态过期
       //重新登录
        wx.login({
          success: function (res) {
            console.log("登陆")
            console.log(res.code)
            var code = res.code;  //登录凭证
            if (code) {
              //2、调用获取用户信息接口
              wx.getUserInfo({
                success: function (res) {
                  console.log("微信")
                  console.log(res)
                  wx.setStorageSync("signature", res.signature)
                  console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                  //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?&js_code=' + code + '&grant_type=authorization_code',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                    success: function (data) {
                      console.log("data")
                      console.log(data)
                      //4.解密成功后 获取自己服务器返回的结果
                      if (data.data.status == 1) {
                        var userInfo_ = data.data.userInfo;
                        console.log(userInfo_)
                      } else {
                        console.log('解密失败')
                      }
                    },
                    fail: function () {
                      console.log('系统错误')
                    }
                  })
                },
                fail: function () {
                  console.log('获取用户信息失败')
                }
              })

            } else {
              console.log('获取用户登录态失败！' + r.errMsg)
            }
          },
          fail: function () {
            console.log('登陆失败')
          }
        })
      }
  })
  }  
})