var app = getApp()
Page({

  data: {
  
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '自助结账',
    })
  },


  onShow: function () {
    this.getverification()
  },

  onHide: function () {
  
  },


  //获取订单列表
  getverification(){
    app.commonAjax('/miniapp/cat/order/selfCheckout', ['memberId', 'shopId'], { flag: 1 }, (res) => {
      this.setData({
        contentlist: res.data.data
      })

    }, app.globalData, 'post')
  },

  //已经验单的跳转到详细页面
  toOrder_2(e) {
    wx.navigateTo({
      url: "/page/neworderlist/index?orderMemberId=" + e.currentTarget.dataset.id + '&orderList=' + 'true' + '&orderNo=' + e.currentTarget.dataset.deskid + '&deskId=' + e.currentTarget.dataset.deskid
    })
  }

})