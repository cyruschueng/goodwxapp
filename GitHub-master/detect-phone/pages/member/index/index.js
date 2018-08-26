var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
Page({
  data: {
    route: "member",
    icons: e.requirejs("icons"),
    member: {}

  },
  onLoad: function (r) {
    e.url(r),
      "" == e.getCache("userinfo") && wx.redirectTo({
        url: "/pages/message/auth/index"
      })
  },
  getInfo: function () {
    var e = this;
    r.get("member", {}, function (r) {
      0 != r.error ? wx.redirectTo({
        url: "/pages/message/auth/index"
      }) : e.setData({
        member: r,
        show: !0
      }),
        t.wxParse("wxParseData", "html", r.copyright, e, "5")
    })
  },
  onShow: function () {
    this.getInfo()
  },
  onShareAppMessage: function () {
    return r.onShareAppMessage()
  }
})