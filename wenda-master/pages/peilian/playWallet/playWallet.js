// pages/peilian/receiveCoupon/receiveCoupon.js

import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    ifShowRule: false,
    closeIcon: "../../../images/wrong.png",
    balance: '',
    amount: "",
    targetAccount: '',
    list: []
  },

  onShow: function () {
    APP.login(this.gainData, this);
  },

  gainData: function () {
    wx.hideShareMenu();
    this.gainBalance();
  },

  gainBalance: function () {
    wx.request({
      url: APP_BASE + `help/user/wallet/info`,
      data: {
        sid: APP.globalData.sid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data;
        if (data.suc === '200') {
          this.setData({
            balance: data.data.balance / 100,
          })
        }
      }
    })
  },

  recharge: function () {
    mta.Event.stat("playwalletrecharge", {});
    wx.navigateTo({
      url: '../playRecharge/playRecharge',
    });
  },

  withdrawals: function() {
    mta.Event.stat("playwalletwithdrawals", {});
    if (this.data.balance < 1) {
      wx.showToast({
        title: '提现金额不能小于1元',
      });
      return;
    };
    this.setData({
      showTip: true
    })

  },

  tradeDetail: function() {
    mta.Event.stat("playwalletdetail", {});
    wx.navigateTo({
      url: '../playWalletList/playWalletList',
    });
  },

  playQuestion: function() {
    mta.Event.stat("playwalletquestions", {})
    this.setData({
      ifShowRule: true
    })
  },

  hideRules() {
    this.setData({
      ifShowRule: false
    })
  },

  confirm: function() {
    let errCodeObj = {
      'WA_ERROR_20000064': '提现金额不能超出账户余额',
      'WA_ERROR_20000065': '超过每日提现次数',
    };
    wx.request({
      url: APP_BASE + `help/user/wallet/cash`,
      data: {
        sid: APP.globalData.sid,
        amount: this.data.balance * 100,
        targetAccount: 2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data
        if (data.suc === '200') {
          this.setData({
            balance: data.data.balance / 100,
          })
        }
        else {
          wx.showToast({
            title: errCodeObj[data.errCode],
          })
        }
      }
    })
  },

  cancle: function() {
    this.setData({
      showTip: false
    })
  }

})