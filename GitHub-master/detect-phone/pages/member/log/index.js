var t = getApp(),
  a = t.requirejs("core");
Page({
  data: {
    icons: t.requirejs("icons"),
    type: 0,
    isopen: false,
    page: 1,
    loaded: false,
    loading: true,
    list: []
  },
  onLoad: function (a) {
    a.type > 0 && this.setData({
      type: 1
    }),
      t.url(a),
      this.getList()
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList()
  },
  getList: function () {
    var t = this;
    t.setData({
      loading: true
    }),
      a.get("member/log/get_list", {
        type: t.data.type,
        page: t.data.page
      }, function (a) {
        var e = {
          loading: false,
          total: a.total,
          show: true
        };
        if (1 == t.data.page) {
          e.isopen = a.isopen;
          var i = "充值记录";
          1 == a.isopen && (i = a.moneytext + "明细"),
            wx.setNavigationBarTitle({
              title: i
            })
        }
        a.list || (a.list = []),
          a.list.length > 0 && (e.page = t.data.page + 1, e.list = t.data.list.concat(a.list), a.list.length < a.pagesize && (e.loaded = true)),
          t.setData(e)
      })
  },
  myTab: function (t) {
    var e = this,
      i = a.pdata(t).type;
    e.setData({
      type: i,
      page: 1,
      list: [],
      loading: true
    }),
      e.getList()
  }
})