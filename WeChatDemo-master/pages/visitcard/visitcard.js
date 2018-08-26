// pages/visitcard/visitcard.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '../../image/1.png',
    mode: 'scaleToFill',
    topimg: app.globalData.imgurl,
    info: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    wx.showLoading({
      title: '加载中',
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    var openid = wx.getStorageSync('openid');
    if (openid == '') {
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        wx.request({
          url: app.globalData.url + 'apiUserInfo',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
            if (app.globalData.userInfo) {
              _this.setData({
                userInfo: app.globalData.userInfo,
              })
            } else {
              wx.getUserInfo({
                success: res => {
                  app.globalData.userInfo = res.userInfo
                  _this.setData({
                    userInfo: res.userInfo,
                  })
                }
              })
            }
            if (res.data.name != "" && res.data.name != "null" && res.data.name != null) {
              _this.setData({
                info: res.data
              })
            } else {
              wx.reLaunch({
                url: '../personal/personal',
              })
            }
            wx.hideLoading();
          },
          fail: function (res) {
          }
        })
      }
    } else {
      wx.request({
        url: app.globalData.url + 'apiUserInfo',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
          if (app.globalData.userInfo) {
            _this.setData({
              userInfo: app.globalData.userInfo,
            })
          } else {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                _this.setData({
                  userInfo: res.userInfo,
                })
              }
            })
          }
          if (res.data.name != "" && res.data.name != "null" && res.data.name != null) {
            _this.setData({
              info: res.data
            })
          } else {
            wx.redirectTo({
              url: '../personal/personal',
            })
          }
          wx.hideLoading();
        },
        fail: function (res) {
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var _this = this;
    if (res.from == 'button') {
      // 来自页面内转发按钮
      return {
        title: '校友会',
        path: 'pages/mycard/mycard?userid=' + _this.data.info.id,
        success: function (res) {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 1000
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '分享失败',
            icon: 'success',
            duration: 1000
          })
        }
      }
    }
  },
  editCard: function(e){
    wx.navigateTo({
      url: '../personal/personal'
    })
  }
})