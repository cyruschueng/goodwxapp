var app = getApp()
var url = app.globalData.url;
var url_common = app.globalData.url_common;
var save = true;//是否删除缓存
Page({
  data: {
    payArea: [],
    checked: [],
    index: [],
    id: [],
    error: "0",
    error_text: "",
    enchangeCheck: [],
    enchangeValue: [],
    enchangeId: [],
    nonet: true
  },
  onLoad: function () {
    var that = this;
    var that = this;
    app.netWorkChange(that)
    let area = wx.getStorageSync("hotCity");
    let tran_hotCity = [];
    if (wx.getStorageSync("tran_hotCity").length != 0) {
      tran_hotCity = wx.getStorageSync("tran_hotCity");
      area.forEach((y) => {
        tran_hotCity.forEach((x) => {
          if (x.area_id == y.area_id) {
            y.check = true;
          }
        })
      })
    }
    that.setData({
      area: area,
      tran_hotCity: tran_hotCity
    });
  },
  onShow: function () {
    // 页面显示
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  //传值部份可提供资源
  checkboxChange: function (e) {
    let that = this;
    let area = this.data.area
    let tranArr = this.data.tran_hotCity;
    let item = app.checkMore(e, area, tranArr, that, "area_id");
    this.setData({
      area: item.item,
      tran_hotCity: item.tran_arr
    })
  },

  //点击确定
  certain: function () {
    var that = this;
    var index = this.data.index;
    let tran_hotCity = this.data.tran_hotCity;
    // 传值给myProject
    if (tran_hotCity.length == 0) {
      wx.setStorageSync("tran_hotCity", "")
    } else {
      wx.setStorageSync("tran_hotCity", tran_hotCity)
    }
    wx.navigateBack({
      delta: 1 // 回退前 delta(默认为1) 页面
    })
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500)
  }

});