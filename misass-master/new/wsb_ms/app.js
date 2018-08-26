//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
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
  },
 
  globalData: {
    userInfo: null,
    sonId:null,
  }
})






/**************
 * tab切换
 * index          //首页
 * message        //消息
 * list           //保单管理
 * me             //我的
 * 
 * page
 * 
 * insure        //投保
 * policyview    //投保单预览
 * zapay         //众安收银台
 * view          //查看订单详情
 * account       //账号信息
 * policymsg     //投保人信息
 * policyadd     //新增投保人信息
 * policyedit    //编辑投保人信息
 * assuredmsg     //被保险人信息
 * assuredadd     //新增保险人信息
 * assurededit    //编辑保险人信息
 * keyboard      //编辑车牌
 * organize      //组织管理
 * addsonaccount  //添加子账号
 * invitation     //收到邀请
 * 
*/