import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    show: false,
    pageNum: 1,
    list: [],
    instructionsModalFlag: true,
    invalid: false,
    from: false,
    cardId: 'none',
    cardValue: '',
    cardName: '',
    confirmFlag: true,
    blankFlag: false,
    cardUsed: 'true',
    id: ''

  },
  onShow() {
    APP.login(this.gainAll, this);
  },
  onLoad(options) {
    var from = false;
    var id = '';
    var cardUsed = 'true';
    if (options.from) {
      cardUsed = wx.getStorageSync('cardUsed') || 'true';
      from = options.from;
    }
    if (options.id) {
      id = options.id;
    }
    this.setData({ from, id, cardUsed });
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
    this.gainList();
  },
  gainList() {
    wx.request({
      url: APP_BASE + `/help/coupon/list/20/${this.data.pageNum}`,
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
          if (nowData.list.length) {
            var cardId = 'none';
            var cardValue = '';
            var cardName = '';
            var confirmFlag = true;
            if (this.data.from) {   //如果页面
              confirmFlag = false;
            }
            nowData.list.map((item, index) => {
              var invalid = false;
              if (item.isUsed || item.isExpire) {
                invalid = true;
              }
              item.invalid = invalid;
              item.chosed = false;
              if (!invalid && (this.data.id == item.id)) {
                if (this.data.cardUsed == 'true') {
                  cardId = item.id;
                  cardValue = item.value;
                  cardName = item.name;
                  item.chosed = true;
                }

              }
              item.expireTime = item.expireTime ? `有效期至 ${this.transferTime(item.expireTime * 1000)}` : '永久有效';
            })
          } 
          else {
            if (this.data.pageNum == 1) {
              var blankFlag = true;
            }
          }
          let newList = this.data.list.concat(nowData.list);
          this.setData({
            total: nowData.total,
            hasNextPage: nowData.hasNextPage,
            pageNum: ++this.data.pageNum,
            show: true,
            list: newList,
            cardId,
            cardValue,
            cardName,
            confirmFlag,
            blankFlag
          })
        }
      }
    })
  },
  couponListEv: function (ev) {
    var target = ev.currentTarget;
    if (!this.data.from) {
      return;
    }

    var cardId = target.dataset.id;
    var cardValue = target.dataset.value;
    var cardName = target.dataset.name;
    var invalid = target.dataset.invalid;
    var chosed = target.dataset.chosed;

    if (invalid) {
      return;
    }

    var list = this.data.list;
    if (chosed) {
      list.map((item, index)=>{
        if (item.chosed) {
          item.chosed = false;
        }
      })
      cardId = 'none';
      cardValue = null;
      cardName = null;
    }
    else {
      list.map((item, index) => {
        if (item.id == cardId) {
          item.chosed = true;
        }
        else {
          item.chosed = false;
        }
      })
    }
    this.setData({
      list,
      cardId,
      cardValue,
      cardName,
    })
  },
  confirmEv: function () {
    var data = this.data;
    var cardUsed = 'true';
    if (data.cardId == 'none') {
      cardUsed = 'false';
    }
    wx.setStorageSync('cardUsed', cardUsed);
    wx.redirectTo({
      url: `../confirmOrder/confirmOrder?cardId=${data.cardId}${data.cardName ? `&cardName=${encodeURIComponent(data.cardName)}` : ''}${data.cardValue ? `&cardValue=${data.cardValue}` : ''}`
    })
  },
  transferTime: function (time) {

    var now = time ? new Date(time) : new Date();
    var year = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDay = now.getDate();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    var value = '';
    function _tranferDate(val) {
      return val < 10 ? '0' + val : val;
    }

    return `${_tranferDate(year)}-${_tranferDate(nowMonth)}-${_tranferDate(nowDay)} ${_tranferDate(hour)}:${_tranferDate(min)}:${_tranferDate(sec)}`;

  },
  instructionsEv: function () {
    this.setData({ instructionsModalFlag: false })
  },
  instructionsModalCloseEv: function () {
    this.setData({ instructionsModalFlag:true})
  }
})