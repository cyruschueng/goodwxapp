// pages/user/user.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    my:{},
    all:{
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    let openid = wx.getStorageSync('openid');
    util.requestGet(`main/getUserCoinInfo/${openid}`,function(response){
       let userInfo = response.details;
       userInfo.gainPercent = parseFloat(userInfo.gain / userInfo.total*100).toFixed(2)+'%';
       userInfo.lossPercent = parseFloat(userInfo.loss / userInfo.total * 100).toFixed(2) + '%';
       that.setData({
         my:userInfo
       })
    });
    util.requestGet(`main/getAllCoinInfo`, function (response) {
      let allInfo = response.details;
      allInfo.gainPercent = parseFloat(allInfo.gain / allInfo.total * 100).toFixed(2) + '%';
      allInfo.lossPercent = parseFloat(allInfo.loss / allInfo.total * 100).toFixed(2) + '%';
      that.setData({
        all: allInfo
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})