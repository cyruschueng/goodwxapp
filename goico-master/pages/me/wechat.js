// pages/me/wechat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  copyWX: function () {
    let info = 'wx_mytoken'
    wx.showModal({
      title: '复制微信',
      content: '小程序内无法识别二维码，您可以复制微信号后搜索添加',
      confirmText: '现在复制',
      confirmColor: '#2196F3',
      cancelColor: '#888',
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: info,
            success: function (res) {
              
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})