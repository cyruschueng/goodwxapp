var app = getApp()
Page({
  data: {
    opq:0,
    limit:6,
    list:[]
  },
  onLoad: function (options) {
    var that = this
    app.load(this)
    wx.request({
      url: app.url + 'TpubPubtopmsg/select',
      data:{
        limit:that.data.limit,
        pageIndex:1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res){
        console.log(res)
        that.setData({
          opq: 1
        })
        that.setData({
          list:res.data.rows
        })
      }
    })
  },

  onReady: function () {
  
  },

  onShow: function () {
  
  },


  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  onReachBottom: function () {
  
  },

  onPullDownRefresh: function () {
  
  }
})