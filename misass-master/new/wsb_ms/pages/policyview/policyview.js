// pages/previewPolicy/previewPolicy.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sa:'555'
  },
  //众安收银台
  ZApay: function () {
    console.log('众安收银台');
    wx.navigateTo({
      url: '../zapay/zapay',
    })
  },

  //保存为代付款
  savePay: function () {
    console.log('保存为代付款');
    wx.switchTab({
      url: '../list/list',
    })
  },

  //返回修改保单
  backPay: function () {
    wx.navigateBack({
    
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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