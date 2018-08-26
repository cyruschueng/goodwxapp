var app = getApp()
Page({

  data: {
  
  },


  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '支付中心'
    })
  },

  onShow: function () {
    this.detailsOrderShop()
  },

  onHide: function () {
  
  },

  //新的订单支付
  topay(e){
    wx.navigateTo({
      url: "/page/neworderlist/index?orderMemberId=" + e.currentTarget.dataset.id + '&orderList=' + 'true' + '&orderNo=' + e.currentTarget.dataset.deskid + '&deskId=' + e.currentTarget.dataset.deskid
    })
  },

  //新的订单支付
  topay_2(e) {
    wx.navigateTo({
      url: "/page/neworderlist/index?orderMemberId=" + e.currentTarget.dataset.id + '&orderList=' + 'true' + '&orderNo=' + e.currentTarget.dataset.deskid + '&deskId=' + e.currentTarget.dataset.deskid + '&paytoo=true'
    })
  },

  //会员订单已验单订单详情
  detailsOrderShop(){
    app.commonAjax('/miniapp/cat/order/listOrderShop', ['memberId'], {}, (res) => {

      if(res.data.data.length<=0){
        this.setData({
          showdetailsOrderShop: true
        })
      }

      this.setData({
        detailsOrderShop: res.data.data
      })

      

    }, app.globalData, 'get')
  }
})