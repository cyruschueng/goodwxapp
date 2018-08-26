// pages/personal/check/index.js
const app = getApp()
var config = require('../../../config.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipRecordDetails: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '货物详情' });
    var shipRecordDetails = JSON.parse(options.shipRecordDetails);
    this.setData({
      shipRecordDetails: shipRecordDetails
    });
  }

})