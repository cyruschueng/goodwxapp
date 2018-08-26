// pages/user/cash-rule/index.js
import dg from '../../../../utils/dg.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      min_cash_withdrawal_money: 0, // 最小提现金额（满多少才能提现的值）
      customer_service_phone: '', // 客服电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置导航条颜色
    dg.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f35150',
      animation: {
        duration: 100,
        timingFunc: 'ease'
      }
    })
    this.setData({
        min_cash_withdrawal_money: options.min_cash_withdrawal_money || '“未设置”',
        customer_service_phone: options.customer_service_phone || '',
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
//   onShareAppMessage: function () {
  
//   },
})