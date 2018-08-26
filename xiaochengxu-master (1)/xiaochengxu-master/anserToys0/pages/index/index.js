//index.js
//获取应用实例
var app = getApp()
const imgUrl = require('../../config').config.imgUrl;
const formIdUrl = require('../../config').config.formIdUrl;
const startplayUrl = require('../../config').config.startplayUrl;
const shareUrl = require('../../config').config.shareUrl;
const friendInfoUrl = require('../../config').config.friendInfoUrl;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    show1: false,
    items:[],
    img:''
  },
  //收集formid
  obtainFormId: function (e) {
    //console.log("543")
    var formId = e.detail.formId;
    wx.request({
      url: formIdUrl,
      method: 'POST',
      data: {
        openid: getApp().globalData.openid,
        fromid: e.detail.formId,
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //开始答题
  startplay: function () {  
    var _this = this  
    wx.request({
      url: startplayUrl,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        openid: getApp().globalData.openid,
      },
      success: function (res) {
        //console.log(res.data.code)
        if (res.data.code == 1){
          wx.navigateTo({
            url: '../content/content',
          })
        }else{
          _this.setData({
            show1:true
          })
        }
      }
    })
  },
  rules: function () {
    var that = this
    that.setData({
      show: true
    })
  },
  yincang: function () {
    var that = this
    that.setData({
      show: false
    })
  },
  yincang1: function () {
    var that = this
    that.setData({
      show1: false
    })
  },
  previewImage: function (e) {
    var img = e.currentTarget.dataset.img
    //console.log(img)
    var that = this
    that.setData({
      img: img,
    })
    wx.previewImage({
      //当前显示下表
      // current: this.data.items,
      //数据源
      urls: this.data.img.split(',')   
    })
  },   
  onLoad: function (options) {
    console.log(options)
    if (options.hid!=null){
      var hid = options.hid
      wx.request({
        url: friendInfoUrl,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          uopenid:hid,
          openid: getApp().globalData.openid
        },
        success: function (res) {
          console.log(res)
        }
      })
    }
    
    var that = this
    //分享群获得标签
    wx.showShareMenu({
      withShareTicket: true,
    })
    wx.request({
      url: imgUrl,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          items: res.data.data,
        })
      }
    })
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
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  //分享群
  onShareAppMessage: function (res) {
    console.log(getApp().globalData.openid)
    return {
      title: '答题送娃娃',
      path: '/pages/index/index?hid=' + getApp().globalData.openid,
      imageUrl: '../images/share_img.jpg',
      success: function (res) {
        console.log(res)
        var shareTickets = res.shareTickets;
        if (res.shareTickets == null) {
          wx.showModal({
            title: '分享失败',
            content: "需分享到群才能获得挑战机会哦~",
            showCancel: false,
            success: function (res) {
            },
          })
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            wx.request({
              url: 'https://yangzhiou.mqvt1.cn/yangziou/demo.php',
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              data: {
                sessionKey: getApp().globalData.session_key,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              success: function (res) {
                console.log(res.data)
                var gid = res.data
                wx.request({
                  url: shareUrl,
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  data: {
                    openid: getApp().globalData.openid,
                    jopenid: gid,
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data.code == 0) {
                      wx.showModal({
                        title: '分享失败',
                        content: res.data.msg,
                        showCancel: false,
                        success: function (res) {
                        },
                      })
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: '',
                        duration: 2000,
                        success: function (res) {
                          setTimeout(function () {
                            wx.reLaunch({
                              url: '../index/index',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
                            })
                          }, 2000) //延迟时间 这里是3秒  
                        },
                      })
                    }
                  },
                })
              },
            })
            //console.log(res)
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          },
          fail: function (res) {
            console.log("00000")
          }
        })
      },
      fail: function (res) {
        console.log("00000")
      }
    }
  }
})
