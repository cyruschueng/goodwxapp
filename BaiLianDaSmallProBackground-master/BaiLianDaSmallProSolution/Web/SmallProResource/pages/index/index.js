//index.js
//获取应用实例
const app = getApp()
const navgateUrl = '/pages/main/main'
Page({
  data: {
    motto: '授权后方可使用',
    intro:"因网络原因，可能稍有延迟，请耐心等待",
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function (options) {
    var pageObj = this;
    var myApp = app;
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: myApp.webUrl + "/api/Base",
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            myApp.globalData.openId = res.data.OpenId
            myApp.globalData.sessionKey = res.data.SessionKey
            wx.getSetting({
              success: res1 => {
                wx.getUserInfo({
                  success: res2 => {
                    myApp.updateUserInfo(myApp, res2.userInfo,function(){
                      myApp.globalData.userInfo = res2.userInfo
                      pageObj.setData({
                        userInfo: res2.userInfo,
                        hasUserInfo: true,
                        motto: "授权成功",
                        intro: ""
                      })
                      
                      if (myApp.waitShareInfoAES) {
                        myApp.waitShareInfoAES(myApp.globalData.sessionKey,function(){
                          if (options.returnUrl) {
                            var backUrl = decodeURIComponent(options.returnUrl)
                            wx.redirectTo({
                              url: backUrl
                            })
                          } else {
                            wx.redirectTo({
                              url: navgateUrl
                            })
                          }
                        })
                      }else{
                        if (options.returnUrl) {
                          var backUrl = decodeURIComponent(options.returnUrl)
                          wx.redirectTo({
                            url: backUrl
                          })
                        } else {
                          wx.redirectTo({
                            url: navgateUrl
                          })
                        }
                      }
                      
                    })
                  }, fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '若您不授权微信登陆，则无法使用该小程序的功能；点击重新获取授权，则可重新使用；若点击不授权，后期要使用，需在微信【发现】-【小程序】-删掉【百莲达美容美发会所】，重新搜索授权登陆，方可使用。',
                      confirmText: "授权",
                      cancelText: "不授权",
                      success: function (res) {
                        if (res.confirm) {
                          wx.openSetting({
                            success: function (res) {
                              console.log(res)
                              if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                                wx.redirectTo({
                                  url: "/pages/index/index"
                                })
                              }
                            }
                          })
                        } else if (res.cancel) {

                        }
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
})
