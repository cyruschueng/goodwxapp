// pages/map/map.js

var app = getApp()
var isLoading = false;
var mapCtx = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 102.714444,
    latitude: 25.040952,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/img/icon81.png',
      position: {
        left: 5,
        top: 5,
        width: 48,
        height: 48
      },
      clickable: true
    }]
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    wx.navigateTo({
      url: '/pages/view/view?blogid=' + e.markerId
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },

  nextPage: function () {
    if (!isLoading) {
      if (this.data.markers && (this.data.markers.length % 30) == 0) {
        this.getPageData(1 + Number(this.data.markers.length / 30))
      }
    }
  },

  getDate: function (page) {
    var that = this
    isLoading = true
    app.showLoading()
    wx.request({
      url: app.globalData.baseURL + 'blog/nearby.action',
      data: {
        longitude: that.data.longitude,
        latitude: that.data.latitude,
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
        rows: 30,
        page: page || 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1 && res.data.content) {
          for (var i in res.data.content) {
            res.data.content[i].id = res.data.content[i].blogId
            res.data.content[i].callout = {
              content: res.data.content[i].shopName || res.data.content[i].title,
              color: '#576b95',
              fontSize: '14px',
              padding: '4rpx',
              display: 'ALWAYS'
            }
          }

          if (page > 1) {
            that.setData({
              markers: that.data.markers.concat(res.data.content || [])
            })
          } else {
            that.setData({
              markers: res.data.content
            })
          }
        }
      },
      complete: function (res) {
        app.hideLoading()
        isLoading = false
      }
    })
  },

  chooseLocation: function () {
    var that = this
    app.fxLogin(
      wx.getLocation({
        success: function (res) {
          console.log(res)
          if (res.latitude && res.longitude) {
            that.setData({
              latitude: Number(res.latitude),
              longitude: Number(res.longitude)
            })
            //that.mapCtx.moveToLocation()
            that.getDate(1)
          }
        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '定位失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    )
  },

  changeSetting: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '请授权您的地理位置，通过地图定位商家位置',
      showCancel: false,
      success: function (res) {
        console.log(res)
        wx.openSetting({
          success: function (res) {
            console.log(res)
            if (res.authSetting && res.authSetting['scope.userLocation']) {
              that.chooseLocation()
            } else {
              that.changeSetting()
            }
          },
          fail: function (res) {
            that.changeSetting()
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.chooseLocation()
            },
            fail() {
              that.changeSetting()
            }
          })
        } else {
          that.chooseLocation()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    mapCtx = wx.createMapContext('myMap')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    if (!isLoading) {
      this.getDate(1)
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})