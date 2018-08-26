//  index.js

const app = getApp();
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const api = require('../../services/api.js');

Page({
  data: {
    goodsHave: false,
    goodsInfo: {},
    isLoading: true,
    lineHeight: 0
  },
  onLoad: function () {

    this.setData({ lineHeight: Math.floor(bus.system.windowWidth * .5 * .6 - 4) });
    this.selectComponent('#television').show(.5);
    this._setWX();
    this._authorize();
  },
  onShareAppMessage: function (res) {

    var _this = this;

    return api.wechat.share('index', res, function (data) {

      bus.client.coins = (bus.client.coins || 0) + (data.coins || 0);
      _this.selectComponent('#toast').show(data.coins, 'add');
    });
  },
  onStart: function(){

    if (!this.data.isLoading){
      util.setNavigate('../level/level');
    }
  },
  onContact: function(){

    util.setNavigate('../about/about');
  },
  onStore: function(){

    util.setNavigate('../goods/goods');
  },
  _authorize: function(){

    var _this = this;

    api.wechat.authorize(function (data) {
      
      util.setData(_this, 'isLoading', false);
      util.setData(_this, 'goodsHave', data.goodsHave);
      util.setData(_this, 'goodsInfo', data.goodsInfo);
    });
  },
  _setWX: function () {

    wx.showShareMenu({
      withShareTicket: true
    });
  }
})
