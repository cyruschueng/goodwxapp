// pages/shopping/branch1/details/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: "files",
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data
        })
      }
    })
  },
})