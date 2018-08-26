// pages/peilian/receiveCoupon/receiveCoupon.js

import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    orderId: 'WTX-PL-T-T-10000815',
    id: '42',
    priceNum: '5',
    showRules: false,
    title: '',
    content: '',
    time: '',
    headImg: '',
    list: []
  },

  onLoad: function (options) {
    mta.Event.stat("getwelfarepage", {})
    mta.Event.stat("getcouponpage", {});
    this.setData({
      orderId: options.orderId,
      id: options.id
    })
  },

  onShow: function () {
    APP.login(this.gainData, this);
  },

  showRulesEv: function () {
    mta.Event.stat("clickcouponrulesbtn", {})
    this.setData({
      showRules: true
    })
  },
  hideRulesEv: function () {
    this.setData({
      showRules: false
    })
  },

  gainData: function() {
    wx.hideShareMenu();
    this.gainMyCoupon();
    this.gainList();
  },

  gainMyCoupon: function() {
    let id = this.data.id;
    if (id) {
      wx.request({
        url: APP_BASE + `help/coupon/${id}`,
        data: {
          sid: APP.globalData.sid,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          let data = res.data
          if (data.suc === '200') {
            this.setData({
              title: data.data.name,
              priceNum: data.data.value / 100,
              time: this.transferTime(data.data.expireTime * 1000),
              content: data.data.remark,
            })
          }
        }
      })
    }
  },

  gainList: function() {
    wx.request({
      url: APP_BASE + `help/coupon/redpacket/list`,
      data: {
        sid: APP.globalData.sid,
        orderId: this.data.orderId
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
          console.log(list)
          this.setData({
            list: list
          });
        }
        else {
          if (data.errCode === 'WA_ERROR_20000037') {
            wx.showToast({
              title: '订单未找到',
            })
          }
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

  experienceEv: function() {
    mta.Event.stat("experienceev", {})
    wx.switchTab({
      url: '../playIndex/playIndex',
    })
  }

})