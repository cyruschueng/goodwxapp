var e = getApp(),
  o = e.requirejs("core");
Page({
  data: {
    showimage: false
  },
  onLoad: function (e) { },
  onShow: function () {
    this.getData()
  },
  getData: function () {
    var e = this;
    o.get("commission/qrcode", {}, function (o) {
      if (70001 == o.error)
        return void wx.redirectTo({
          url: "/pages/member/info/index"
        });
      o.show = true,
        e.setData(o),
        e.getImage()
    })
  },
  getImage: function () {
    var e = this;
    o.post("commission/qrcode", {}, function (o) {
      if (70001 == o.error)
        return void wx.redirectTo({
          url: "/pages/member/info/index"
        });
      o.showimage = true,
        e.setData(o)
    })
  }
})