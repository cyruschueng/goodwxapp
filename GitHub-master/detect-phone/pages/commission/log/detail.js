var t = getApp(),
  a = t.requirejs("core");
Page({
  data: {
    page: 1,
    list: []
  },
  onLoad: function (t) {
    t.id > 0 && this.setData({
      id: t.id
    }),
      this.getList()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  getList: function () {
    var t = this;
    a.get("commission/log/detail_list", {
      page: t.data.page,
      id: t.data.id
    }, function (a) {
      var e = {
        total: a.total,
        pagesize: a.pagesize,
        show: true,
        textyuan: a.textyuan,
        textcomm: a.textcomm
      };
      a.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.list), a.list.length < a.pagesize && (e.loaded = true)),
        t.setData(e)
    }, this.data.show)
  }
})