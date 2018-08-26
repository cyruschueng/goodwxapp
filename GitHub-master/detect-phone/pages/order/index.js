var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("biz/order");
Page({
  data: {
    icons: t.requirejs("icons"),
    status: "",
    list: [],
    page: 1,
    code: false,
    cancel: e.cancelArray,
    cancelindex: 0
  },
  onLoad: function (a) {
    this.setData({
      options: a,
      status: a.status || ""
    }),
      t.url(a),
      this.get_list()
  },
  get_list: function () {
    var t = this;
    t.setData({
      loading: true
    }),
      a.get("order/get_list", {
        page: t.data.page,
        status: t.data.status,
        merchid: 0
      }, function (e) {
        0 == e.error ? (t.setData({
          loading: false,
          show: true,
          total: e.total,
          empty: true
        }), e.list.length > 0 && t.setData({
          page: t.data.page + 1,
          list: t.data.list.concat(e.list)
        }), e.list.length < e.pagesize && t.setData({
          loaded: true
        })) : a.toast(e.message, "loading")
      }, this.data.show)
  },
  selected: function (t) {
    var e = a.data(t).type;
    this.setData({
      list: [],
      page: 1,
      status: e,    
      empty: false

    }),
      this.get_list()
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.get_list()
  },
  code: function (t) {
    var e = this,
      s = a.data(t).orderid;
    a.post("verify/qrcode", {
      id: s
    }, function (t) {
      0 == t.error ? e.setData({
        code: true,
        qrcode: t.url
      }) : a.alert(t.message)
    }, true)
  },
  close: function () {
    this.setData({
      code: false
    })
  },
  cancel: function (t) {
    var s = a.data(t).orderid;
    e.cancel(s, t.detail.value, "/pages/order/index?status=" + this.data.status)
  },
  delete: function (t) {
    var s = a.data(t).type,
      i = a.data(t).orderid;
    e.delete(i, s, "/pages/order/index", this)
  },
  finish: function (t) {
    var s = (a.data(t).type, a.data(t).orderid);
    e.finish(s, "/pages/order/index")
  },
  onShareAppMessage: function () {
    return a.onShareAppMessage()
  }
})