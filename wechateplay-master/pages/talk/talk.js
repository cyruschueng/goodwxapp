//talk.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function () {
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
    wx.connectSocket({
      url: "pages/talk/talk",//开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],//子协议数组
      method: "GET",
      success: function () {
        // 成功回调
        console.log("Socket链接成功");
      },
      fail: function () {
        // 失败回调
        console.log("Socket链接失败");
      }
    });
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
  onReady: function (e) {
    console.log("第一次进入");
  },
  onShow: function (e) {
    console.log("显示");
  },
  onHide: function (e) {
    console.log("隐藏");
  },
  onUnload: function (e) {
    console.log("页面卸载");
  }
})
