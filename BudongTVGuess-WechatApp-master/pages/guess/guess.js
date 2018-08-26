//  guess.js

const app = getApp();
const util = require('../../utils/util.js');
const bus = require('../../utils/bus.js');
const api = require('../../services/api.js');
const words = require('./parts/words.js');;

Page({ 
  data: {
    coins: 0,
    timer: null,
    timeSecond: 0,
    timeText: '00:00',
    tipCount: 0,
    levelInfo: null,
    subjectId: 0,
    subjectTitle: '',
    subjectThumbUrl: '',
    subjectWords: '',
    subjectLast: false,
    titleIndex: 0,
    titleWords: [],
    allWords: []
  },
  onLoad: function (options) {

    this.setData({
      coins: bus.client.coins || 0,
      levelInfo: util.decodeParams(options)
    });
    this._setWX();
    this._next();
    this._count(0);
  },
  onUnload: function(){

    this.timer && clearInterval(this.timer);
    this.selectComponent('#player').stop();
  },
  onContinue: function(){

    this._next();
    this._count(1);
    this.selectComponent('#player').stop();
  },
  onReload: function(){

    this.selectComponent('#player').stop();
    this.setData({
      titleIndex: 0,
      titleWords: words.getTitleWord(this.data.subjectTitle),
      allWords: words.getAllWord(this.data.subjectWords)
    });
    this._clock();
  },
  onShareAppMessage: function (res) {

    var _this = this;

    this.selectComponent('#coins').close();
    this.selectComponent('#player').stop();
    return api.wechat.share('guess', res, function (data) {

      bus.client.coins = (bus.client.coins || 0) + (data.coins || 0);
      _this.setData({ coins: bus.client.coins || 0 });
      _this.selectComponent('#toast').show(data.coins, 'add');
    }, this.data.levelInfo);
  },
  onCoins: function () {

    this.selectComponent('#player').stop();
    this.selectComponent('#coins').show(this.data.coins);
  },
  onSkip: function(){

    var _this = this;

    this.selectComponent('#player').stop();
    if (this.data.subjectLast) {
      util.showToast('没有题目了');
    } else{
      if (this.data.coins >= 30) {
        api.subject.skip({
          subjectId: this.data.subjectId
        }, function (data) {

          bus.client.coins = (bus.client.coins || 0) + (data.coins || -30);
          _this._next();
          _this._count(1);
          _this.selectComponent('#toast').show(data.coins || -30, 'minus');
          _this.setData({
            coins: bus.client.coins
          });
        });
      } else {
        util.showToast('咚豆不足');
      }
    }
  },
  onTip: function () {

    var _this = this, titleTip = ((this.data.titleWords || [])[this.data.titleIndex] || {}).tip, allIndex = -1;
  
    if (this.data.coins >= 50){
      api.subject.tip({
        subjectId: this.data.subjectId
      }, function(data){

        for (let i = 0; i < _this.data.allWords.length; i++) {
          if (_this.data.allWords[i].tip == titleTip) {
            allIndex = i;
          }
        }
        bus.client.coins = (bus.client.coins || 0) + (data.coins || -30);
        _this.selectComponent('#toast').show('-50', 'minus');
        _this.setData({
          coins: bus.client.coins,
          subjectTips: (_this.data.subjectTips || 0) + 1
        });
        _this._choice(allIndex);
      });
    } else {
      util.showToast('咚豆不足');
    }
  },
  onTitleChoice: function(event){

    var _this = this, index = event.currentTarget.dataset['index'];

    if (this.data.titleWords[index].index > -1){
      words.resetTitleWord(
        index,
        this.data.titleWords,
        this.data.allWords,
        function (titleIndex, titleWords, allWords) {

          _this.setData({
            titleIndex: titleIndex,
            titleWords: titleWords,
            allWords: allWords
          });
        });
    }
  },
  onAllChoice: function (event) {

    this._choice(event.currentTarget.dataset['index'] || 0);
  },
  //  题目加 1
  _count: function(num){

    num = num || 0;
    
    this.data.levelInfo['subjectAnswerCount'] = (parseInt(this.data.levelInfo.subjectAnswerCount, 10) || 0) + num;
    this.setData({
      levelInfo: this.data.levelInfo
    });
    wx.setNavigationBarTitle({
      title: '第 ' + (this.data.levelInfo.subjectAnswerCount || 0) + ' / ' + (this.data.levelInfo.subjectCount || 0) + ' 题'
    });
  },
  //  启动计时器
  _clock: function () {

    var _this = this;

    _this.timer = setInterval(function () {

      _this.data.timeSecond = (_this.data.timeSecond || 0) + 1;
      _this.setData({
        timeSecond: _this.data.timeSecond,
        timeText: util.formatSpan(_this.data.timeSecond)
      });
    }, 1000);
  },
  //  选中文字
  _choice: function(index){

    var _this = this;

    if (index < 0 || index >= this.data.allWords.length){
      return ;
    }
    if (this.data.titleIndex < this.data.titleWords.length) {
      words.setTitleWord(
        this.data.titleIndex,
        this.data.titleWords,
        index,
        this.data.allWords,
        function (titleIndex, titleWords, allWords) {

          _this.setData({
            titleIndex: titleIndex,
            titleWords: titleWords,
            allWords: allWords
          });
        });
    }
    if (this.data.titleIndex >= this.data.titleWords.length) {
      this.timer && clearInterval(this.timer);
      this.data.subjectResult = words.getTitleResult(this.data.titleWords) ? 100: 101;
      this.selectComponent('#player').stop();
      api.subject.answer({
        subjectId: this.data.subjectId || 0,
        subjectResult: this.data.subjectResult || 0,
        subjectTips: this.data.tipCount || 0,
        subjectSeconds: this.data.timeSecond || 0
      }, function(){

        if (_this.data.subjectResult == 100) {
            if (_this.data.subjectLast) {
              util.setNavigate('../rank/rank?' + util.serialize(_this.data.levelInfo));
            } else {
              _this.selectComponent('#result').show(true, _this.data.subjectTitle, _this.data.subjectThumbUrl);
            }
          } else {
            _this.selectComponent('#result').show(false, _this.data.subjectTitle, _this.data.subjectThumbUrl);
          }
      });
    }
  },
  //  获取下一题
  _next: function () {

    var _this = this;

    api.subject.next({
      levelId: this.data.levelInfo.id || 0
    }, function (data) {

      _this.setData({
        timeSecond: 0,
        subjectId: data.id,
        subjectTitle: data.title,
        subjectThumbUrl: data.thumbUrl,
        subjectWords: data.words,
        subjectLast: data.isLast,
        subjectTips: 0,
        titleIndex: 0,
        titleWords: words.getTitleWord(data.title || ''),
        allWords: words.getAllWord(data.words || '')
      });
      _this.selectComponent('#player').ready(data.audioUrl, _this.data.levelInfo.coverUrl);
      _this._clock();
    });
  },
  _setWX: function () {

    wx.showShareMenu({
      withShareTicket: true
    });
  }
})
