//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '点击进入>',
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    imgUrls: [
      '../img/banner1.jpg',
      '../img/banner2.jpg',
      '../img/banner3.jpg'
    ],
    indicatorDots: true,
    indicatoractivecolor:"#ffffff",
    autoplay: true,
    circular:true,
    interval: 4000,
    duration: 1000,
    search_white_display: "none",
    searchbox:"static",
    search_focus:"false",
  },
 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //------------------intogame--------------------------
  intogame: function () {
    wx.navigateTo({
      url: '../game/first'
    })
  },
  
  //-----------------lunbo----------------------------------

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
//----------------onclick search---------------------------
searchimg_white:function () {
  this.setData({
    search_focus: "true",
    search_white_display: "none", 
    searchbox: "static", 
    })
  },

  hiddensearchbox:function(){
    this.setData({
      search_white_display: "static",
      searchbox: "none",
      search_focus: "false"
    })
  }

})