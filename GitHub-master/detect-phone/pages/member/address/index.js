var t = getApp(),
  e = t.requirejs("core");
Page({
  data: {
    loaded: !1,
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
        loaded: !0,
        list: e.list,
        show: !0
      })
    })
  },
  setDefault: function (t) {
    var s = this,
      i = e.pdata(t).id;
    s.setData({
      loaded: !1
    }),
      e.get("member/address/set_default", {
        id: i
      }, function (t) {
        e.toast("设置成功"),
          s.getList()
      })
  },
  deleteItem: function (t) {
    var s = this,
      i = e.pdata(t).id;
    e.confirm("删除后无法恢复, 确认要删除吗 ?", function () {
      s.setData({
        loaded: !1
      }),
        e.get("member/address/delete", {
          id: i
        }, function (t) {
          e.toast("删除成功"),
            s.getList()
        })
    })
  }
})