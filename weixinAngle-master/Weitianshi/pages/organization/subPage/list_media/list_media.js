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
      media_list: []
    })
    // app.initPage(that);
    this.loadMore();
  },
  loadMore() {
    let that = this;
    let currentPage = this.data.currentPage;
    let media_list = this.data.media_list;
    let request = {
      url: url_common + '/api/investment/medias',
      data: {
        page: this.data.currentPage,
        investment_id: this.data.investment_id
      },
    }
    app.loadMore2(that, request, res => {
      app.log(that,"媒体新闻", res)
      let newPage = res.data.data;
      let list = res.data.data.news_list;
      let page_end = res.data.data.page_end;
      list.forEach(x => {
        let httpstr = this.cusstr(x.news_url, "/", 3);
        let str = x.news_url.indexOf('//');
        x.news_url = httpstr.substring(str, httpstr.length).substr(2);
      })
      if (list) {
        let newProject = media_list.concat(list)
        currentPage++;
        that.setData({
          media_list: newProject,
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
  // url字符串截取
  cusstr(str, findStr, num) {
    var idx = str.indexOf(findStr);
    var count = 1;
    while (idx >= 0 && count < num) {
      idx = str.indexOf(findStr, idx + 1);
      count++;
    }
    if (idx < 0) {
      return '';
    }
    return str.substring(0, idx);
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