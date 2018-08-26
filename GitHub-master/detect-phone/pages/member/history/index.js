var t = getApp(),
  e = t.requirejs("core");
t.requirejs("foxui");
Page({
  data: {
    icons: t.requirejs("icons"),
    page: 1,
    loading: false,
    loaded: false,
    isedit: false,
    isCheckAll: false,
    checkObj: {},
    checkNum: 0,
    list: []
  },
  onLoad: function (e) {
    t.url(e),
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
    t.setData({
      loading: true
    }),
      e.get("member/history/get_list", {
        page: t.data.page
      }, function (e) {
        var i = {
          loading: false,
          loaded: true,
          total: e.total,
          pagesize: e.pagesize,
          show: true
        };
        e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), e.list.length < e.pagesize && (i.loaded = true)),
          t.setData(i)
      })
  },
  itemClick: function (t) {
    var i = this,
      a = e.pdata(t).id,
      s = e.pdata(t).goodsid;
    if (i.data.isedit) {
      var c = i.data.checkObj,
        l = i.data.checkNum;
      c[a] ? (c[a] = false, l--) : (c[a] = true, l++);
      var o = true;
      for (var n in c)
        if (!c[n]) {
          o = false;
          break
        }
      i.setData({
        checkObj: c,
        isCheckAll: o,
        checkNum: l
      })
    } else
      wx.navigateTo({
        url: "/pages/goods/detail/index?id=" + s
      })
  },
  btnClick: function (t) {
    var i = this,
      a = t.currentTarget.dataset.action;
    if ("edit" == a) {
      var s = {};
      for (var c in this.data.list) {
        s[this.data.list[c].id] = false
      }
      i.setData({
        isedit: true,
        checkObj: s,
        isCheckAll: false
      })
    } else if ("delete" == a) {
      var s = i.data.checkObj,
        l = [];
      for (var c in s)
        s[c] && l.push(c);
      if (l.length < 1)
        return;
      e.confirm("删除后不可恢复，确定要删除吗？", function () {
        e.post("member/history/remove", {
          ids: l
        }, function (t) {
          i.setData({
            isedit: false,
            checkNum: 0,
            page: 0,
            list: []
          }),
            i.getList()
        })
      })
    } else
      "finish" == a && i.setData({
        isedit: false,
        checkNum: 0
      })
  },
  checkAllClick: function () {
    var t = !this.data.isCheckAll,
      e = this.data.checkObj,
      i = {
        isCheckAll: t,
        checkObj: e
      };
    for (var a in e)
      i.checkObj[a] = !!t;
    i.checkNum = t ? this.data.list.length : 0,
      this.setData(i)
  }
})