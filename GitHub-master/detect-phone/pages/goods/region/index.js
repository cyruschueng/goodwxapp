var e = getApp();
e.requirejs("core"),
  e.requirejs("jquery");
Page({
  data: {
    region: []
  },
  onLoad: function (e) {
    var r = this,
      i = e.region;
    r.setData({
      region: i
    })
  }
})