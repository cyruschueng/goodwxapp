var t = getApp(),
  e = t.requirejs("core");
Page({
  data: {
    storeid: 0,
    markers: [],
    store: {}

  },
  onLoad: function (t) {
    this.setData({
      storeid: t.id
    }),
      this.getInfo()
  },
  getInfo: function () {
    var t = this;
    e.get("store/map", {
      id: this.data.storeid
    }, function (e) {
      t.setData({
        store: e.store,
        markers: [{
          id: 1,
          latitude: Number(e.store.lat),
          longitude: Number(e.store.lng)
        }
        ],
        show: true
      })
    })
  },
  phone: function (t) {
    e.phone(t)
  }
})