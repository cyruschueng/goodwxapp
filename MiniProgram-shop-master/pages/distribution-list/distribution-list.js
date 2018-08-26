// pages/distribution-list/distribution-list.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_items: ['来自', '时间', '交易额', '佣金'],
    items:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }

    wx.request({
      url: web_url + '/app.php?c=Withdraw&act=commission',
      data: {
        userid: that.data.user_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          items: res.data
        })
      },
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