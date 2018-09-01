// pages/feedback/feedback.js
var tools = require('../../utils/tools.js')
var config = require('../../config')
var util = require('../../utils/util.js')

var text = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  bindTextareaInput: function (e) {
    console.log(e.detail.value)
    text = e.detail.value
  },

  send: function (e) {
    tools.request({
      url: config.service.feedback,
      data: {
        text: text
      },
      method: 'POST',
      success: function (res) {
        util.showSuccess('反馈成功', () => {
          wx.navigateBack({
            
          })
        })
      },
      fail: function (err) {
        util.showError(err, () => {
          wx.navigateBack({

          })
        })
      }
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
  
  }
})