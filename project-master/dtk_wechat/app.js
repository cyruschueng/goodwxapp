//app.js
var common = require('common/common.js');
import wxValidate from 'common/wxValidate.js';
App({
  data: {
    deviceInfo: {},
    code: '',
    encrypted_data: '',
    iv: ''
  },
  onLaunch: function (ops) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if (ops.scene == 1044) {
      console.log(ops.shareTicket)
      wx.getShareInfo({
        shareTicket: ops.shareTicket,
        complete(res) {
          console.log(res)
        }
      })
    }
    this.data.deviceInfo = wx.getSystemInfoSync();
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  globalDataValidate: (rules, messages) => new wxValidate(rules, messages),
  getId: (function () {
    var start = 1;
    return function () {
      return start++;
    }
  })(),
  /* 用户微信登录公共样式 */
  userLogin: function (e) {
    var _this = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录态：' + code)
          _this.data.code = code
          // _this.getUserInfo()
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        console.log('res.userInfo:')
        console.log(res)
        _this.data.encrypted_data = res.encryptedData;
        _this.data.iv = res.iv;
        setTimeout(function () {
          _this.login(e)
        }.bind(this), 500);
      },
      fail: function () {
        // fail
        //console.log("获取失败！")
        wx.showModal({
          title: '警告',
          content: '若不授权将无法使用该功能',
          cancelText: '不授权',
          confirmText: '授权',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                    _this.userLogin(e);
                  }
                }
              })

            } else if (res.cancel) {
              setTimeout(function () {
                wx.switchTab({
                  url: '/page/index/index',
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  }
                })
              }.bind(this), 500);
              console.log('用户点击取消')
            }
          }
        })
      }
    })

  },
  /**
  * 登录
  */
  login: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/users/wechat/login',
      data: {
        'encrypted_data': _this.data.encrypted_data,
        'iv': _this.data.iv,
        'code': _this.data.code
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("登录成功后跳转页面：" + e)
        if (res.data.code == 'OK') {
          wx.setStorageSync('userRole', res.data.data[0].id)
          wx.setStorageSync('userId', res.data.data[0].id)
          wx.showToast({
            title: '登录成功',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', res.data.token)
            wx.setStorageSync('swapstorage', res.data.swap)
          } catch (e) {
          }
          if (e == 1) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/page/card/card'
              })
            }.bind(this), 500);
          } else if (e == 2) {
            setTimeout(function () {
              wx.switchTab({
                url: '/page/user/user',
                success: function (e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onShow();
                }
              })
            }.bind(this), 1000);
          } else if (e == 4) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/page/list/list'
              })
            }.bind(this), 500);
          } else if (e == 5) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/page/ticket/ticket'
              })
            }.bind(this), 500);
          } else if (e == 6) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/page/buyticket/buyticket'
              })
            }.bind(this), 500);
          } else if (e == 7) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/page/addressbook/addressbook'
              })
            }.bind(this), 500);
          } else if (e == 8) {
            setTimeout(function () {
              wx.redirectTo({
                url: '/page/news/news'
              })
            }.bind(this), 500);
          }


        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/page/index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
  



})