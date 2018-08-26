//edit.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_gid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var group = wx.getStorageSync('selected_group')
    this.setData({
      open_gid: group.open_gid
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
    wx.stopPullDownRefresh()
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

  /**
   * 点击发布按钮，发布公告 
   */
  doSend: function(e) {
    var msg = ''
    if (e.detail.value.textarea) {
      var msg = e.detail.value.textarea
    }
    if (msg.length == 0) {
      return
    }
    var user = wx.getStorageSync('user_info')
    var group = wx.getStorageSync('selected_group')
    wx.request({
      url: util.POST_NOTE_URL,
      method: 'POST',
      data: {
        user_id: user.uid,
        group_id: group.group_id,
        message: msg
      },
      success: res => {
        wx.setStorageSync('edit_note', 1)
      },
      complete: res => {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})