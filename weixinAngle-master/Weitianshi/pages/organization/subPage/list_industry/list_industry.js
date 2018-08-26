var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import *  as  FilterModel from '../../../../utils/model/filterModel';
import * as ShareModel from '../../../../utils/model/shareModel';
Page({
  data: {
    nonet: true
  },

  onLoad: function (options) {
    let that = this;
    app.netWorkChange(that)
  },

  onShow: function () {
    let that = this;
    app.httpPost({
      url: url_common + '/api/investment/fieldlist',
      data: {}
    }).then(res => {
      // status =2 是绿色降 status =1 是红色
      wx.hideLoading()
      let industry_list = res.data.data.industry_list.list;
      that.setData({
        industry_list: industry_list,
      })
      wx.hideLoading();
    })
    that.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false,
    })
  },
  //加载更多
  loadMore() {
    var that = this;
    var currentPage = this.data.currentPage;
    let industry_list = this.data.industry_list;
    var request = {
      url: url_common + '/api/investment/fieldlist',
      data: {
        page: currentPage
      }
    }
    //调用通用加载函数
    app.loadMore2(that, request, res => {
      let industry_list_new = res.data.data.industry_list.list
      let page_end = res.data.data.industry_list.page_end;
      if (industry_list) {
        industry_list = industry_list.concat(industry_list_new)
        currentPage++;
        that.setData({
          industry_list: industry_list,
          page_end: page_end,
          requestCheck: true
        })
      }
      if (page_end == true) {
        app.errorHide(that, '没有更多了', 3000)
      }
    })
  },
  //热门领域跳转搜索
  toIndustrySearch(e) {
    let id = e.currentTarget.dataset.id;
    app.href('/pages/organization/org_library/org_library?label=label_industry&&itemId=' + id)
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