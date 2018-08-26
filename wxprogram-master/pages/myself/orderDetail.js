const app = getApp()

Page({
  data: {
    orderid: '',
    bizType: '',
    shopid: '',
    ename: '',
    cname: '',
    orderinfo: {},
  },
  onLoad: function (option) {
    var self = this
    wx.request({
      url: app.globalData.apiURL + '/shop/info?shopId=' + option.shopId,
      success: function (res) {
        self.setData({
          shopid: option.shopId,
          bizType: res.data.result.bizType,
          ename: res.data.result.englishName,
          cname: res.data.result.shopName
        })
      }
    })
    wx.request({
      url: app.globalData.apiURL + '/order/info',
      header: { memberId: wx.getStorageSync('memberid'), token: wx.getStorageSync('token') },
      data: { orderId: option.orderId },
      success: function (res) {
        self.setData({
          orderid: option.orderId,
          orderinfo: res.data.result
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '支付订单'
    })
  },
  gotodetail: function () {
    wx.navigateTo({
      url: '../detail/viewDetail?id=' + this.data.shopid,
    })
  },
  goPay: function () {
    //获取支付凭证
    wx.request({
      url: app.globalData.apiURL + '/pay/sign',
      header: { memberId: wx.getStorageSync('memberid'), token: wx.getStorageSync('token') },
      data: { orderId: this.data.orderid },
      method: 'POST',
      success: function (res) {
        console.log(res)
        //调用微信支付接口
        wx.requestPayment({
          'timeStamp': res.data.result.timeStamp,
          'nonceStr': res.data.result.nonceStr,
          'package': res.data.result.package,
          'signType': res.data.result.signType,
          'paySign': res.data.result.paySign,
          'success': function (res1) {
            wx.showLoading({
              title: "正在出票",
              success: function () {
                setTimeout(function () {
                  wx.hideLoading({
                    success: function () {
                      wx.navigateTo({ url: '../payticket/paySuccess?orderid=' + this.data.orderid })
                    }
                  })
                }, 3000)
              }
            })
          },
          'fail': function (res1) {
            wx.showToast({ title: '支付失败', })
          }
        })
      }
    })
  },
})
