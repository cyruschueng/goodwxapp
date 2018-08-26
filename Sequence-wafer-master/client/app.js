const qcloud = require('./libs/wafer2-client-sdk/index')
const config = require('./config.js')
const util = require('./utils/util.js')

App({
  onLaunch: function (ops) {
    // 当情景值为 1044，即通过带 shareTicket 的微信群分享卡片进入小程序
    if (ops != null && ops.scene == 1044) {
      this.globalData.shareTicket = ops.shareTicket
    }
    // 初始化客户端的登录地址，以支持所有的会话操作
    qcloud.setLoginUrl(config.loginUrl)
  },

  /**
    * 登录
    */
  login: function (loginSuccess, updateSuccess, loginFail) {
    if (this.globalData.user != null) {
      typeof loginSuccess == "function" && loginSuccess()
      typeof updateSuccess == "function" && updateSuccess()
      return
    }
    var that = this
    // wx.getSetting({
    //   success: res => {
    //     if (!res.authSetting['scope.userInfo']) {
    //       util.hideLoading()
    //       typeof loginFail == "function" && loginFail()
    //       return
    //     }
    // 已经授权，可以直接登录
    qcloud.login({
      loginSuccess(res) {
        console.log('登录成功', res)
        that.globalData.user = res
        that.globalData.hasLogin = true
        typeof loginSuccess == "function" && loginSuccess()
      },
      updateSuccess(res) {
        console.log('更新用户信息成功', res)
        that.globalData.user = res
        that.globalData.hasUpdate = true
        typeof updateSuccess == "function" && updateSuccess()
      },
      fail(err) {
        typeof loginFail == "function" && loginFail()
        console.log('登录失败', err)
      }
    })
    // }
    // })
  },

  globalData: {
    user: null,
    hasLogin: false,
    hasUpdate: false,
    shareTicket: "",
    refreshSequenceList: false
  }
})
