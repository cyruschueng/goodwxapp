let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
Page({
  data: {
    nonet: true
  },
  onLoad: function (options) {
    this.setData({
      index: options.index,
      id: options.project_id,
      currentTab: options.currentTab,
      shareType: options.type,
      share_id: options.share_id
    });
    console.log('pro_id', this.data.id);
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {
    //  投资人数据
    let that = this;
    let id = this.data.id;
    that.projectDetailInfo();
  },

  // 
  //项目详情信息
  projectDetailInfo() {
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    let share_id = this.data.share_id;
    wx.request({
      url: url_common + '/api/project/getProjectDetail',
      data: {
        user_id: user_id,
        project_id: this.data.id,
        source: "share",
        share_id: share_id
      },
      method: 'POST',
      success: function (res) {
        console.log('projectDetail', res);
        let project = res.data.data;
        that.setData({
          project: project,
        });
        // 里程碑
        let mileStoneArray = project.pro_develop;
        mileStoneArray.forEach((x, index) => {
          mileStoneArray[index].dh_start_time = app.changeTimeStyle1(x.dh_start_time);
          mileStoneArray[index].dh_event = x.dh_event;
        });
        that.setData({
          mileStoneArray: mileStoneArray,
        });
      },
    });
  },



  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
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
    }, 1500);
  }

});