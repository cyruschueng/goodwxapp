// pages/message/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      msg: options.name
    });
  },

  /**
   * 返回前一页面
   */
  onBack: function () {
    var self = this;
    var pages = getCurrentPages();
    wx.navigateBack({ changed: true });
  }
})