//  index.js

const app = getApp();
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const api = require('../../services/api.js');

Page({
  data: {
    levelInfo: null,
    clientItems: null
  },
  onLoad: function (options) {

    this.setData({
      levelInfo: util.decodeParams(options)
    });
    this._setWX();
    this._rank(options);
  },
  onForward: function(){

    var delta = 0;
    var pages = getCurrentPages();
    for (let i = pages.length-1; i > -1; i--){
      if (pages[i].route == 'pages/level/level'){
        break;
      }
      delta += 1;
    }
    wx.navigateBack({
      delta: delta
    });
  },
  onShareAppMessage: function (res) {

    var _this = this;

    return api.wechat.share('rank', res, function (data) {
      _this.selectComponent('#toast').show(data.coins, 'add');
    }, this.data.levelInfo);
  },
  _rank: function(options){

    var _this = this;

    api.level.rank({
      levelId: options.id
    }, function (data) {

      _this.setData({
        levelTimespan: util.formatSpan(data.subjectSeconds),
        levelEncourage: data.encourage,
        clientItems: data.data || []
      });
    });
  },
  _setWX: function () {

    wx.setNavigationBarTitle({
      title: '排行榜'
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  }
})
