var app = getApp()
Page({

  data: {
  
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '外卖订单'
    })
  },

  onShow () {
    this.queryTakeOutList()
  },

  queryTakeOutList(){
    app.commonAjax('/miniapp/cat/takeout/queryTakeOutList', ['shopId'], {}, (res) => {

      this.setData({
        orderTakeoutList: res.data.data.orderTakeoutList
      })

    }, app.globalData, 'post')
  }

})