var e = getApp(),
  t = e.requirejs("core"),
  a = e.requirejs("foxui"),
  i = e.requirejs("wxParse/wxParse");
Page({
  data: {
    id: 0,
    detail: {}

  },
  onLoad: function (e) {
    this.setData({
      id: e.id
    }),
      this.getDetail()
  },
  getDetail: function () {
    var e = this;
    t.get("sale/coupon/getdetail", {
      id: this.data.id
    }, function (t) {
      t.error > 0 ? wx.navigateBack() : (i.wxParse("wxParseData", "html", t.detail.desc, e, "5"), e.setData({
        detail: t.detail,
        show: true
      }))
    })
  },
  receive: function (e) {
    var i = this.data.detail,
      o = this;
    if (this.data.buying)
      return void a.toast(o, "正在执行请稍后");
    if (1 != i.canget)
      return void a.toast(o, i.getstr);
    var r = "确认使用";
    i.money > 0 && (r += i.money + "元", i.credit > 0 && (r += "+")),
      i.credit > 0 && (r += i.credit + "积分"),
      r += i.gettypestr + "吗？",
      t.confirm(r, function () {
        o.setData({
          buying: true
        }),
          t.post("sale/coupon/pay", {
            id: o.data.id
          }, function (e) {
            if (e.error > 0)
              return a.toast(o, e.message), void o.setData({
                buying: false
              });
            o.setData({
              logid: e.logid
            }),
              e.wechat && e.wechat.success ? t.pay(e.wechat.payinfo, function (e) {
                "requestPayment:ok" == e.errMsg && o.payResult()
              }) : o.payResult(),
              o.setData({
                buying: false
              })
          })
      })
  },
  payResult: function () {
    var e = this;
    t.get("sale/coupon/payresult", {
      logid: this.data.logid
    }, function (i) {
      if (i.error > 0)
        return void a.toast(e, i.message);
      if (0 == i.coupontype)
        return void wx.redirectTo({
          url: "/pages/sale/coupon/my/showcoupons2/index?id=" + i.dataid
        });
      var o = "/pages/sale/coupon/my/index/index";
      1 == i.coupontype && (o = "/pages/member/recharge/index"),
        t.confirm(i.confirm_text, function () {
          wx.redirectTo({
            url: o
          })
        }, function () {
          wx.redirectTo({
            url: "/pages/sale/coupon/my/index/index"
          })
        })
    })
  }
})