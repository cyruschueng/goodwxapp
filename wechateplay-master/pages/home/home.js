//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '天命铲屎官',
    userInfo: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log("来自页面内转发按钮")
    } else {
      // 来自menu：右上角转发菜单	
      console.log("来自menu：右上角转发菜单	")
    }
    return {
      title: 'MrGao Title',//转发标题
      path: '/pages/index/index?id=123',//转发路径
      // imageUrl: '',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
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
      this.getUserInfo();
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.getStorageInfo({
          success: e => {
            console.log(e)
          }
        });
      },
      fail: res => {
        wx.getStorageInfo({
          success: e => {
            console.log(e)
          }
        });
        wx.clearStorage();
        //this.getUserInfo();
      }
    })
  },
  playStart: function(e){
    wx.navigateTo({
      url: '../single/single?id=1'
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
