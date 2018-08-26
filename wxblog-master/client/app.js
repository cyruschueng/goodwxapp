//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
const Towxml = require('/towxml/main');
App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    //创建一个towxml对象，供其它页面调用
    towxml: new Towxml(),
    //声明Markdown文件目录路径
    docDir: 'https://github.com/luciferlia/luciferlia.github.io/blob/master/_posts/',
    getText: (url, callback) => {
      wx.request({
        url: url,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          if (typeof callback === 'function') {
            callback(res);
          };
        }
      });
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
    }
})