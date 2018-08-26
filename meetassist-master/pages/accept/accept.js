// 该页面为从群组进入小程序时的第一个界面
var app = getApp()
var openGIdUrl = require('../../config').openGIdUrl
var openIdUrl = require('../../config').openIdUrl
var requestUrl = require('../../config').requestUrl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '2017-07-01',
    time: '00:00:00',
    location: '未显示',
    message: '未显示'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    if (app.globalData.mymeeting != null){
    var mymeeting = app.globalData.mymeeting;
    var location = null
    //判断地点是用户手动输入或是地图定位
    if(mymeeting.location.name == null){
      location = mymeeting.location
    }else{
      location = mymeeting.location.name
    }
    this.setData({
      openID: mymeeting.openID,
      date: mymeeting.date,
      time: mymeeting.time,
      location: location,
      message: mymeeting.message,
      remindtime: 0,
    })
    wx.hideLoading()
    wx.showToast({
      title: '显示完成',
      duration: 3000
    })
    }else{
      wx.hideLoading()
      wx.showToast({
        title: '请下拉刷新,若无效,请点击蓝色按钮',
      })
    }
  },

  //调用地图接口展示会面发起者所设定的地点
  showlocation: function(){
    var mymeeting = app.globalData.mymeeting;
    if (mymeeting.location.name == null) {
      wx.showToast({
        title: '该地点无法查看',
      })
    } else {
      wx.openLocation({
        latitude: mymeeting.location.lat,
        longitude: mymeeting.location.long,
        name: mymeeting.location.name,
        address: mymeeting.location.address,
        success: function(){
          console.log('success')
        },
        fail: function(){
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

  //接收按钮
  accept: function () {
    //判断是否正常读取数据
    if (this.data.location !== '未显示' && this.data.message !== '未显示') {
      var that = this
      //将会面信息加入该用户的数据库中
      wx.request({
        url: requestUrl,
        data: {
          openID: app.globalData.openID,
          date: that.data.date,
          time: that.data.time,
          location: that.data.location,
          message: that.data.message,
          remindtime: 0,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        },
      })
      wx.redirectTo({
        url: '../first/first',
      })
    } else {
      wx.showToast({
        title: '消息未显示，请重新加载',
      })
    }

  },

  //拒绝按钮，点击后对会面不作处理，直接转向到小程序首页
  reject: function () {
    wx.redirectTo({
      url: '../first/first',
    })
  },

  //下拉刷新数据
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this
    //判断转发标志，true代表通过群组进入小程序
    if (app.globalData.tag === true) {
      wx.request({
        url: openIdUrl,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          sessionKey: app.globalData.sessionKey,
          data: app.globalData.data,
          iv: app.globalData.iv,
          sharing: 'true'
        },
        success: function (res) {
          console.log(res)
          app.globalData.openGID = res.data.openGID
          wx.request({
            url: openGIdUrl,
            data: {
              openGID: res.data.openGID
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.message != 'zero') {
                var location = null
                if(res.data.location.name == null){
                  location = res.data.location
                }else{
                  location = res.data.location.name
                }
                that.setData({
                  date: res.data.date,
                  time: res.data.time,
                  location: location,
                  message: res.data.message
                })
              } else {
                console.log('GETopenGID:' + res.data.openGID)
              }
            },
            fail: function (res) {
              console.log(res)
            },
          })

          wx.hideLoading()
          wx.showToast({
            title: '加载完成',
            icon: 'success'
          })
          wx.stopPullDownRefresh()
        },
        fail: function (res) {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: '加载失败，下拉刷新可重新加载',
          })
          wx.stopPullDownRefresh()
        },
      })
    }
  }


})