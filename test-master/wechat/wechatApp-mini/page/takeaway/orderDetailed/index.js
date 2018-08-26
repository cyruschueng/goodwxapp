var app =getApp()
Page({

  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '外卖订单详细'
    })
    this.setData({
      id: options.id
    })
    this.getTakeOutDetail()
  },


  onShow: function () {
  
  },

  Clip(i){
    console.log(this.data.orderTakeout.orderNo)
    wx.setClipboardData({
      data: this.data.orderTakeout.orderNo,
      success: function (res) {
        wx.showToast({
          title: '复制成功！',
        })
      }
    })
  },

  getTakeOutDetail() {
    app.commonAjax('/miniapp/cat/takeout/getTakeOutDetail', ['shopId'], { takeOutId: this.data.id}, (res) => {

      this.setData({
        orderMenuList: res.data.data.orderMenuList,
        orderTakeout: res.data.data.orderTakeout
      })
      this.getAddress()

    }, app.globalData, 'post')
  },

  getAddress() {
    app.commonAjax('/miniapp/cat/takeout/getAddress', ['shopId'], { id: this.data.orderTakeout.addressId }, (res) => {


      this.setData({
        addData: res.data.data
      })

    }, app.globalData, 'post')
  },

  cancelTakeOut() {
    app.commonAjax('/miniapp/cat/takeout/cancelTakeOut', ['shopId', 'memberId'], { takeOutId: this.data.id }, (res) => {

      wx.showToast({
        title: '取消成功'
      })

      

    }, app.globalData, 'post')
  }

})