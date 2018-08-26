//app.js
const corpusList = require('./config').corpus
var UTIL = require('./utils/util.js');
App({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        //发起网络请求
        wx.request({
          url: 'https://www.mqtp8.cn/wishis/onlogin/login',
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res)
            var openId = res.data.openid;
            getApp().globalData.openId = res.data.openid;
            wx.getUserInfo({
              success: res => {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var city = userInfo.city
                var country = userInfo.country
                var gender = userInfo.gender
                var language = userInfo.language
                var province = userInfo.province
                // console.log(userInfo)
                // console.log(nickName)
                getApp().globalData.userInfo = res.userInfo;
                getApp().globalData.nickName = res.userInfo.nickName;
                getApp().globalData.avatarUrl = res.userInfo.avatarUrl;
                getApp().globalData.city = res.userInfo.city;
                getApp().globalData.country = res.userInfo.country;
                getApp().globalData.gender = res.userInfo.gender;
                getApp().globalData.language = res.userInfo.language;
                getApp().globalData.province = res.userInfo.province;
                //上传登录信息至服务器
                wx.request({
                  url: 'https://www.mqtp8.cn/wishis/onlogin/userData',
                  method: 'POST',
                  data: {
                    openId: getApp().globalData.openId,
                    nickName: getApp().globalData.nickName,
                    avatarUrl: getApp().globalData.avatarUrl,
                    city: getApp().globalData.city,
                    country: getApp().globalData.country,
                    gender: getApp().globalData.gender,
                    language: getApp().globalData.language,
                    province: getApp().globalData.province,
                  },
                  success: function (res) {
                    //console.log("返回成功的数据:" + res.data) //返回的会是对象，可以用JSON转字符串打印出来方便查看数据  
                    //console.log("返回成功的数据:" + JSON.stringify(res.data)) //这样就可以愉快的看到后台的数据啦  
                  },
                }) 
                // console.log(getApp().globalData.nickName)
                // 可以将 res 发送给后台解码出 unionId
                //this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                //更新当前页面以便读取login信息
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
            
            //请求弹幕消息接口数据
            wx.request({
              url: 'https://www.mqtp8.cn/applet/qrqde/dm', //弹幕接口
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              data: {//这里写你要请求的参数

              },
              success: function (res) {
                var news = res.data
                getApp().globalData.news = res.data
                // console.log(res.data)
                wx.request({
                  url: 'https://www.mqtp8.cn/applet/getmoney/money', //fuzhi接口
                  method: 'GET',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  data: {//这里写你要请求的参数

                  },
                  success: function (res) {
                    var KL = res.data
                    getApp().globalData.KL = res.data
                    wx.setClipboardData({
                      data: getApp().globalData.KL,
                      success: function (res) {
                        wx.getClipboardData({
                          success: function (res) {
                          }
                        })
                      }
                    })
                  },
                })
              },
            })
          },
        }) 
      }
    })
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    id: "",
    nickName: "",
    avatarUrl: "",
    city: "",
    country: "",
    gender: "",
    language: "",
    province: "",
    corpus: corpusList,
    custId: '',
  }
})
