// 会面信息的详情页
var app = getApp()
// 提交formId的请求地址
var formIdUrl = require('../../config').formIdUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2017-01-01',
    time: '00:00:00',
    location: '北京',
    message: '上课',
    remindtime: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存中取出用户点击的那条会面信息
    var mid = wx.getStorageSync('mid')
    var meeting = wx.getStorageSync(mid)
    var location = null
    //判断地点的类型
    if (meeting.location.name == null) {
      location = meeting.location
    } else {
      location = meeting.location.name
    }
    this.setData({
      date: meeting.date,
      time: meeting.time,
      location: location,
      message: meeting.message,
      remindtime: meeting.remindTime
    })
  },

  //设置提醒时间的函数
  setremind: function () {
    app.globalData.isChange = true
    wx.navigateTo({
      url: '../remindtime/remindtime',
      fail: function (e) {
        console.log(e)
        console.log(getCurrentPages())
      }
    })
  },

  //表单提交函数，用于获取formId以完成提醒用户的功能
  formsubmit: function (event) {
    var mid = wx.getStorageSync('mid')
    var meeting = wx.getStorageSync(mid)
    //上传formId到服务器进行存储
    wx.request({
      url: formIdUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openID: app.globalData.openID,
        meetingID: meeting.id,
        remindtime: this.data.remindtime,
        formID: event.detail.formId
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.navigateBack({
    })
  },

  //调用地图接口展示地点位置
  showlocation: function () {
    var mid = wx.getStorageSync('mid')
    var meeting = wx.getStorageSync(mid)
    if (meeting.location.name == null) {
      wx.showToast({
        title: '该会面无法查看地点',
      })
    } else {
      wx.openLocation({
        latitude: meeting.location.lat,
        longitude: meeting.location.long,
        name: meeting.location.name,
        address: meeting.location.address,
        success: function () {
          console.log('success')
        },
        fail: function () {
          console.log('fail')
        }
      })
    }
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
    if (app.globalData.isChange) {
      this.setData({
        remindtime: app.globalData.remindtime
      })
    }
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