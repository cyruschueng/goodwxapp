//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    a1src: '../../image/a1.png',
    a2src: '../../image/schedule.jpg',
    a3src: '../../image/a3.png',
    a4src: '../../image/a4.png',

    hotimg: '../../image/hot@2x.png',
    imgsrc: '../../image/beauti/wow.jpg',
    iconsrc: '../../image/usercount.png',
    jtsrc: '../../image/icon-jt.png',

    // 组播插件自动播放
    imgUrls: [
      '../../image/beauti/one.jpg',
      '../../image/beauti/two.jpg',
      '../../image/beauti/three.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    city:'郑州'
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
    };
    // 获取当前位置
    // this.fnGuessLocity();
    // wx.navigateTo({
    //   url: '../schedule/schedule',
    // })
  },
  onReady: function () {
  },
  onShow: function () {
    var _this = this;
    // _this.fnGuessLocity();
  },
  //获取当前位置
  fnGuessLocity: function () {
    var _this = this;
    wx.request({
      url: 'https://baidu.com',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          city: res.data['name']
        })
      }
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '教育模板首页',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        onsole.log("转发失败")
      }
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
