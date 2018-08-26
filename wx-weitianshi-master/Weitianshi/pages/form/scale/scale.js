var app = getApp()
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    index: [],
    id: [],
    error: "0",
    error_text: "",
    tran_scale: [],
    scale_id: "",
    nonet: true
  },
  onLoad: function () {
    var that = this;
    let scale = wx.getStorageSync("scale");
    app.netWorkChange(that)
    let tran_scale = [];
    if (wx.getStorageSync("tran_scale").length != 0) {
      tran_scale = wx.getStorageSync("tran_scale");
      scale.forEach((y) => {
        tran_scale.forEach((x) => {
          if (x.scale_id == y.scale_id) {
            y.check = true;
          }
        })
      })
    }
    that.setData({
      scale: scale,
      tran_scale: tran_scale
    });
  },
  checkboxChange(e) {
    let that = this;
    let scale = this.data.scale
    let tranArr = this.data.tran_scale;
    let item = app.checkMore(e, scale, tranArr, that,"scale_id");
    this.setData({
      scale: item.item,
      tran_scale: item.tran_arr
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  //点击确定
  certain: function () {
    var that = this;
    let tran_scale = this.data.tran_scale;
    // 传值给myProject
    if (tran_scale.length == 0) {
      wx.setStorageSync("tran_scale", "")
    } else {
      wx.setStorageSync("tran_scale", tran_scale)
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