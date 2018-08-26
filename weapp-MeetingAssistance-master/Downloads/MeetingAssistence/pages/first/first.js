// pages/first/first.js
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
    // var that = this
    // wx.login({
    //   success: function (res) {
    //     console.log('login')
    //     // console.log(res)
    //     console.log('code:' + res.code)
    //     app.globalData.code = res.code
    //     console.log('globaldatacode:' + app.globalData.code)
    //     wx.request({
    //       url: openIdUrl + '?code=' + app.globalData.code,
    //       method: 'GET',
    //       success: function (res) {
    //         console.log(res)
    //         if (res.data.message == 'success') {
    //           that.setData({
    //             array: []
    //           })
    //         }
    //         else {
    //           var input = [];
    //           // input.push(res.data)
    //           console.log(res.data.meeting)
    //           for(var i=0;i<res.data.meeting.length;i++){
    //             input.push(res.data.meeting[i])
    //           }
    //           console.log(input)
    //           // var test = JSON.parse(res.data)
    //           that.setData({
    //             array: input,
    //             meetingnuminfo: '当前有' + res.data.meeting.length + '个会面',
    //             meeting: res.data.meeting
    //           })
    //         }
    //         app.globalData.openID = res.data.openID
    //         console.log(app.globalData.openID)
    //         console.log(res.data.openID)
    //       },
    //       fail: function (res) {
    //         console.log(res)
    //       },
    //     })


    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   },
    // })
    
    this.setData({
      remindtime: app.globalData.remindtime,
      meetingnuminfo: '当前有' + app.globalData.meeting.length + '个会面',
      meeting: app.globalData.meeting
    })
  },

  //跳转到设置提醒时间的页面
  refresh: function () {
    var that=this
    console.log('start')
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
    console.log(event.currentTarget.id)
    var mid = event.currentTarget.id
    wx.setStorageSync('mid', mid)
    wx.setStorageSync(mid, this.data.meeting[mid-1])
    console.log(this.data.meeting[mid-1])
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

  make: function () {
    wx.redirectTo({
      url: '../makemeeting/makemeeting'
    })
  },

  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在刷新',
      icon: 'loading'
    })
    
    var that = this
    console.log('start')
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