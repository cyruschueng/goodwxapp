//  index.js

const app = getApp();
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const api = require('../../services/api.js');

Page({
  data: {
    clientCount: 0
  },
  onLoad: function (options) {

    var _this = this;

    api.about.review({}, function(data){

      _this.setData({
        clientCount: data.clientCount || 0
      });
    });
  },
  onShareAppMessage: function (res) {

    var _this = this;

    return api.wechat.share('rank', res, function (data) {
      _this.selectComponent('#toast').show(data.coins, 'add');
    }, this.data.levelInfo);
  },
  _setWX: function () {

    wx.setNavigationBarTitle({
      title: '关于 - 猜电视'
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  }
})
