//获取应用实例
var app = getApp()
const rankUrl = require('../../config').config.rankUrl;
const formIdUrl = require('../../config').config.formIdUrl;
const appidUrl = require('../../config').config.appidUrl;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  more_play: function (e) {
    var appid = e.currentTarget.dataset.appid;
    console.log(appid)
    wx.navigateToMiniProgram({
      appId: appid,
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        //console.log("ok")
      }
    })
  },
  onLoad: function () {
    var that =this
    wx.request({
      url: rankUrl,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          imgUrl:res.data.data.pic,
          rank: res.data.data.rank,
          num: res.data.data.num,
          successnum: res.data.data.successnum
        })
      }
    })

    wx.request({
      url: appidUrl,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
      },
      success: function (res) {
        //console.log(res)
        that.setData({
          items: res.data.data
        })
      }
    })
  },
})
