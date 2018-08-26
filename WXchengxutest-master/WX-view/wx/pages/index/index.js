//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    image1:'http://ruihe.99zan.net/Public/images/wx/wx_02.png',
    image2: 'http://ruihe.99zan.net/Public/images/wx/wx_03.png',
    image_tel:'http://ruihe.99zan.net/Public/images/wx/wx_05.jpg',
    title: '100元手机充值卡,免费带回家！',
    ener_num:'20',
    links:'../activity/activity',
    code:'',
  },
  //事件处理函数
  onLoad: function () {
    wx.showLoading({title:'数据加载中'})
    var that = this;
    if (app.globalData.userInfo) {
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
            hasUserInfo: true,
          })
        }
      })
    }
    wx.hideLoading()
  },
  getUserInfo: function(e) {
    console.log(app.globalData)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '哈尔滨优选送好礼',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})
