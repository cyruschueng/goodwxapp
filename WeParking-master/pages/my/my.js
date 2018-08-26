// my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.canIUse('getSystemInfoSync.return.SDKVersion')) {
      //获得微信版本信息,检测兼容性
      var res = wx.getSystemInfoSync()
      var sdk = parseInt(res.SDKVersion.replace(/\./g, ''))
      if (sdk < 125) {
        wx.showModal({
          title: '提示',
          content: '您的微信版本偏低,建议您升级您的微信,以体验闪泊停车的完整服务',
          showCancel: false,
          confirmColor: '#f4c600',
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '您的微信版本偏低,建议您升级您的微信,以体验闪泊停车的完整服务',
        showCancel: false,
        confirmColor: '#f4c600',
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    }
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      app.updateUserInfo(userInfo)
    })
  },

  onShow: function () {
    if (app.globalData.useStatus!=0){
      wx.showLoading({
        title: '加载中..',
      })
    }
  },

  getMyOrder:function(){
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },

  getAbountUS:function(){
    wx.navigateTo({
      url: '/pages/webView/webView?contentType=2',
    })
  },

  getMyBalance:function(){
    wx.navigateTo({
      url: '/pages/balance/balance',
    })
  },
  getServiceInfo:function(){
    wx.navigateTo({
      url: '/pages/serviceInfo/serviceInfo',
    })
  }
})