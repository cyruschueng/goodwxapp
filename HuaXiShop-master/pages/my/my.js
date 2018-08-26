// pages/my/my.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    GuestUserData: null,//用户信息
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    var that = this
    if (app.globalData.GuestUserData) {
      that.setData({
        GuestUserData: app.globalData.GuestUserData,
        userInfo: app.globalData.userInfo
      })
    } else {
      app.appCallback = res => {//用户信息返回后调用
        that.setData({
          GuestUserData: res.data,
          userInfo: app.globalData.userInfo
        });
      }
    }
  },

  
})