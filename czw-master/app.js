//app.js
const app = getApp()

const APP_ID = 'wx53a85d543038233f';//输入小程序appid  
const APP_SECRET = 'e8a0fc0ccb67b1f8534a3fcbf78c52b7';//输入小程序app_secret  
let OPEN_ID = ''//储存获取到openid  
let SESSION_KEY = ''//储存获取到session_key
let openId = ''

App({
  data:{
    openId: ''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    let that = this
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data.openid)
            OPEN_ID = res.data.openid;//获取到的openid  
            openId = OPEN_ID
            SESSION_KEY = res.data.session_key;//获取到session_key  
            wx.setStorageSync("openid", res.data.openid);
          }
        })
      }
    }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        //console.log(res)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/coupon/coupon?id=123',
      imageUrl:'/pages/images/logo.png',
      success: function (res) {
        // 转发成功
        //console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getOpenIdTap: function () {
    var that = this;
    
  },
  globalData:{
    userInfo:null
  }
})