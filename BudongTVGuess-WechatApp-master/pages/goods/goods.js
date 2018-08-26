//  index.js

const app = getApp();
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const api = require('../../services/api.js');

Page({
  data: {
    goods: []
  },
  onLoad: function (options) {

    var _this = this;

    api.store.goods({}, function (data) {

      _this.setData({
        goods: data.data
      });
    });
  },
  onTakeCoupon: function (event){

    wx.setClipboardData({
      data: event.currentTarget.dataset['taokouling'],
      success: function (res) {

        util.showToast('复制成功')
      }
    })
    api.store.take({
      goodsId: event.currentTarget.dataset['goodsid']
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
