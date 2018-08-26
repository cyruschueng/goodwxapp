//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    testms: 'from 火星',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    item: {
      index: 0,
      msg: 'message',
      time: '90/10/05'
    },
    item1: {
      index: 1,
      msg: 'message',
      time: '90/10/05'
    },
    item2: {
      index: 2,
      msg: 'message',
      time: '90/10/05'
    },
    imagesPath: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
            hasUserInfo: true
          })
        }
      })
    }

    // test request
    // wx.request({
    //   url: 'https://wx.qq.com',
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log('success')
    //   },
    //   fail: function () {
    //     console.log('fail')
    //   },
    //   complete: function () {
    //     console.log('complete')
    //   }
    // })
    
    // test request end
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickme: function () {
    this.setData({testms: 'modify text'})
  },
  // 显示提示框
  showToast: function () {
    console.log('show');
    wx.showToast({
      title: 'toast title',
      icon: 'success',
      durtaion: 2000
    })
  },
  // map 的方法
  // markertap： function () {
  //   console.log('点击地图')
  // }
  scan: function () {
    console.log('scan');
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  // 
  onReady : function () {},
  onShow: function () {
    console.log('show')
    console.log(getCurrentPages())
  },
  onHide: function () {},
  onUnload: function () {
    console.log('unload')
  },
  onPullDownRefresh: function () {
    console.log('pullDownRefresh')
  },
  onShareAppMessage: function () {
    // console.log('shareAppMessage')
    return {
      title: '体验版firstStream',
      path: '/pages/index/index'
    }
  },
  onTabltemTap: function () {
    console.log('click tab')
  },
  // go to packagea/five
  navAFive: function () {
    wx.navigateTo({
      url: '../../packagea/five/five',
    })
  },
  // chooseImage
  chooseImage: function () {
    // var path
    var that = this
    wx.chooseImage({
      count: 3,
      success: function (res) {
        console.log('suc')
        that.setData({
          imagesPath: res.tempFilePaths
        })
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.log('choose img complete')
      }
    })
  }
})
