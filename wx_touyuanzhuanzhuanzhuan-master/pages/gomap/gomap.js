var amapFile = require('../../lib/amap-wx.js');//如：
var config = require('../../lib/config.js');
// gomap.js
Page({
  data: {
    markers: [{
      iconPath: "../../images/1.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    }, {
        iconPath: "../../images/1.png",
      id: 0,
      latitude: 39.96816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function () {
    var that = this;
    var model;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.setStorage({
          key: "local",
          data: res
        })
      }
    })
    var key = config.Config.key;
    wx.getStorage({
      key: 'local',
      success: function (res) {
        console.log(res.data)
        that.setData({
          markers: [{
            iconPath: "../../images/1.png",
            id: 0,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            width: 23,
            height: 33
          }, {
            iconPath: "../../images/1.png",
            id: 0,
            latitude: res.data.latitude+0.01,
            longitude: res.data.longitude+0.01,
            width: 24,
            height: 34
          }]
        })
        myAmapFun.getDrivingRoute({
          origin: res.data.longitude + ',' + res.data.latitude,
          destination: (res.data.longitude+0.01) + ',' + (res.data.latitude+0.0),
          success: function (data) {
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            that.setData({
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance: data.paths[0].distance + '米'
              });
            }
            if (data.taxi_cost) {
              that.setData({
                cost: '打车约' + parseInt(data.taxi_cost) + '元'
              });
            }

          },
          fail: function (info) {

          }
        })
      }
    })
   
    var myAmapFun = new amapFile.AMapWX({ key: 'afdfdefe14d15e05974ddbb7c0a76f93' });
    
  },
  goDetail: function () {
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  }
})