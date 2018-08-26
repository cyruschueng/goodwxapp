// pages/search/search.js
var tunji = require('../../utils/tunji.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: wx.getStorageSync('background'),
    backgroundColor: wx.getStorageSync('bgColor'),
    border: wx.getStorageSync('border')
  },

  /**
   * 生命周期函数--监听页面加载tunji
   */
  onLoad: function (options) {
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('bgColor'),
    })
  },
  onShow: function () {
    let that = this;
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('bgColor'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      sex: wx.getStorageSync('sex'),//"sex":1,//1 男 2女
    })
  },

})