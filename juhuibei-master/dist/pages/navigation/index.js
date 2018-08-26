var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { title: '驾车', content: '内容一', url: 'car_' },
      { title: '步行', content: '内容二', url: 'walk_' },
      { title: '公交', content: '内容三', url: 'bus_'  },
      { title: '骑行', content: '内容四', url: 'ride_' }
    ],
    activeKey: 0,
    markers: [],
    distance: '',
    cost: '',
    distance_walk: '',
    cost_walk: '',
    distance_ride: '',
    polyline: [],
    polyline_walk: [],
    polyline_ride: [],
    s_latitude: 0,
    s_longitude: 0,
    e_latitude: 0,
    e_longitude: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('position:',options)
    if (options.active_key) {
      this.setData({
        activeKey: options.active_key
      })
    }
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          s_latitude: res.latitude,
          s_longitude: res.longitude
        })
        let markers = [{
          iconPath: "../../common/assets/images/navigation/mapicon_navi_s.png",
          id: 0,
          latitude: that.data.s_latitude,
          longitude: that.data.s_longitude,
          width: 23,
          height: 33
        }, {
          iconPath: "../../common/assets/images/navigation/mapicon_navi_e.png",
          id: 0,
          latitude: options.latitude,
          longitude: options.longitude,
          width: 24,
          height: 34
        }];
        that.setData({
          markers: markers,
          e_latitude: options.latitude,
          e_longitude: options.longitude
        });

        myAmapFun.getDrivingRoute({
          origin: that.data.s_longitude + ',' + that.data.s_latitude,
          destination: that.data.e_longitude + ',' + that.data.e_latitude,
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

          }
        });

        myAmapFun.getWalkingRoute({
          origin: that.data.s_longitude + ',' + that.data.s_latitude,
          destination: that.data.e_longitude + ',' + that.data.e_latitude,
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
              polyline_walk: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance_walk: data.paths[0].distance + '米'
              });
            }
            if (data.paths[0] && data.paths[0].duration) {
              that.setData({
                cost_walk: parseInt(data.paths[0].duration / 60) + '分钟'
              });
            }

          },
          fail: function (info) {

          }
        });

        // 获取当前所在城市
        var city = '深圳市';
        myAmapFun.getRegeo({
          success: function (data) {
            city = data[0].regeocodeData.addressComponent.city;
          }
        })

        myAmapFun.getTransitRoute({
          origin: that.data.s_longitude + ',' + that.data.s_latitude,
          destination: that.data.e_longitude + ',' + that.data.e_latitude,
          city: city,
          success: function (data) {
           
            if (data && data.transits) {
              var transits = data.transits;
              for (var i = 0; i < transits.length; i++) {
                var segments = transits[i].segments;
                transits[i].transport = [];
                for (var j = 0; j < segments.length; j++) {
                  if (segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name) {
                    var name = segments[j].bus.buslines[0].name
                    if (j !== 0) {
                      name = '--' + name;
                    }
                    transits[i].transport.push(name);
                  }
                }
              }
            }
            console.log('bbbbbb', transits);
            that.setData({
              transits: transits
            });

          },
          fail: function (info) {

          }
        });

        myAmapFun.getRidingRoute({
          origin: that.data.s_longitude + ',' + that.data.s_latitude,
          destination: that.data.e_longitude + ',' + that.data.e_latitude,
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
              polyline_ride: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance_ride: data.paths[0].distance + '米'
              });
            }

          },
          fail: function (info) {

          }
        });

      }
    })
    
  },

  /**
   * 获取地理位置
   */
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          s_latitude: res.latitude,
          s_longitude: res.longitude
        })
      }
    })
  },

  onClick: function (e) {
    console.log(`ComponentId:${e.detail.componentId},you selected:${e.detail.key}`);
    const idx = e.detail.key;
    this.setData({
      activeKey: idx
    });
  },

  goCarDetail: function () {
    wx.navigateTo({
      url: '../navigation_car_detail/navigation'
    })
  },
  goWalkDetail: function () {
    wx.navigateTo({
      url: '../navigation_walk_detail/navigation'
    })
  },
  goRideDetail: function () {
    wx.navigateTo({
      url: '../navigation_ride_detail/navigation'
    })
  },
})