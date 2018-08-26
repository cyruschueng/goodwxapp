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
    project_id: '',
    nonet: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      project_id: options.project_id,
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
      newPage: '',
      requestCheck: true,
      currentPage: 0,
      page_end: false,
      investment_list: []
    })
    // app.initPage(that);
    this.loadMore();
  },
  //下拉刷新
  onPullDownRefresh: function () {
    
  },
  loadMore() {
    let that = this;
    let currentPage = this.data.currentPage;
    let investment_list = this.data.investment_list;
    let request = {
      url: url_common + '/api/investment/matchs',
      data: {
        project_id: this.data.project_id,
        page: this.data.currentPage
      },
    }
    app.loadMore2(that, request, res => {
      app.log(that,"机构版买家图谱", res)
      let newPage = res.data.data;
      let list = res.data.data.investment_list;
      let page_end = res.data.data.page_end;
      if (list) {
        let newProject = investment_list.concat(list)
        currentPage++;
        that.setData({
          newPage: newPage,
          investment_list: newProject,
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
  // 跳转详情页
  institutionalDetails1: function (e) {
    let thisData = e.currentTarget.dataset;
    app.href('/pages/organization/org_detail/org_detail?investment_id=' + thisData.id)
  },
  /**
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
    let that = this;
    return ShareModel.match1(that);
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