// sdpages/peilian/getCoupon/getCoupon.js

import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    headImg: '',
    nickName: '',
    showRules: false,
    orderId: '',
    showPage: false
  },
  discountBtnEv: function() {
    mta.Event.stat("clickcouponbtn", {});
    var This = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              This.gainCoupon();
            },
            fail() {
              APP.login(This.gainData, This);
            }
          })
        }
        else {
          This.gainCoupon();
        }
      }
    })  
  },
  gainCoupon: function() {
    let orderId = this.data.orderId;
    wx.request({
      url: APP_BASE + `help/coupon/redpacket/grab`,
      data: {
        sid: APP.globalData.sid,
        orderId: orderId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data
        if (data.suc === '200') {
          if (data.data) {
            wx.redirectTo({
              url: `../receiveCoupon/receiveCoupon?orderId=${orderId}&id=${data.data.id}`,
            })
          }
          else {
            wx.redirectTo({
              url: `../receiveCoupon/receiveCoupon?orderId=${orderId}`,
            })
          }
        }
        else {
          if (data.errCode === 'WA_ERROR_20000037') {
            wx.showToast({
              title: '订单未找到',
            })
          }
          else if (data.errCode === 'WA_ERROR_20000026') {
            wx.showToast({
              title: '请重新领取',
            })
          }
        }
      }
    })
  },
  showRulesEv: function() {
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
    wx.request({
      url: APP_BASE + `help/coupon/redpacket/info`,
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
          if (data.data.isGot != 0) {
            this.gainCoupon();
          }
          else {
            this.setData({
              showPage: true,
              headImg: data.data.creator.avatarUrl,
              nickName: data.data.creator.nickName
            })
          }

        }
      }
    })
  },
  onLoad: function (options) {
    mta.Event.stat("getwelfarepage", {})
    this.setData({
      orderId: options.orderId
    })
  },

  onShow: function () {
    APP.login(this.gainData, this);
  },

  onShareAppMessage: function () {
    return {
      title: '老铁送福利！最高5元王者荣耀上分优惠券等您来领！',
      path: `/pages/peilian/getCoupon/getCoupon?orderId=${this.data.orderId}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})