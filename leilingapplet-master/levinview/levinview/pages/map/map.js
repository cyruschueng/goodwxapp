// map.js
var app = getApp()
Page({
  data: {
    imagesUrl: app.data.picUrl,
    // map
    latitude: "",
    longitude: "",
    markers: [],
    dealerinfo: {},
    points: [],
    iS: 0,
    options: '',
    city: ''
  },
  // 点击地图
  markertap: function (e) {
    var dealer = this.data.dealerinfo
    var markers = this.data.markers
    for (var k = 0; k < dealer.length; k++) {
      if (k == e.markerId) {
        dealer[e.markerId].checked = true
        markers[e.markerId].iconPath = "/img/all.png"
        markers[e.markerId].callout.display = "ALWAYS"
      } else {
        dealer[k].checked = false
        markers[k].iconPath = "/img/special.png"
        markers[k].callout.display = "BYCLICK"
      }
    }
    this.setData({
      iS: e.markerId,
      dealerinfo: dealer,
      markers: markers,
    })
  },
  // radioChange
  radioChange: function (e) {
    var dealer = this.data.dealerinfo
    var markers = this.data.markers
    for (var k = 0; k < dealer.length; k++) {
      if (k == e.detail.value) {
        dealer[e.detail.value].checked = true
        markers[e.detail.value].iconPath = "/img/all.png"
        markers[e.detail.value].callout.display = "ALWAYS"
      } else {
        dealer[k].checked = false
        markers[k].iconPath = "/img/special.png"
        markers[k].callout.display = "BYCLICK"
      }
    }
    this.setData({
      iS: e.detail.value,
      dealerinfo: dealer,
      markers: markers,
      points: markers,
    })
  },
  close: function () {
    if (this.options.flag == 1) {
      wx.setStorage({
        key: 'city',
        data: this.data.city,
      })
    }
    wx.redirectTo({
      url: '../detail/detail?iS=' + this.data.iS + '&carid=' + this.options.carid + '&city=' + this.data.city,
    })
  },
  onLoad: function (options) {
    var that = this
    if (options.flag == 1) {
      // 获取位置
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          wx.request({
            url: app.data.requestUrl + '/leilingapplet/public/index.php/index/User/getdealerinfoAfterAuth/',
            data: { "latitude": res.latitude, longitude: res.longitude },
            success: function (res) {
              var error = res.data.error
              var address = res.data.dealerinfo
              var city = res.data.city
              if (error == 0) {
                var markers2 = []
                for (var i = 0; i < address.length; i++) {
                  // 设置 Markers
                  var obj = new Object()
                  var callout = new Object()
                  callout.content = address[i].dealer_name
                  callout.display = 'BYCLICK'
                  callout.padding = 5
                  obj.id = i
                  obj.iconPath = "/img/special.png"
                  obj.latitude = address[i].latitude
                  obj.longitude = address[i].longitude
                  obj.width = 30
                  obj.height = 30
                  obj.callout = callout
                  markers2.push(obj)
                  address[i].checked = false
                }
                address[options.iS].checked = true
                markers2[options.iS].iconPath = "/img/all.png"
                markers2[options.iS].callout.display = "ALWAYS"
                that.setData({
                  dealerinfo: address,
                  latitude: res.latitude,
                  longitude: res.longitude,
                  markers: markers2,
                  options: options,
                  points: markers2,
                  city: city
                })
              } else {
                that.setData({
                  markers: markers,
                  points: markers,
                  options: options,
                  dealerinfo: dealerinfo,
                  latitude: markers[0].latitude,
                  longitude: markers[0].longitude,
                })
              }
            }
          })
        },
        fail:function(){
          setTimeout(function(){
            wx.showToast({
              title: '定位失败,页面2s之后跳转',
            })
            wx.navigateBack({
              delta:1
            })
          },2000)
        }
      })
    } else {
      var markers = JSON.parse(options.markers)
      var dealerinfo = JSON.parse(options.dealerinfo)
      that.setData({
        markers: markers,
        points: markers,
        options: options,
        dealerinfo: dealerinfo,
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
      })
    }
  },
})