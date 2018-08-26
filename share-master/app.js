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
    //this.getLocation();
    //this.getUserInfo();
  },
  getUserInfo() {
    return this.WxService.login()
    .then(data => {
      this.globalData.code = data.code;
      return this.WxService.getUserInfo()
    })
    .then(data => {
      console.log(data)
      this.globalData.userInfo = data.userInfo 
      var encryptedData = encodeURIComponent(data.encryptedData);//一定要把加密串转成URI编码
      var iv = data.iv;
      var code = this.globalData.code;
      // if (this.WxService.getStorageSync('token')) return
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
        content: '若不授权微信登录，则无法使用赚个车相关功能，点击重新获取授权，则可重新使用;如果当前页面需要获取公开信息，需要重新进入则可正常显示',
      })
      .then(res => {
        if (res.confirm) {
          //console.log('用户点击确定')
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
                  // if (this.WxService.getStorageSync('token')) return
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
                    this.WxService.setStorageSync('token', this.globalData.userInfo)
                  })
                  return this.globalData.userInfo
                })
              }
            })
          }
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }

      })
    }) 
  },
  getLocation() {
    this.WxService.chooseLocation()
    .then(data => {
      console.log(data)
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