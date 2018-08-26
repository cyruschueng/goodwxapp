var t = getApp(),
  i = t.requirejs("core"),
  e = t.requirejs("jquery");
Page({
  data: {
    search: false
  },
  onLoad: function (i) {
    this.setData({
      options: i
    }),
      t.url(i),
      this.get_list()
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  get_list: function () {
    var t = this;
    i.get("store/selector", {
      ids: t.data.options.ids,
      type: t.data.options.type,
      merchid: t.data.options.merchid
    }, function (i) {
      t.setData({
        list: i.list,
        show: true
      })
    })
  },
  bindSearch: function (t) {
    this.setData({
      search: true
    })
  },
  phone: function (t) {
    i.phone(t)
  },
  select: function (e) {
    var a = i.pdata(e).index;
    t.setCache("orderShop", this.data.list[a], 30),
      wx.navigateBack()
  },
  search: function (t) {
    var i = t.detail.value,
      a = this.data.old_list,
      s = this.data.list,
      n = [];
    e.isEmptyObject(a) && (a = s),
      e.isEmptyObject(a) || e.each(a, function (t, e) {
        -1 != e.storename.indexOf(i) && n.push(e)
      }),
      this.setData({
        list: n,
        old_list: a
      })
  }
})