var app = getApp()
Page({
  data: {
    motto: '你好！',
    userInfo: {},
    shopId: '',
    busname: '',
    memberId: '',
    hiddenmodalput: false, //显示登陆框
    validCodeShow: false, //显示验证码倒计时
    validCodeTime: 120, //验证码倒计时时间
    phone: '', //登陆框手机号
    COUPON :'0', //优惠券
    DISCOUNT :'0', //折扣券
    GROUPON :'0', //团购券
    CASH :'0', //代金券
    userphone:'null'
  },
  //
  toLogin: function () {
    wx.navigateTo({
      url: '/page/login/index',
    })
  },
  onShow: function () {
    this.setData({
      userphone: app.globalData.userphone,
      memberId: app.globalData.memberId
    })
    this.getMiniUserCardsCount()
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '会员中心',
    })


    var that = this

      wx.getUserInfo({
        success:function(res){
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
  },
  //统计会员已领取卡券总数
  getMiniUserCardsCount() {
    app.commonAjax('/miniapp/cat/couponLink/getMiniUserCardsCount', ['bizId', 'memberId'], {}, (res) => {

      if(res.data.code == 0){
        var COUPON = '0' //优惠券
        var DISCOUNT = '0' //折扣券
        var GROUPON = '0' //团购券
        var CASH = '0' //代金券

        res.data.data.forEach((item, index) => {
          if (item.cardType == '0') {
            COUPON = item.count ? item.count : '0'
          }
          if (item.cardType == 'DISCOUNT') {
            DISCOUNT = item.count ? item.count : '0'
          }
          if (item.cardType == '2') {
            GROUPON = item.count ? item.count : '0'
          }
          if (item.cardType == '1') {
            CASH = item.count ? item.count : '0'
          }
        })

        this.setData({
          COUPON: COUPON,
          DISCOUNT: DISCOUNT,
          GROUPON: GROUPON,
          CASH: CASH
        })
      }

    }, app.globalData, 'post')
  },
  

})