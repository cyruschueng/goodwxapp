// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dan: [],
    duo: []
  },
  // 预览
  preview (e) {
    var id = e.target.dataset.id
    var type = e.target.dataset.type
    wx.navigateTo({
      url: '/pages/show/show?id=' + id + '&type=' + type
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
    var that = this
    wx.showToast({
      title: '数据读取中...',
      icon: 'loading',
      mask: true,
      duration: 5000
    })

    wx.getStorage({
      key: 'votes',
      success: function (res) {
        var data = JSON.parse(res.data)
        that.setData({
          dan: data.dan,
          duo: data.duo
        })
        wx.showToast({
          title: '数据读取成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '还没有数据哟！',
        })
      }
    })
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