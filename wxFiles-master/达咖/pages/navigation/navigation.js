var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {}
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'qFbGsVhASUXTGeLaz4H243dpqjlDyg6W'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 发起POI检索请求 
    BMap.search({
      "query": '华楼街47号',
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      iconPath: '/img/marker_red.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '/img/marker_red.png'
    });
  },
  // showSearchInfo: function (data, i) {
  //   var that = this;
  //   that.setData({
  //     placeData: {
  //       title: '名称：' + data[i].title + '\n',
  //       address: '地址：' + data[i].address + '\n',
  //       telephone: '电话：' + data[i].telephone
  //     }
  //   });
  // },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "/img/marker_yellow.png";
      } else {
        // 此处需要在相应路径放置图片文件 
        data[j].iconPath = "/img/marker_red.png";
      }
      markers[j](data[j]);
    }
    that.setData({
      markers: markers
    });
  }
})