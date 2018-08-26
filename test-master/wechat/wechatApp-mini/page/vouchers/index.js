var app = getApp()
Page({

  data: {
    CashCouponInfo:''
  },


  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '购买代金券',
    })
  },

  onShow(){
    this.getCashCouponInfo()
  },

  //获取代金券
  getCashCouponInfo(){
    app.commonAjax('/miniapp/cat/couponInfo/getCashCouponInfo', ['shopId'], {}, (res) => {

      this.setData({
        CashCouponInfo:res.data.data
      })

    }, app.globalData, 'get')
  },

  buyVoucher(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/vouchers/buyVouchers/index?Id=' + id
    })
  }


  

})