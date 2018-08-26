var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    GoodsList:{}
  },

  onLoad: function (options) {
    app.load(this)
    var li = JSON.parse(options.li)
    li.cicon = li.cicon.split('#')
    var article = li.promsgcontent
    WxParse.wxParse('article', 'html', article, this, 5);
    this.setData({
      GoodsList: li
    })
    
  },

  onShow: function () {
  
  },

  duihuan:function(){
    var that = this
    if (app.globalData.integral < that.data.GoodsList.integral){
      wx.showToast({
        title: '您的积分不够哦！！',
        duration:1000,
        icon: 'success',
        image:'/img/60.png'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '确定要兑换吗？',
        success: function (res) {
          if (res.confirm) {
            var lis = [{
              buypron: 1, icon: that.data.GoodsList.icon, integralprice: that.data.GoodsList.integralprice, isdelete: 0, proid: that.data.GoodsList.msgId, proname: that.data.GoodsList.msgcontent, prostandard: that.data.GoodsList.prostandard,
              sellprice: that.data.GoodsList.sellprice
            }]
            wx.navigateTo({
              url: '/pages/payfor/payfor?ol=2&types=1&aol='+that.data.GoodsList.integral+'&sum=' + 0 + '&count=' + 1 + '&list=' + JSON.stringify(lis),
            })
          }
        }
      })
    }
    
    
  },

  onShareAppMessage: function () {
  
  }
})