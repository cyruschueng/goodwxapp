//app.js
import { userApi } from "utils/api/userApi";
App({
  // API请求host
  apiHost: 'http://item.diandong.com',
  // apiHost: 'http://item.dd-img.com',
  // 静态资源域名
  imgHost: 'http://i2.dd-img.com',
  // 接口调试模式，true:无缓存   false:有缓存
  apiDebug: false,
  // 缓存失效时间，单位秒
  expireTime: 3600,
  // 微信授权状态
  accredit: false,
  // 系统环境信息
  system: {},
  // 用户登录信息
  globalData: {
    userInfo: null,
    hasLogin: true
  },
  // 手机时间与服务器时间对比
  diffTime: 0,
  // 当前时间
  curTime:0,
  // 时间定时任务
  timerObj:'',
  // 时间同步
  timerAsync:'',

  onLaunch: function (ops) {
    console.log('appjs');
    var that = this;
    // 1. 获取手机系统信息
    this.system = wx.getSystemInfoSync();
    // 2. 同步服务器时间,1分钟同步一次
    that.timerAsync = setInterval(function(){
      that.getServerTime();
    }, 60000),
    // 3. 当前手机时间
    this.curTime = Date.parse(new Date()) / 1000

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 标识授权状态
              this.accredit = true;
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    if (ops.scene == 1044) {
      // 小程序在群里被打开后，获取情景值和shareTicket
      console.log(ops.shareTicket)
    }
  },
  // 与服务器时间同步
  getServerTime: function() {
    var that = this;
    // 获取当前时间(和服务器时间同步)
    var time = Date.parse(new Date()) / 1000;
    wx.request({
      url: that.apiHost + '/globals/server/time?t=' + Date.parse(new Date()),
      success: function (res) {
        let requestTime = Date.parse(new Date()) / 1000;
        let second = Math.round((requestTime - time) / 2);
        // 服务器时间
        let serverTime = parseInt(res.data.data.time) + second;
        // 获取服务器与手机时间差
        that.diffTime = serverTime - requestTime;
        // 计算当前时间
        if (that.diffTime < 0) {
          that.curTime = parseInt(Date.parse(new Date()) / 1000) - Math.abs(that.diffTime);
        } else {
          that.curTime = parseInt(Date.parse(new Date()) / 1000) + Math.abs(that.diffTime);
        }
        // 时间计时
        clearInterval(that.timerObj);
        that.timerObj = setInterval(function () {
          that.timer();
        }, 1000);
      }
    });
  },

  onShow: function() {
    this.getServerTime();

    // 用户授权获取登录信息
    this.userApi = new userApi(this);
    // this.userApi.wxlogin('cb_login');
    
  },
  // 时间计时
  timer: function(){
    var that = this;
    that.curTime++;
  },

  // 登录状态信息回调
  cb_login: function(res, opt) {
    if(!res.id){
      console.log('未绑定手机号');
      wx.reLaunch({
        url: '/pages/prize/detail/detail?login=0',
      })
    }
   
  },

  // 获取当前时间(与服务器时间同步)
  time: function() {
    var that = this;
    return that.curTime;
  },
})