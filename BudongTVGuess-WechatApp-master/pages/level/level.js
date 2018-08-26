//  level.js

const app = getApp();
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const api = require('../../services/api.js');

Page({
  data: {
    coins: 0,
    avatarUrl: '',
    thumbEncourage: 'https://shenxu.name/tvguess/statics/images/level_encourage.png',
    thumbLoaded: 'https://shenxu.name/tvguess/statics/images/level_locked.png',
    thumbWidth: 0,
    thumbHeight: 0,
    levelIndex: 0,
    levelItems: [bus.level.none],
    goodsHave: false,
    goodsInfo: {}
  },
  onLoad: function () {

    this.setData({
      coins: bus.client.coins || 0,
      avatarUrl: bus.client.avatarUrl,
      thumbWidth: Math.floor(bus.system.windowWidth - 160),
      thumbHeight: Math.floor(bus.system.windowWidth - 160),
      goodsHave: bus.client.goodsHave,
      goodsInfo: bus.client.goodsInfo
    });
    this._setWX();
  },
  onShow: function(){

    var _this = this;

    api.level.all({}, function (data) {

      _this.setData({
        coins: bus.client.coins || 0,
        levelItems: data.data || []
      });
    });
  },
  onStore: function () {

    util.setNavigate('../goods/goods');
  },
  onShareAppMessage: function (res) {
    
    var _this = this;

    this.selectComponent('#coins').close();
    return api.wechat.share('level', res, function (data) {

      bus.client.coins = (bus.client.coins || 0) + (data.coins || 0);
      _this.setData({ coins: bus.client.coins || 0 });
      _this.selectComponent('#toast').show(data.coins, 'add');
    });
  },
  onCoins: function(){

    this.selectComponent('#coins').show(this.data.coins);
  },
  onRank: function(){

    var _this = this, levelInfo = this._currentLevel();
    if (levelInfo.locked){
      util.showToast('尚未解锁');
    } else {
      util.setNavigate('../rank/rank?' + util.serialize(this._currentLevel()));
    }
  },
  onCoutinue: function(){

    var _this = this, levelInfo = this._currentLevel();

    if (levelInfo.subjectAnswerCount >= levelInfo.subjectCount){
      api.level.restart({
        levelId: levelInfo.id || 0
      }, function(data){

        _this.data.levelItems[_this.data.levelIndex].subjectAnswerCount = 0;
        _this.setData({
          levelItems: _this.data.levelItems
        });
        util.setNavigate('../guess/guess?' + util.serialize(_this._currentLevel()));
      });
    } else {
      util.setNavigate('../guess/guess?' + util.serialize(_this._currentLevel()));
    }
  },
  onUnlock: function () {

    var _this = this, levelInfo = this._currentLevel();

    if (this.data.coins >= levelInfo.coins){
      api.level.unlock({
        levelId: levelInfo.id || 0
      }, function (data) {

        bus.client.coins = (bus.client.coins || 0) + (data.coins || 0);
        _this.selectComponent('#toast').show(data.coins, 'minus');
        _this.setData({
          coins: bus.client.coins
        });
        util.setNavigate('../guess/guess?' + util.serialize(levelInfo));
      });
    } else {
      util.showToast('咚豆不足');
    }
  },
  onGoPrev: function(){

    if (this.data.levelIndex > 0){
      this.setData({
        levelIndex: this.data.levelIndex - 1
      });
    }
  },
  onGoNext: function(){

    if (this.data.levelIndex < this.data.levelItems.length - 1) {
      this.setData({
        levelIndex: this.data.levelIndex + 1
      });
    }
  },
  _currentLevel: function(){

    var index = this.data.levelIndex || 0;
    return (index < this.data.levelItems.length ? (this.data.levelItems[index] || {}) : {});
  },
  _setWX: function(){

    wx.setNavigationBarTitle({
      title: '选择关卡'
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  }
})
