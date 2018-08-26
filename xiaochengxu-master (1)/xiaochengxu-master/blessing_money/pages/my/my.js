//index.js
var app = getApp()

Page({
  data: {
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: 0,
    lastTapTimeoutFunc: null,
    hid: "",
    items: [],
    items1: [],
    sendMoney: '',
    sendCount: '',
    receivedMoney: '',
    receivedCount: '',
    showView: false,
    showView1: true,
    addClass: true,
    addClass1: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  globalData: {
    hid: "",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳成语一起猜
  chengyu: function () {
    wx.navigateToMiniProgram({
      appId: 'wx5607b839f208ffa9',
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
      //console.log("ok")
      }
    })
  },
  //跳炫美节日祝福
  xuanmei: function () {
    wx.navigateToMiniProgram({
      appId: 'wxdb8134b041fac10f',
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
      //console.log("ok")
      }
    })
  },
  //跳节日送祝福卡
  zhufuka: function () {
    wx.navigateToMiniProgram({
      appId: 'wxfcbc47403ed3876e',
      path: 'tc_card/pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
      //console.log("ok")
      }
    })
  },
  //跳转到提现
  returnMoney: function (res) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = res.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        // console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.navigateTo({
          url: '../returnMoney/returnMoney'
        })
      }
    } 
  },
  // 按钮触摸开始触发的事件
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },

  // 按钮触摸结束触发的事件
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },
  onShow: function (res) {
    var that = this
    that.setData({
      myCount: getApp().globalData.myCount,
    });
  },
  onLoad: function () {
    var that = this;
    this.setData({
      name: app.globalData.nickName,
      imgUrl: app.globalData.avatarUrl,
    });
    //请求余额接口数据
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/pay/mycount', //余额接口
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openId: getApp().globalData.openId,
      },
      success: function (res) {
        var res = res;
        that.setData({
          myCount: res.data.count.toFixed(2),
        })
      },
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //点击切换类
  header_left: function () {
    var that = this;
    that.setData({
      addClass: true,
      addClass1: false,
      showView: false,
      showView1: true,
    })
  },
  header_right: function () {
    var that = this;
    that.setData({
      addClass1: true,
      addClass: false,
      showView: true,
      showView1: false,
    })
  }

})
