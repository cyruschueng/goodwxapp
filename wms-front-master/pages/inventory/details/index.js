// pages/inventory/details/index.js
import config from '../../../config'
import utils from '../../../utils/util'
import req from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    price: {},
    paymentType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let price = JSON.parse(options.price);
    this.setData({
      price: price
    });

    // 判断当前登录用户的支付方式。
    let user = wx.getStorageSync('user');
    if (user.paymentType != 'ONLINE') {
      this.setData({
        paymentType: 1
      });
    }
  },
  
  /**
   * 如果是线上支付，则进行下单并跳转到支付页面
   */
  payment: function(e) {

  },
  /**
   * 如果是线下，直接跳转到下单成功页面。
   */
  goList: function(e) {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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