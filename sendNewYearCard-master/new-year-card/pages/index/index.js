//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    animationData: {},
    cardInfoList: [{
      cardUrl: '/images/1.png',
      cardType:1,
      // cardInfo: {
      //   cardTitle: '你',
      //   cardInfoMes: ['一月一送，浪漫节日送浪漫花']
      // }
    }, {
        cardUrl: '/images/2.png',
        cardType: 2,
      // cardInfo: {
      //   cardTitle: '你不',
      //   cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花']
      // }
    }, {
        cardUrl: '/images/3.png',
        cardType: 3,
      // cardInfo: {
      //   cardTitle: '你不知',
      //   cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      // }
    }]
  },
  //事件处理函数
  slideThis: function (e) {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation = animation;
    this.animation.translateY(-420).rotate(-5).translateX(0).step();
    this.animation.translateY(62).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  sendThis: function (e) {
    var type = e.target.dataset.cardtype;
    app.buyDetail = this.data.cardInfoList[e.target.id];
    wx.navigateTo({
      url: '../detail/detail?cardtype=' + type
    });
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  }
})
