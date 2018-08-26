var app = getApp()
Page({

  data: {
  
  },

  onLoad: function (options) {
    // payId: options.payId
    console.log(options.type) //1是 代金券 2是团购 没有是点餐订单支付
    this.setData({
      MoneyCoupon: options.MoneyCoupon,
      payId: options.payId
    })
    this.queryPayResult()
  },

  onShow: function () {
  
  },
  onHide: function () {
  
  },

  //跳转到我的代金券页面
  toCouponList(){
    wx.redirectTo({
      url: '/page/coupon/couponList/index',
    })
  },

  queryPayResult(){
    app.commonAjax('/miniapp/cat/orderFood/queryPayResult', [], { payId: this.data.payId }, (res) => {

      if(res.data.code == 0){
        this.setData({
          queryPayResult:res.data.data
        })
      }

    }, app.globalData, 'post')
  }


})