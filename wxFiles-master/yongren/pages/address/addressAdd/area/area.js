var em = require("../../../../utils/city.js")
Page({
  data: {
    list: [],
    province: '',
    city: '',
    area: ''
  },

  change: function (e) {
    var that = this
    if(this.data.province == ''){
      this.setData({ province: e.currentTarget.dataset.val,
        list: em.showCity(e.currentTarget.dataset.val) })
    } else if (this.data.city == ''){
      this.setData({
        city: e.currentTarget.dataset.val,
        list: em.showArea(that.data.province,e.currentTarget.dataset.val)
      })
    }else{
      wx.setStorageSync('dprovince', that.data.province)
      wx.setStorageSync('dcity', that.data.city)
      wx.setStorageSync('darea', e.currentTarget.dataset.val)
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad: function (options) {
    this.setData({
      list: em.showProvince()
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})