var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipInfo: null
  },
  navToPaylog: function () {
    wx.navigateTo({
      url: '/pages/vip/paylog/paylog',
    })
  },
  navToReset: function () {
    wx.navigateTo({
      url: '/pages/vip/reset/reset',
    })
  },
  navToIntShop: function () {
    wx.navigateTo({
      url: '/pages/intshop/intshop',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.wxRequest('uservip/wx/vipmsg.do', { userid: wx.getStorageSync("openid"), phone: wx.getStorageSync("phone") },
      function (res) {
        var msg = JSON.parse(res.body);
        msg.realquota = msg.realquota.toFixed(2)
        that.setData({
          vipInfo : msg
        })
      })
  },
  navToRecharge: function () {
    wx.redirectTo({
      url: '/pages/recharge/recharge',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    app.wxRequest('uservip/wx/vipmsg.do', { userid: wx.getStorageSync("openid"), phone: wx.getStorageSync("phone") },
      function (res) {
        that.setData({
          vipInfo: JSON.parse(res.body)
        })
      });
  },


})