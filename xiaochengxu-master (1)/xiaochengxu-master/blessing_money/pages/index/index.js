//index.js
//获取应用实例
const app = getApp()
var UTIL = require('../../utils/util.js');
var GUID = require('../../utils/GUID.js');
var NLI = require('../../utils/NLI.js');
//弹幕定时器
var timer;
var pageSelf = undefined;
var doommList = [];
class Doomm {
  constructor() {
    this.text = UTIL.getRandomItem(getApp().globalData.news);
    this.top = Math.ceil(Math.random() * 40);
    this.time = Math.ceil(Math.random() * 8 + 6);
    this.color = getRandomColor();
    this.display = true;
    let that = this;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);
      doommList.push(new Doomm());
      pageSelf.setData({
        doommData: doommList
      })
    }, this.time * 1000)
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  data: {
    doommData:[],
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: 0,
    lastTapTimeoutFunc: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: '微信小程序之祝福语包',
      desc: '一起来送上你的祝福吧!',
      path: '/pages/index/index',
      success: function (res) {
        //console.log(that.data.id)
      }
    }
  },
  initDoomm: function () {
    // doommList.push(new Doomm());
    // doommList.push(new Doomm());
    // doommList.push(new Doomm());
    this.setData({
      doommData: doommList
    })
  },
  //事件处理函数
  selectTheme: function(res) {
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
          url: '../selectTheme/selectTheme'
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
  onLoad: function (res) {
    pageSelf = this;
    this.initDoomm();
    if (app.globalData.userInfo) {
      //上传登录信息至服务器
      // wx.request({
      //   url: 'https://www.mqtp8.cn/wishis/onlogin/userData',
      //   method: 'POST',
      //   data: {
      //     openId: getApp().globalData.openId,
      //     nickName: getApp().globalData.nickName,
      //     avatarUrl: getApp().globalData.avatarUrl,
      //     city: getApp().globalData.city,
      //     country: getApp().globalData.country,
      //     gender: getApp().globalData.gender,
      //     language: getApp().globalData.language,
      //     province: getApp().globalData.province,
      //   },
      //   success: function (res) {
      //     //console.log("返回成功的数据:" + res.data) //返回的会是对象，可以用JSON转字符串打印出来方便查看数据  
      //     //console.log("返回成功的数据:" + JSON.stringify(res.data)) //这样就可以愉快的看到后台的数据啦  
      //   },
      // })
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
  }
})
