//app.js
import WxValidate from './assets/plugins/wx-validate/WxValidate'
import WxService from './assets/plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './etc/config'

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据 
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.getUserInfo();
    
  },
  getUserInfo () {
    return this.WxService.login()
    .then(data => {
      this.globalData.code = data.code;
      return this.WxService.getUserInfo()
    })
    .then(data => {
      this.globalData.userInfo = data.userInfo 
      this.WxService.getSetting()
      var encryptedData = encodeURIComponent(data.encryptedData);//一定要把加密串转成URI编码
      var iv = data.iv;
      var code = this.globalData.code;
      if (this.WxService.getStorageSync('token')) return
      this.WxService.showToast({
        title: '正在登录...',
        icon: 'loading',
        duration: 10000
      });
      this.HttpService.signIn({
        code: code,
        encryptedData: encryptedData,
        iv: iv,
      })
      .then(res => {
        const data = res.data
        this.WxService.hideToast();
        this.WxService.setStorageSync('token', 1)
      })
      return this.globalData.userInfo
    })
    .catch(data => {
      this.WxService.showModal({
        title: '警告',
        cancelText: '不授权',
        confirmText: '授权',
        content: '微信小程序在第一次调起授权之后 ，要重新再调起，需要自己手动删除程序 或者是退出小程序 等待一段时间再进去才能调起授权，这种情况用户体验比较差',
      })
      .then(res => {
        if (res.confirm) {
          console.log('用户点击确定')
          if (this.WxService.openSetting) {
            this.WxService.openSetting()
            .then(res => {
              if (res.authSetting["scope.userInfo"]) {
                this.WxService.getUserInfo()
                .then(data => {
                  this.globalData.userInfo = data.userInfo
                  var encryptedData = encodeURIComponent(data.encryptedData);//一定要把加密串转成URI编码
                  var iv = data.iv;
                  var code = this.globalData.code;
                  console.log(code)
                  if (this.WxService.getStorageSync('token')) return
                  this.WxService.showToast({
                    title: '正在登录...',
                    icon: 'loading',
                    duration: 10000
                  });
                  this.HttpService.signIn({
                    code: code,
                    encryptedData: encryptedData,
                    iv: iv,
                  })
                  .then(res => {
                    const data = res.data
                    this.WxService.hideToast();
                    this.WxService.setStorageSync('token', 1)
                  })
                })
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

      })
    }) 
  },
  globalData:{
    code: null,
    userInfo:null
  },
  renderImage(path) {
    if (!path) return ''
    if (path.indexOf('http') !== -1) return path
    return `${this.__config.domain}${path}`
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages), 
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(), 
  HttpService: new HttpService({
    baseURL: __config.basePath,
  }), 
  WxService: new WxService, 
  __config, 
})