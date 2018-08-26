var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    imgUrls: app.globalData.picUrl.push_success,
    disabled: false,
    nonet: true
  },
  onLoad: function () {
    let that = this;
    app.netWorkChange(that)
  },
  btnYes: function () {
    console.log(4544)
    wx.navigateBack({
      delta: 2
    })
  },
  // 重新加载
  refresh() {
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500)
  }
})