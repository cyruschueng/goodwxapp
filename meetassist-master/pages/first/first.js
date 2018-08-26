// 小程序首页，用于显示用户当前的会面信息
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remindtime: 0,
    meetingnuminfo: '当前无会面',
    userInfo: null,
    meeting: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.setData({
      remindtime: app.globalData.remindtime,
      meetingnuminfo: '当前有' + app.globalData.meeting.length + '个会面',
      meeting: app.globalData.meeting
    })
  },

  //刷新按钮，点击刷新会面信息
  refresh: function () {
    var that=this
    var openIdUrl = require('../../config').openIdUrl
    wx.request({
      url: openIdUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: 'null',
        iv: 'null',
        sharing: 'refresh',
        openID: app.globalData.openID
      },
      success: function (res) {
        console.log(res)
        if (res.data.message == 'success') {
          app.globalData.meeting = []
        }
        else {
          app.globalData.meeting = res.data.meeting.sort(app.sortbydt)
        }
        that.onLoad()
      },
      fail: function (res) {
        console.log(res)
      },
    })
  },

  //点击某个会面，跳转到详细信息
  clickmeeting: function (event) {
    //存储点击的特定会面，方面查看时调用
    var mid = event.currentTarget.id
    wx.setStorageSync('mid', mid)
    wx.setStorageSync(mid, this.data.meeting[mid-1])
    app.globalData.remindtime = this.data.meeting[mid - 1].remindtime
    wx.navigateTo({
      url: '../detail/detail',
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
    this.setData({
      remindtime: app.globalData.remindtime
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

  },

  //跳转到发起会面页面
  make: function () {
    wx.redirectTo({
      url: '../makemeeting/makemeeting'
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在刷新',
      icon: 'loading'
    })
    
    var that = this
    var openIdUrl = require('../../config').openIdUrl
    wx.request({
      url: openIdUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        data: 'null',
        iv: 'null',
        sharing: 'refresh',
        openID: app.globalData.openID
      },
      success: function (res) {
        console.log(res)

        if (res.data.message == 'success') {
          app.globalData.meeting = []
        }
        else {
          app.globalData.meeting = res.data.meeting
        }

        that.onLoad()
        wx.stopPullDownRefresh()
        wx.hideToast()
      },
      fail: function (res) {
        console.log(res)
      },
    })


    
  }

})