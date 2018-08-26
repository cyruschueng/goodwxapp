var app = getApp()
Page({

  data: {
  
  },

  navToEvaluate: function (e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate',
    })
  },
  onLoad: function (options) {
    this.setData({
      no: options.num
    })
  },
  submit: function (e) {
    var that = this
    wx.request({
      url: app.url + 'TusUserLMsg/insert',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        orderid:that.data.no,
        lmsgcontent: e.detail.value.content,
        userid:app.globalData.userid
      },
      success: function (res) {
        console.log(res)
        
          wx.showToast({
            title: '评价成功',
            icon: 'success',
            duration:800
          })
          wx.navigateBack({
            delta:1
          })
        //  wx.request({
        //    url: app.url + '',
        //  })
      }
    })
  } 
})