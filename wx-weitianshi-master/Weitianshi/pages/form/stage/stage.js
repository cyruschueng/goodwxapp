var app = getApp()
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    stage: '',
    tran_stage: [],
    error: "0",
    error_text: "",
    nonet: true
  },
  onLoad: function () {
    var that = this;
    app.netWorkChange(that)
    var stage = wx.getStorageSync('stage');
    let tran_stage = [];
    if (wx.getStorageSync("tran_stage").length != 0) {
      tran_stage = wx.getStorageSync("tran_stage");
      stage.forEach((y) => {
        tran_stage.forEach((x) => {
          if (x.stage_id == y.stage_id) {
            y.check = true;
          }
        })
      })
    }
    that.setData({
      stage: stage,
      tran_stage: tran_stage
    });
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  //传值部份可提供资源
  checkboxChange: function (e) {
    let that = this;
    let stage = this.data.stage;
    let tranArr = this.data.tran_stage;
    let item = app.checkMore(e, stage, tranArr, that,"stage_id");
    this.setData({
      stage: item.item,
      tran_stage: item.tran_arr
    })
  },


  //点击确定
  certain: function () {
    var that = this;
    var tran_stage = this.data.tran_stage;
    //传值给myProject
    if (tran_stage.length == 0) {
      wx.setStorageSync("tran_stage", "")
    } else {
      wx.setStorageSync("tran_stage", tran_stage)
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