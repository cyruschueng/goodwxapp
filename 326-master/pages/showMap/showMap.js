
var util = require('../../utils/util.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:'',
    Mid:-1,
    windowWidth:'',
    latitude: 0,
    longitude: 0,
    scale:'',
    markers: [],
   
  },
  // 修改电站位置
  // 跳转到自定义位置
  mapModd: function () {
    var that = this;
      wx.chooseLocation({
        success: function (res) {
          that.setData({
            hasLocation: true,
            longitudeM: res.longitude,
            latitudeM: res.latitude,
          })
          var action = "&action=editPlant&plantid=" + that.data.webQueryPlants.pid + "&company-key=bnrl_frRFjEz8Mkn&address.lon=" + that.data.longitudeM + "&address.lat=" + that.data.latitudeM
          util.http_oper(encodeURI(action), function (err, dat, desc) {
            if (err == 0) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 1500
              })

              that.setData({
                longitude: res.longitude,
                latitude: res.latitude,
                markers: [
                  {
                    id: 0,
                    iconPath: "/images/mark.png",
                    longitude: res.longitude,
                    latitude: res.latitude,
                    width: 25,
                    height: 25
                  }
                ]
              })
            } else {
              util.errBoxFunc(that, err, desc)
            }
          }, function () {
            util.netWork(that)
          })
        },
        fail: function () {

        },
        complete: function () {

        }
      })
  },
  onSliderChange:function(e){
    var that = this;
    that.setData({
      scale: e.detail.value
    })
  },
  onTap(e) {

  },
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync("PlantIn") != "Adm"){
      wx.setStorageSync('PlantIn', 'listIn')
    }
    app.editTabBar2();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          scale:10
        })
      }
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
    var that=this
    var webQueryPlants = wx.getStorageSync('checkPlant')
    that.setData({
      webQueryPlants: webQueryPlants
    })
    if (webQueryPlants.address.lat && webQueryPlants.address.lon) {
      that.setData({
        longitude: webQueryPlants.address.lon,
        latitude: webQueryPlants.address.lat,
        markers: [
          {
            id: 0,
            iconPath: "/images/mark.png",
            longitude: webQueryPlants.address.lon,
            latitude: webQueryPlants.address.lat,
            width: 25,
            height: 25
          }
        ]
      })
    } else {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.setData({
            longitude: longitude,
            latitude: latitude,
            markers: [
              {
                id: 0,
                iconPath: "/images/mark.png",
                longitude: res.longitude,
                latitude: res.latitude,
                width: 25,
                height: 25
              }
            ]
          })
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
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})