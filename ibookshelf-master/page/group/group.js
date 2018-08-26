// page/group/group.js
const config = require('../../config')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
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

  },
  onShareAppMessage() {
    return {
      title: '页面分享标题',
      path: '/page/group/group',
      success(res) {
        // 获取转发详细信息
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success(res) {
            wx.request({
              url: config.decryptUrl,
              data: {
                openid: app.globalData.openid,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              method: 'POST',
              success: function (res) {
                console.log(res.data)
              }
            })
          }
        })
      }
    }
  }

})