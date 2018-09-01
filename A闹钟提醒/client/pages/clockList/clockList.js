// pages/clockList/clockList.js
var tools = require('../../utils/tools.js')
var config = require('../../config')
var enterType = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showData: [],
    showNoData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var that = this
    enterType = opt.enterType
    wx.setNavigationBarTitle({
      title: opt.enterType == 0 ? '我创建的闹钟' : '我收到的闹钟'
    })
    tools.request({
      url: opt.enterType == 0 ? config.service.clockSList : config.service.clockRList,
      success: function (res) {
        console.log(res)
        that.setData({
          showData: res.data,
          showNoData: res.data.length == 0
        })
      },
      fail: function (err) {
        
      }
    })
  },

  createClock: function () {
    wx.switchTab({
      url: '../qClock/qClock',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 进入闹钟详情
   */
  enter: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../detail/detail?clockID=' + id + '&enterType=' + enterType 
    })
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