// pages/supportCompetition/ranking/ranking.js
const app = getApp();
const util = require('../../../../utils/util');
const requestUtil = require('../../../../utils/requestUtil');
const $ = require('../../../../utils/underscore');
const _DuoguanData = require('../../../../utils/data');
const WxParse = require('../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myrank: null,
    ranklist: null,
    page: 1,
    ismore:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      options: options
    }, function () {
      util.trySyncUserInfo();
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ed4649',
      })
      that.myrank(options);
      options = $.extend({ page: that.data.page }, options);
      that.ranklist(options);
      wx.hideShareMenu();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  myrank: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/getmyrank.html', options, (info) => {
      that.setData({
        likeid: options.likeid,
        myrank: info
      })
    });
  },
  ranklist: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/ranklist.html', options, (info) => {
      if (info.rankhead==false){
          that.setData({
            ismore:false
          })
      }else{
        that.setData({
          ranklist: info.ranklist,
          rankhead: info.rankhead,
          page: options.page
        })
      }

    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    let that=this;
    util.trySyncUserInfo();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ed4649',
    })
    let options=that.data.options
    that.myrank(options);
    options = $.extend({ page: 1 }, options);
    that.ranklist(options);
    wx.hideShareMenu();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
       let that=this;
       let options=that.data.options;
       let page = that.data.page;
       options=$.extend({page:++page},options);
       if(that.data.ismore){
         that.ranklist(options);
       }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})