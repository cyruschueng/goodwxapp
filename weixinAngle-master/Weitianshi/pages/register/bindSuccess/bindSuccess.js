var app = getApp();
Page({
  data: {
    imgUrls: app.globalData.picUrl.band_identity,
    nonet: true
  },

  onLoad: function (options) {
    let type = options.type;
    console.log(options);
    this.setData({
      type: type
    });
    let that = this;
    app.netWorkChange(that);
  },

  onShow: function () {

  },
  btnYes: function () {
    let type = this.data.type;
    // console.log(type);
    if (type == 1) {
      let pages = getCurrentPages();
      wx.navigateBack({
        delta: 2
      });
    } else {
      if (type == 2) {
        let pages = getCurrentPages();
        // console.log(pages);
        wx.navigateBack({
          delta: 3
        });
      } else {
        app.href("/pages/discoverProject/discoverProject");
      }
    }
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
    }, 1500);
  }
});