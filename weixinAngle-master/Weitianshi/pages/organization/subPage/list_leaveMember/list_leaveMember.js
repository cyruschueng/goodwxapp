// pages/organization/subPage/list_media/list_media.js
let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../../utils/model/shareModel';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nonet: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      investment_id: options.investment_id,
    });
    let that = this;
    app.netWorkChange(that)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.setData({
      requestCheck: true,
      currentPage: 0,
      page_end: false,
      memberList: []
    })
    // app.initPage(that);
    this.loadMore();
  },
  loadMore() {
    let that = this;
    let currentPage = this.data.currentPage;
    let memberList = this.data.memberList;
    let request = {
      url: url_common + '/api/investment/members',
      data: {
        page: this.data.currentPage,
        investment_id: this.data.investment_id,
        is_former: 1
      },
    }
    app.loadMore2(that, request, res => {
      app.log(that,"li职成员", res)
      let newPage = res.data.data;
      let list = res.data.data.member_list;
      let page_end = res.data.data.page_end;
      if (list) {
        let newProject = memberList.concat(list)
        currentPage++;
        that.setData({
          memberList: newProject,
          page_end: page_end,
          requestCheck: true,
          currentPage: currentPage
        })
      }
      if (page_end == true) {
        app.errorHide(that, '没有更多了', 3000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
})