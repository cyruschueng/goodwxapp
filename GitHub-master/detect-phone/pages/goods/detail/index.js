var t = getApp(),
  e = t.requirejs("core"),
  a = (t.requirejs("icons"), t.requirejs("foxui")),
  o = t.requirejs("biz/diyform"),
  i = t.requirejs("jquery"),
  s = t.requirejs("wxParse/wxParse"),
  n = 0,
  r = [],
  d = [];
Page({
  data: {
    icons: t.requirejs("icons"),
    goods: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    active: "",
    slider: "",
    tempname: "",
    info: "active",
    preselltimeend: "",
    presellsendstatrttime: "",
    advWidth: 0,
    dispatchpriceObj: 0,
    now: parseInt(Date.now() / 1000),
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    timer: 0,
    discountTitle: "",
    istime: 1,
    istimeTitle: "",
    params: {},
    total: 1,
    optionid: 0,
    defaults: {
      id: 0,
      merchid: 0
    },
    buyType: "",
    pickerOption: {},
    specsData: [],
    specsTitle: "",
    canBuy: "",
    diyform: {},
    showPicker: false,
    pvalOld: [0, 0, 0],
    pval: [0, 0, 0],
    areas: [],
    noArea: true,
    commentObj: {},
    commentObjTab: 1,
    loading: false,
    commentEmpty: false,
    commentPage: 1,
    commentLevel: "all",
    commentList: []
  },
  favorite: function (t) {
    var a = this,
      o = t.currentTarget.dataset.isfavorite ? 0 : 1;
    e.get("member/favorite/toggle", {
      id: a.data.options.id,
      isfavorite: o
    }, function (t) {
      t.isfavorite ? a.setData({
        "goods.isfavorite": 1
      }) : a.setData({
        "goods.isfavorite": 0
      })
    })
  },
  goodsTab: function (t) {
    var a = this,
      o = t.currentTarget.dataset.tap;
    if ("info" == o)
      this.setData({
        info: "active",
        para: "",
        comment: ""
      });
    else if ("para" == o)
      this.setData({
        info: "",
        para: "active",
        comment: ""
      });
    else if ("comment" == o) {
      if (a.setData({
        info: "",
        para: "",
        comment: "active"
      }), a.data.commentList.length > 0)
        return void a.setData({
          loading: false
        });
      a.setData({
        loading: true
      }),
        e.get("goods/get_comment_list", {
          id: a.data.options.id,
          level: a.data.commentLevel,
          page: a.data.commentPage
        }, function (t) {
          t.list.length > 0 ? a.setData({
            loading: false,
            commentList: t.list,
            commentPage: t.page
          }) : a.setData({
            loading: false,
            commentEmpty: true
          })
        })
    }
  },
  comentTap: function (t) {
    var a = this,
      o = t.currentTarget.dataset.type,
      i = "";
    1 == o ? i = "all" : 2 == o ? i = "good" : 3 == o ? i = "normal" : 4 == o ? i = "bad" : 5 == o && (i = "pic"),
      o != a.data.commentObjTab && e.get("goods/get_comment_list", {
        id: a.data.options.id,
        level: i,
        page: a.data.commentPage
      }, function (t) {
        t.list.length > 0 ? a.setData({
          loading: false,
          commentList: t.list,
          commentPage: t.page,
          commentObjTab: o,
          commentEmpty: false
        })
          : a.setData({
            loading: false,
            commentList: t.list,
            commentPage: t.page,
            commentObjTab: o,
            commentEmpty: true
          })
      })
  },
  number: function (t) {
    var o = this,
      i = e.pdata(t),
      s = a.number(this, t);
    i.id,
      i.optionid;
    1 == s && 1 == i.value && "minus" == t.target.dataset.action || i.value == i.max && "plus" == t.target.dataset.action || o.setData({
      total: s
    })
  },
  buyNow: function (t) {
    var i = this,
      s = i.data.optionid,
      r = i.data.diyform;
    if (n > 0 && 0 == s)
      return void a.toast(i, "请选择规格");
    if (r && r.fields.length > 0) {
      if (!o.verify(i, r))
        return;
      e.post("order/create/diyform", {
        id: i.data.options.id,
        diyformdata: r.f_data
      }, function (t) {
        wx.redirectTo({
          url: "/pages/order/create/index?id=" + i.data.options.id + "&total=" + i.data.total + "&optionid=" + s + "&gdid=" + t.gdid
        })
      })
    } else
      wx.redirectTo({
        url: "/pages/order/create/index?id=" + i.data.options.id + "&total=" + i.data.total + "&optionid=" + s
      })
  },
  getCart: function (t) {
    var i = this,
      s = i.data.optionid,
      r = i.data.diyform;
    if (n > 0 && 0 == s)
      return void a.toast(i, "请选择规格");
    if (r && r.fields.length > 0) {
      if (!o.verify(i, r))
        return;
      e.post("order/create/diyform", {
        id: i.data.options.id,
        diyformdata: r.f_data
      }, function (t) {
        e.post("member/cart/add", {
          id: i.data.options.id,
          total: i.data.total,
          optionid: s,
          diyformdata: r.f_data
        }, function (t) {
          0 == t.error && i.setData({
            "goods.cartcount": t.cartcount,
            active: "",
            slider: "out"
          })
        })
      })
    } else
      e.post("member/cart/add", {
        id: i.data.options.id,
        total: i.data.total,
        optionid: s
      }, function (t) {
        0 == t.error && i.setData({
          "goods.cartcount": t.cartcount,
          active: "",
          slider: "out"
        })
      })
  },
  getDetail: function (t) {
    var a = this,
      o = parseInt(Date.now() / 1000);
    a.setData({
      loading: true
    }),
      e.get("goods/get_detail", {
        id: t.id
      }, function (t) {
        if (s.wxParse("wxParseData", "html", t.goods.content, a, "0"), a.setData({
          show: true,
          goods: t.goods
        }), wx.setNavigationBarTitle({
          title: t.goods.title || "商品详情"
        }), n = t.goods.hasoption, i.isEmptyObject(t.goods.dispatchprice) || "string" == typeof t.goods.dispatchprice ? a.setData({
          dispatchpriceObj: 0
        }) : a.setData({
          dispatchpriceObj: 1
        }), t.goods.isdiscount > 0 && t.goods.isdiscount_time >= o) {
          clearInterval(a.data.timer);
          var r = setInterval(function () {
            a.countDown(0, t.goods.isdiscount_time)
          }, 1000);
          a.setData({
            timer: r
          })
        } else
          a.setData({
            discountTitle: "活动已结束"
          });
        if (t.goods.istime > 0) {
          clearInterval(a.data.timer);
          var r = setInterval(function () {
            a.countDown(t.goods.timestart, t.goods.timeend, "istime")
          }, 1000);
          a.setData({
            timer: r
          })
        }
        t.goods.ispresell > 0 && a.setData({
          preselltimeend: t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
          presellsendstatrttime: t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日"
        }),
          t.goods.getComments > 0 && e.get("goods/get_comments", {
            id: a.data.options.id
          }, function (t) {
            a.setData({
              commentObj: t
            })
          })
      })
  },
  countDown: function (t, e, a) {
    var now = parseInt(Date.now() / 1000),
      i = t > now ? t : e,
      s = i - now,
      leftsecond = parseInt(s),
      day1 = Math.floor(leftsecond / (60 * 60 * 24)),
      hour = Math.floor((leftsecond - 24 * day1 * 60 * 60) / 3600),
      minute = Math.floor((leftsecond - 24 * day1 * 60 * 60 - 3600 * hour) / 60);
    Math.floor(leftsecond - 24 * day1 * 60 * 60 - 3600 * hour - 60 * minute);
    if (this.setData({
      day: Math.floor(leftsecond / (60 * 60 * 24)),
      hour: Math.floor((leftsecond - 24 * day1 * 60 * 60) / 3600),
      minute: Math.floor((leftsecond - 24 * day1 * 60 * 60 - 3600 * hour) / 60),
      second: Math.floor(leftsecond - 24 * day1 * 60 * 60 - 3600 * hour - 60 * minute)
    }), "istime") {
      var l = "";
      t > now ? l = "距离限时购开始" : t <= now && e > now ? l = "距离限时购结束" : (l = "活动已经结束，下次早点来~", this.setData({
        istime: 0
      })),
        this.setData({
          istimeTitle: l
        })
    }
  },
  cityPicker: function (t) {
    var e = this;
    t.currentTarget.dataset.tap;
    wx.navigateTo({
      url: "/pages/goods/region/index?id=" + e.data.goods.id + "&region=" + e.data.goods.citys
    })
  },
  selectPicker: function (t) {
    var a = this,
      o = t.currentTarget.dataset.tap,
      i = t.currentTarget.dataset.buytype;
    "" == o && a.setData({
      active: "active",
      slider: "in",
      tempname: "select-picker",
      buyType: i
    }),
      e.get("goods/get_picker", {
        id: a.data.goods.id
      }, function (t) {
        n > 0 && (d = t.options, a.setData({
          pickerOption: t
        })),
          t.diyform && a.setData({
            diyform: {
              fields: t.diyform.fields,
              f_data: t.diyform.lastdata
            }
          })
      })
  },
  specsTap: function (t) {
    var e = this,
      a = t.target.dataset.idx;
    r[a] = {
      id: t.target.dataset.id,
      title: t.target.dataset.title
    };
    var o = "",
      i = "";
    r.forEach(function (t) {
      o += t.title + ";",
        i += t.id + "_"
    }),
      i = i.substring(0, i.length - 1),
      d.forEach(function (a) {
        a.specs == i && (e.setData({
          optionid: a.id,
          "goods.total": a.stock,
          "goods.maxprice": a.marketprice,
          "goods.minprice": a.marketprice
        }), "" != t.target.dataset.thumb && e.setData({
          "goods.thumb": t.target.dataset.thumb
        }), a.stock <= 0 ? e.setData({
          canBuy: "库存不足"
        }) : e.setData({
          canBuy: ""
        }))
      }),
      e.setData({
        specsData: r,
        specsTitle: o
      })
  },
  emptyActive: function () {
    this.setData({
      active: "",
      slider: "out"
    })
  },
  onLoad: function (e) {
    var a = this;
    "" == t.getCache("userinfo") && wx.redirectTo({
      url: "/pages/message/auth/index"
    }),
      a.setData({
        options: e,
        areas: t.getCache("cacheset").areas
      }),
      wx.getSystemInfo({
        success: function (t) {
          a.setData({
            advWidth: t.windowWidth
          })
        }
      }),
      this.getDetail(e)
  },
  onShow: function () {
    r = [],
      d = []
  },
  onChange: function (t) {
    return o.onChange(this, t)
  },
  DiyFormHandler: function (t) {
    return o.DiyFormHandler(this, t)
  },
  selectArea: function (t) {
    return o.selectArea(this, t)
  },
  bindChange: function (t) {
    return o.bindChange(this, t)
  },
  onCancel: function (t) {
    return o.onCancel(this, t)
  },
  onConfirm: function (t) {
    return o.onConfirm(this, t)
  },
  getIndex: function (t, e) {
    return o.getIndex(t, e)
  },
  onShareAppMessage: function () {
    return e.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.options.id)
  }
})