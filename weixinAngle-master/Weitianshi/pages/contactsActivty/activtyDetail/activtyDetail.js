let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
Page({
  data: {
    status: false,
    activtyDetail: app.globalData.picUrl.activtyDetail
  },
  onLoad: function () {
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {
    let that = this;
    app.loginPage(function (user_id) {
      wx.request({
        url: url_common + '/api/team/cardsStatistics',
        data: {
          user_id: user_id,
        },
        method: 'POST',
        success: function (res) {
          app.log('res', res);
          let status = res.data.data.button_type;
          let activtyData = res.data.data;
          that.setData({
            status: status,
            activtyData: activtyData
          });
        }
      });
    });
  },

  onShareAppMessage: function () {
    return ShareModel.activtyShare();
  },
  //报名
  enroll: function (e) {
    let that = this;
    let xxx = e.currentTarget.dataset.url;
    let user_id = wx.getStorageSync('user_id');
    app.checkUserInfo(this, res => {
      let complete = res.data.is_complete;
      wx.navigateTo({
        url: xxx
      });
    })
  },
  // 重新加载
  refresh() {
    let timer;
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
});