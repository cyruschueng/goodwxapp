var t = getApp(),
  e = t.requirejs("core");
Page({
  data: {
    loaded: false,
    list: []
  },
  onLoad: function (e) {
    t.url(e)
  },
  onShow: function () {
    this.getList()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  getList: function () {
    var t = this;
    e.get("member/address/get_list", {}, function (e) {
      t.setData({
        loaded: true,
        list: e.list,
        show: true
      })
    })
  },
  select: function (s) {
    var i = e.pdata(s).index;
    t.setCache("orderAddress", this.data.list[i], 30),
      wx.navigateBack()
  }
})