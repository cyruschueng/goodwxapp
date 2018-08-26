//app.js
import { wxappServer } from 'libs/config.js';
var mta = require('libs/mta_analysis.js');

App({
  onLaunch: function (res) {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //this.login();
    if (res.scene == 1044) {
      this.globalData.shareTicket = res.shareTicket;
    }
    mta.App.init({
      "appID": "500424789",
      "lauchOpts": res,
      "eventID": "500424796", // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
      "statPullDownFresh": true, // 使用分析-下来刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statShareApp": true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statReachBottom": true // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
    });
  },
  login: function (cb, scope) {
    var This = this;
    if (cb) {
      This.globalData.cb = cb;
    }
    if (This.globalData.sid) {
      typeof cb == "function" && cb.call(scope, This.globalData);
    }
    else {
      wx.login({
        success: function (res) {
          var code = res.code;
          if (code) {
            This.globalData.code = code;
            wx.getUserInfo({
              success: function (res) {
                This.globalData.userInfo = res.userInfo;
                var {encryptedData, iv, rawData, signature} = res;
                //typeof cb == "function" && cb(that.globalData.userInfo)
                console.log(res);
                wx.request({
                  url: wxappServer + 'littlewechat/login',
                  data: { code, encryptedData, iv, rawData, signature },
                  method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  }, // 设置请求的 header
                  success: function (res) {
                    if (res.data.suc === '200') {
                      This.globalData.userId = res.data.data.id;
                      This.globalData.sid = res.data.data.sid;
                      console.log(This.globalData);
                      if (!cb) {
                        cb = This.globalData.cb;
                      }
                      typeof cb == "function" && cb(This.globalData);
                      if (!cb) {   //用户取消授权后重新跳转
                        wx.redirectTo({
                          url: 'playIndex'
                        })
                      }
                    }
                    else {
                      wx.showToast({
                        title: '用户信息获取失败',
                        duration: 1000
                      });
                    }

                  },
                  fail: function () {
                  },
                  complete: function () {
                    // complete
                  }
                })
              },
              fail: function () {
                wx.showModal({
                  title: '警告',
                  cancelText: '不授权',
                  confirmText: '授权',
                  content: '若不授权微信登录，后期使用小程序，需要在微信[发现] -[小程序]-删除[问技＋]，重新搜索授权登录。',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (res) {
                          if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                            //这里是授权成功之后 填写你重新获取数据的js
                            //参考:
                            This.login();
                          }
                        }
                      })
                     }
                  }
                })
              }
            })
          }
        }
      })
    }

  },
  globalData: {
    userInfo: null,
    userId: null,
    sid: null,
    param: null,
    helpId: null,
    shareTicket: null,
    openGid: null,
    code: null,
    cb: null
  }
})