// pages/peilian/receiveCoupon/receiveCoupon.js

import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    pageNum: 1,
    pageSize: 20,
    list: []
  },

  // onLoad: function (options) {
  //   mta.Event.stat("getwelfarepage", {})
  //   mta.Event.stat("getcouponpage", {});
  // },

  onShow: function () {
    APP.login(this.gainData, this);
  },

  gainData: function () {
    wx.hideShareMenu();
    this.gainList();
  },

  gainList: function () {
    wx.request({
      url: APP_BASE + `help/user/wallet/bills/${this.data.pageSize}/${this.data.pageNum}`,
      data: {
        sid: APP.globalData.sid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data
        if (data.suc === '200') {
          let list = data.data;
          list.forEach((item) => {
            item.createTime = this.transferTime(item.createTime * 1000);
          });
          this.setData({
            list: list
          });
        }
      }
    })
  },

  transferTime: function (time) {

    var now = time ? new Date(time) : new Date();
    var year = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDay = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();

    function _tranferDate(val) {
      return val < 10 ? '0' + val : val;
    }

    return `${_tranferDate(year)}-${_tranferDate(nowMonth)}-${_tranferDate(nowDay)} ${_tranferDate(hour)}:${_tranferDate(min)}`;

  },


})