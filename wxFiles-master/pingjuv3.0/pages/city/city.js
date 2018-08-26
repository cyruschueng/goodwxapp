var API = 'https://dateapp.superprism.cn/index.php/apiv1';
var city = require('../../utils/city.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    searchTitle: '搜索结果',
    cityTitle: '当前城市：',
    index: 0,
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,
    city: '宁波',
    city_code: '330200',
    nation: '中国',
    province: '浙江省',
    lat: 29.873470,
    lng: 121.546440,
    typesd: 'index',
    stop: '0',
    scrollTop: 0,
    ssss: 0,
    hotCity: [{ name: '宁波', id: '330200' }, { name: '北京', id: '110100' }, { name: '上海', id: '310000' }, { name: '广州', id: '440100' },
    { name: '苏州', id: '320500' }, { name: '南京', id: '320100' }, { name: '深圳', id: '440300' }, { name: '天津', id: '120100' },
    { name: '厦门', id: '350200' }, { name: '成都', id: '510100' }, { name: '西安', id: '610100' }, { name: '郑州', id: '410100' },],
    word: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
  },
  getCity: function () {
    var array = [];
  },
  onLoad: function (options) {
    this.setData({
      typesd: options.type
    });
    
    var that = this;
    qqmapsdk = new QQMapWX({ key: 'ITKBZ-5TDKW-VOSRT-O6DIL-ODQHJ-NSFTW' });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.setStorageSync('lat', res.latitude);
        wx.setStorageSync('lng', res.longitude);
        that.reverseGeocoder(res.latitude, res.longitude);
        setTimeout(function(){
          if (options.type == undefined ) {
          wx.switchTab({
            url: '/pages/index/index'
          });
          }
        },500)
        
      },
      error: function (res) {
        wx.setStorageSync('c_nation', that.data.nation);
        wx.setStorageSync('c_province', that.data.province);
        wx.setStorageSync('c_city', that.data.city);
        wx.setStorageSync('lat', that.data.lat);
        wx.setStorageSync('lng', that.data.lng);
      },
      fail: function (res) {
        wx.setStorageSync('c_nation', that.data.nation);
        wx.setStorageSync('c_province', that.data.province);
        wx.setStorageSync('c_city', that.data.city);
        wx.setStorageSync('lat', that.data.lat);
        wx.setStorageSync('lng', that.data.lng);
      }
    });

    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;

    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }

    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    });

    if (options.type == undefined && wx.getStorageSync('city') != '') {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }

  },
  reverseGeocoder: function (lat, lng) {
    var that = this;
    that.setData({ lat: lat });
    that.setData({ lng: lng });

    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng
      },
      success: function (res) {
        var nation = res.result.address_component.nation;
        that.setData({ nation: nation });
        var province = res.result.address_component.province;
        that.setData({ province: province });
        var c_city = res.result.address_component.city;
        c_city = c_city.replace('市', '');
        var city = wx.getStorageSync('city');
        if (!city) {
          that.setData({ city: c_city });
          wx.setStorageSync('city', c_city);
        }
        wx.setStorageSync('c_nation', res.result.address_component.nation);
        wx.setStorageSync('c_province', res.result.address_component.province);
        wx.setStorageSync('c_city', res.result.address_component.city);
        wx.setStorageSync('c_area', res.result.address_component.district);
        wx.setStorageSync('c_street', res.result.address_component.street);
        wx.setStorageSync('c_street_number', res.result.address_component.street_number);
        wx.setStorageSync('c_address', res.result.address);
      },
      fail: function (res) {
        wx.setStorageSync('c_nation', that.data.nation);
        wx.setStorageSync('c_province', that.data.province);
        wx.setStorageSync('c_city', that.data.city);
      },
      complete: function (res) {
      }
    });
  },
  search: function (e) {
    var keyword = e.detail.value;
    keyword = keyword.replace(/(^\s*)|(\s*$)/g, "");
    if (keyword != '') {
      this.setData({
        ssss: 1
      })
    } else {
      this.setData({
        ssss: 0
      })
    }
    if (keyword.length > 0) {
      var k = keyword.toUpperCase();
      var cityList = city.cityList();
      var cs = new Array();
      for (var i in cityList) {
        if (k == cityList[i].initial) {
          cs.push(cityList[i]);
          this.setData({ cityList: cs });
          break;
        } else {
          var ls = cityList[i].cityInfo;
          var ci = new Array();
          var exist = false;
          for (var c in ls) {
            var ct = ls[c];
            if (ct.city.indexOf(k) > -1 || ct.id.indexOf(k) > -1) {
              ci.push(ct);
              exist = true;
            }
          }
          if (exist) {
            cs.push({ initial: cityList[i].initial, cityInfo: ci });
          }
        }
      }
      this.setData({ cityList: cs });
    }
  },
  onReady: function () {
    var city = wx.getStorageSync('city');
    city = city.replace('市', '');
    this.setData({ city: city })
  },
  bindCity: function (e) {
    var types = this.data.typesd;
    console.log("types=" + types)
    if (types == undefined) {
      types = 'index';
      console.log(types)
    }
    
    var city = e.target.dataset.city;
    this.setData({ city: city });
    wx.setStorageSync('city', city);
    if (e.target.dataset.id) {
      wx.setStorageSync('city_code', e.target.dataset.id);
    }
    var str = "/pages/" + types + '/' + types;
    console.log(str)
    if(types == 'classify'){
      wx.navigateBack({
        delta: 1, 
      })
    }
    wx.switchTab({
      url: str,
    });
  },
  bindword: function (e) {
    var word = e.currentTarget.id.substring(0, 1);
    console.log(word);
    this.setData({
      stop: word,
      scrollTop: 100
    })
  }
})