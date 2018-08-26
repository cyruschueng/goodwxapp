// pages/rule.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   ruleInfo:null,
   isshow:true
  },
  gotoIndex: function () {
    wx.redirectTo({
      url: "/pages/index/index"
    })
  },
  gotoRank: function () {
    wx.redirectTo({
      url: '../rank/rank'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      ruleInfo: app.globalData.scoreRule
    })
  }
})