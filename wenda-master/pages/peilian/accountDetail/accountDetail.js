import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    show: false
  },
  onLoad(options) {
    if (options.orderId) {
      this.setData({ orderId: options.orderId});
    }
  },
  onShow() {
    APP.login(this.gainAll, this);
  },
  gainAll() {
    this.gainData();
  },
  gainData() {
    wx.request({
      url: APP_BASE + `help/wxgroup/orders`,
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
          let arr = data.data.groups;
          arr.map((item1, index) => {
            item1.orders.map((item2, index) => {
              let nowTime = new Date(item2.createTime * 1000);
              item2.createTime = nowTime.getFullYear() + '-' + this.doubleDate(nowTime.getMonth() + 1) + "-" + this.doubleDate(nowTime.getDate()) + " " + this.doubleDate(nowTime.getHours()) + ":" + this.doubleDate(nowTime.getMinutes()) + ":" + this.doubleDate(nowTime.getSeconds());
              
            })
          })
          this.setData({
            sum: data.data.balance / 100,
            groups: arr,
            show: true
          })
        }
      }
    })
  },
  doubleDate: function (num) {
    return num < 10 ? '0' + num : num
  }
})