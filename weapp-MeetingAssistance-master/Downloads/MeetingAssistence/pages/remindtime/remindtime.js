// pages/remindtime/remindtime.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status1: false,
    status2: false,
    status3: false,
    status4: false,
    status5: false,
    status6: false,
    status7: false
  },

  change: function(event){
    console.log(event)
    if (event.currentTarget.id=='noremind'&&event.detail.value==true)
    {
      app.globalData.remindtime = 0
      this.setData({
        status4: false,
        status2: false,
        status3: false,
        status5: false,
        status6: false,
        status7: false
      })
    }else
    if (event.currentTarget.id == 'fivem' && event.detail.value == true)   {
      app.globalData.remindtime = 5
      this.setData({
        status1: false,
        status4: false,
        status3: false,
        status5: false,
        status6: false,
        status7: false
      })
    }else
    if (event.currentTarget.id == 'tenm' && event.detail.value == true)    {
      app.globalData.remindtime = 10
      this.setData({
        status1: false,
        status2: false,
        status4: false,
        status5: false,
        status6: false,
        status7: false
      })
    }else
    if (event.currentTarget.id == 'twentym' && event.detail.value == true)    {
      app.globalData.remindtime = 20
      this.setData({
        status1: false,
        status2: false,
        status3: false,
        status5: false,
        status6: false,
        status7: false
      })
    }else
    if (event.currentTarget.id == 'thirtym' && event.detail.value == true)    {
      app.globalData.remindtime = 30
      this.setData({
        status1: false,
        status2: false,
        status3: false,
        status4: false,
        status6: false,
        status7: false
      })
    }else
    if (event.currentTarget.id == 'oneh' && event.detail.value == true)   {
      app.globalData.remindtime = 60
      this.setData({
        status1: false,
        status2: false,
        status3: false,
        status5: false,
        status4: false,
        status7: false
      })
    }else
    if (event.currentTarget.id == 'twoh' && event.detail.value == true)   {
      app.globalData.remindtime = 120
      this.setData({
        status1: false,
        status2: false,
        status3: false,
        status5: false,
        status6: false,
        status4: false
      })
    }
  },

  confirm: function(){
    wx.navigateBack({
      url: '../first/first',
      success: function(e){
        console.log(e)
      },
      fail: function(e){
        console.log(e)
      },
      complete: function (e) {
        console.log(e)
      }
    })
    console.log('confirm')
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