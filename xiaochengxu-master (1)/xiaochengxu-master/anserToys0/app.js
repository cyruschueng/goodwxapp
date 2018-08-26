//app.js
var app = getApp()
const userInfoUrl = require('config').config.userInfoUrl
const userOpenidUrl = require('config').config.userOpenidUrl
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //console.log(res)
        if (res.code) {
          var that = this
          //发起网络请求
          wx.request({
            url: userOpenidUrl,
            method: 'POST',
            data: {             
              code: res.code
            },
            success: function (res) {
              var openid = res.data.data.openid;
              getApp().globalData.openid = res.data.data.openid;
              getApp().globalData.session_key = res.data.data.session_key
              console.log(getApp().globalData.openid)
              console.log(res)
            },
          })
        }
        //console.log(res.code)
        wx.getUserInfo({
          success: res => {  
            console.log(res.encryptedData)
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            getApp().globalData.userInfo = res.userInfo;
            getApp().globalData.nickName = res.userInfo.nickName;
            getApp().globalData.avatarUrl = res.userInfo.avatarUrl;
            getApp().globalData.encryptedData = res.encryptedData;
            getApp().globalData.iv = res.iv;
            wx.request({
              url: userInfoUrl,
              method: 'POST',
              data: {
                openid: getApp().globalData.openid,
                username: getApp().globalData.nickName,
                pic: getApp().globalData.avatarUrl
              },
              success: function (res) {
                //console.log(res)
              },
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
  },
  globalData: {
    userInfo: null,
    openid:"",
    username:"",
    pic:""
  }
})