var t = getApp(),
  a = t.requirejs("core");
Page({
  data: {
    code: 0
  },
  onShow: function () {
    this.getData()
  },
  getData: function () {
    var t = this;
    a.get("commission/withdraw", {}, function (a) {
      a.show = true,
        t.setData(a)
    })
  },
  toggleSend: function (t) {
    0 == t.currentTarget.dataset.id ? this.setData({
      code: 1
    }) : this.setData({
      code: 0
    })
  },
  withdraw: function (t) {
    this.data.cansettle && wx.navigateTo({
      url: "/pages/commission/apply/index"
    })
  }
})