var aldstat = require('./utils/ald-stat.js')
var api = require('./utils/api.js');
//app.js
App({
  onLaunch: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let self = this;
    // 登录
    wx.login({
      success: res => {
        /** 将code值设置为全局变量*/
        self.globalData.wxCode = res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        self.authorize()
      },
      /**小程序加载失败，请重新删除小程序后重新进入 */
      fail: res => {
        // console.log('小程序调取wx.login()接口失败！');
      }
    })
  },
  authorize(){
    let self = this;
    // console.log('检查授权')
    // 检查用户授权信息状态，
    wx.getSetting({
      success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                // console.log('直接点击授权时，直接执行getUserInfo()方法')
                self.getUserInfo();
              },
              fail(){
                // console.log('授权失败时，重新设置授权信息');
                wx.openSetting({
                  success: res => {
                    res.authSetting = {
                      "scope.userInfo": true
                    }
                  },
                  /** 调用wx.openSetting()接口时失败，重新设置授权操作 */
                  fail: () => {
                    // console.log('调用wx.openSetting()接口时失败，重新设置授权操作')
                  },
                  complete() {
                    self.authorize();
                  }
                });
              }
            })
          }else{
            // console.log('已经授过权')
            self.getUserInfo();
          }
        },
        /**接口调用失败 */
        fail: res => {
          self.authorize();
          // console.log('wx.getSetting()接口调取失败，重新拉取授权信息')
        }
    })
  },
  /* 获取用户信息 */
  getUserInfo(){
    let self = this;
      // 用户已经同意小程序使用个人信息功能，后续调用 wx.getUserInfo 接口不会弹窗询问
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          // console.log(res)
          self.globalData.userInfo = res.userInfo;
          api.login({
            wxCode: self.globalData.wxCode,
            iv: res.iv,
            encryptedData: res.encryptedData
          }, result => {
            wx.hideLoading()
            self.globalData.unionid = result.data.unionid
            if (self.requestCallback){
              self.requestCallback(result.data.unionid);
            }
          })
        }
      })
  },
  onShow(){
    var updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调  
      // console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function (res) {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      // console.log('新版本下载失败');
    })
  },
  globalData: {
    userInfo: null,
    unionid: null,
    rank: null,
    wxCode: null
  }
})