var app = getApp()
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    industry: '',
    tran_industry: '',
    nonet: true
  },
  onLoad: function (options) {
    // 0:发布融资项目  1:发布投资需求或者身份认证编辑 2:维护我的项目 3:发布投资案例
    let that = this;
    app.netWorkChange(that)
    let identity = options.identity;
    let industry = wx.getStorageSync('industry');
    let tran_industry = wx.getStorageSync('tran_industry') || [];
    industry.forEach((x, index) => {
      tran_industry.forEach(y => {
        if (x.industry_id == y.industry_id) {
          x.check = true;
        }
      })
    })
    that.setData({
      industry: industry,
      tran_industry: tran_industry
    })
  },

  //点击选中标签
  checkboxChange(e) {
    let that = this;
    let industry = this.data.industry
    let tranArr = this.data.tran_industry;
    let item = app.checkMore(e, industry, tranArr, that, "industry_id");
    this.setData({
      industry: item.item,
      tran_industry: item.tran_arr
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  //点击确定
  certain() {
    let that = this;
    let tran_industry = this.data.tran_industry;
    if (tran_industry.length == 0) {
      wx.setStorageSync("tran_industry", "")
    } else {
      wx.setStorageSync("tran_industry", tran_industry)
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