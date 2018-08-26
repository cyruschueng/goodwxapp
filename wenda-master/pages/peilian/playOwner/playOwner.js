import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    show: false,
    pageNum: 1,
    list: []
  },
  onLoad() {
    this.setData({
      show: false,
      pageNum: 1,
      list: []
    })
    APP.login(this.gainAll, this);
  },
  onShow() {
  },
  onReachBottom() {
    if (this.data.hasNextPage && !this.data.lock) {
      this.gainList();
      this.setData({
        lock: true
      })
      setTimeout(() => {
        this.setData({
          lock: false
        })
      }, 500)
    }
  },
  gainAll() {
    this.gainData();
  },
  gainData() {
    wx.request({
      url: APP_BASE + `/help/user/training/info`,
      data: {
        sid: APP.globalData.sid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data;
        if (data.suc === '200') {
          let nowData = data.data;
          this.setData({
            headerImg: nowData.avatarUrl,
            headerName: nowData.nickName,
            headerNum: nowData.totalGameNumber,
            headerRate: nowData.successRate,
            cardNum: nowData.usableCouponNum,
            show: true,
            walletMoney: (nowData.walletBalance / 100).toFixed(2)
          })
        }
      }
    })
  },
  doubleDate: function (num) {
    return num < 10 ? '0' + num : num
  },
  toDetail(e) {
    mta.Event.stat("playtodetail", {})
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId=' + e.currentTarget.dataset.id,
    })
  },
  toListEv() {
    mta.Event.stat("playownertolist", {});
    wx.navigateTo({
      url: '../playOrderList/playOrderList',
    })
  },
  toCardEv() {
    mta.Event.stat("playownertocard", {});
    wx.navigateTo({
      url: '../playCoupon/playCoupon',
    })
  },
  toWalletEv() {
    mta.Event.stat("playownertowallet", {});
    wx.navigateTo({
      url: '../playWallet/playWallet',
    })
  },
  toQuestionEv() {
    mta.Event.stat("playownertoquestion", {});
    wx.navigateTo({
      url: '../playQuestion/playQuestion',
    })
  }
})