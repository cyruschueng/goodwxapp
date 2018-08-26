// pages/star/star.js
var common = require('../../common.js');
var app = getApp();
modules: [];//模板
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad: function (options) {
    //回调
    var that = this;
    common.getSign(function () {
      let sign = wx.getStorageSync('sign');
      that.setData({
        sign: sign
      })
    })
    setTimeout(function () {
        wx.navigateTo({
          url: '../index/index',
        })
    }, 2500)
  }


  


})