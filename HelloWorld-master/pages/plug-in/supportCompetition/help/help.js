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
    helplike: null,
    like: null,
    helphead: null,
    ishelp: false,
    disable: false,
    options: {},
    helpuser: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('user_info');
    let uid = userinfo.uid;
    if (uid == options.userid) {
      wx.reLaunch({
        url: '/pages/plug-in/supportCompetition/index/index',
      })
    }
    let that = this;
    that.setData({
      options: options
    }, function () {
      util.trySyncUserInfo();
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ed4649',
      })
      that.helpuserinfo(options);
      wx.hideShareMenu();
    })
  },
  helpuserinfo: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/IndexApi/index.html', options, (info) => {
      if (info.mylike == false) {
        wx.reLaunch({
          url: '/pages/plug-in/supportCompetition/index/index',
        })
      } else {
        that.setData({
          like: info,
          helplike: info.myinfo,
          likeid: info.id,
          ishelp: info.myhelp
        }, function () {
          that.helpheadlist(options);
        })
      }
    });
  },
  helpheadlist: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/gethelolikehead.html', options, (info) => {
      that.setData({
        helphead: info
      })
    });
  },

  toindex: function () {
    wx.reLaunch({
      url: '/pages/plug-in/supportCompetition/index/index',
    })
  },
  help: function () {
    let that = this;
    that.setData({
      disable: true,
    }, function () {
      let options = that.data.options;
      requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/helplike.html', options, (info) => {
        that.setData({
          helpuser: info
        })
      });
    })
  },
  hidehelp: function () {
    let that = this;
    that.setData({
      helpuser: false
    }, function () {
      let options = that.data.options;
      that.helpuserinfo(options);
    })
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
    let that = this;
    util.trySyncUserInfo();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ed4649',
    })
    let options = that.data.options;
    that.helpuserinfo(options);
    wx.hideShareMenu();
    wx.stopPullDownRefresh();
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

  }
})