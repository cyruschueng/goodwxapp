var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    goodsUrl:app.globalData.goodsCover,
    array: ['均码'],
    index: 0,
    numValue: 1,
    goodsId:'',
    info:{},
    finNum:1,
    title:[],
    value:[]
  },
  intoCart: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '规格：' + that.data.array[that.data.index] + '---数量：' + that.data.numValue+'---确定要加入到购物车？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: app.globalData.url + 'addToCart.do',
          })
        }
      }
    })
    
  },
  navToPaypage: function () {
    var that = this
    wx.navigateTo({
      url: '/pages/paypage/paypage?numValue='+that.data.numValue
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  releaseBtn: function () {
    var that = this;
    if (that.data.numValue <= that.data.finNum) {
      this.setData({ numValue: that.data.finNum })
    } else {
      this.setData({ numValue: that.data.numValue - 1 })
    }
  },
  addBtn: function () {
    var that = this;
    this.setData({ numValue: that.data.numValue + 1 })
  },
  phoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '13515822327'
    })
  },
  onLoad: function (options) {
    this.setData({
      goodId:options.id
    })
    var that = this
    wx.request({
      url: app.globalData.api + 'getGoodsById.do',
      data: {
        id:options.id
      },
      method: 'GET', 
      header: {
        'content-type': 'application/json'
      }, 
      success: function(res){
        var spl = res.data.guige
        var array = res.data.cs.split('^')
        var gui = res.data.sguige.split(';')
        var title = []
        var value = []
        for(var i=0;i<array.length;i++){
          title[i] = array[i].substring(3,array[i].indexOf('%c'))
          value[i] = array[i].substring(array[i].indexOf('%c')+3,array[i].length)
        }
        var article = res.data.contexts
        WxParse.wxParse('article', 'html', article, that, 5);
        console.log(res)
        that.setData({
          info:res.data,
          numValue:res.data.initNum,
          finNum:res.data.initNum,
          title:title,
          value:value,
          array:gui
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  }
})