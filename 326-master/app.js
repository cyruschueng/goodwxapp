var util = require('/utils/util.js');
App({
  data: {
    dayRankBox: []
  },
  onLaunch: function (options) {
    var that = this;
    that.deviceInfo = that.promise.getDeviceInfo();
    if (options.scene == '1044') {
      console.log('1044:')
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (appopts) {
          util.queryDecrypt(appopts, function (err, dat) {
            if (err == 0) {
              var openGIdPre = dat.data.split(',')[0].split(':')[1]
              var openGId = openGIdPre.substring(1, openGIdPre.length - 1);
              util.queryCode(function (resOpenid) { // 获取群发电量
                var globalData0 = util.wxCharCode()
                var urlShare = "&action=queryUsrEnergyPerDayMonthFromWxGroup&code=" + resOpenid.code + "&wxgroup=" + openGId + "&appid=" + globalData0.appid + "&secret=" + globalData0.secret;
                util.http_oper(encodeURI(urlShare), function (err, dat, desc) {
                  console.log("群成员参与排名：")
                  console.log(dat)
                  if (err == 0) {
                    wx.setStorageSync('shareDate', dat)
                  } else {
                    var errMsg = "err:+" + err + "," + desc
                    util.toast(that, errMsg)
                  }
                }, function () {
                  util.toast(that, '网络异常,稍后再试')
                }, function () {
                }, 'appidLogin')
              })
            }else{
              var errMsg = "err:+"+err+","+desc
              util.toast(that, errMsg)
            }
          }, function () {
          }, function () {
          }, 'appidLogin')
        },
        fail:function(){
          util.toast(that,'获得群ID失败')
        }
      })
    }
  },
  getLocationInfo: function (cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  //第一种状态的底部  
  editTabBar: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  // 底部导航
  editTabBar2: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  // 底部导航3
  editTabBar3: function () {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar3;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态    
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  // 底部导航end
  globalData: {
    userInfo: null,
    locationInfo: null,
    tabBar: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/list/list",
          "text": "总览",
          "iconPath": "/images/main3.png",
          "selectedIconPath": "/images/main4.png",
          "clas": "menu-item",
          "selectedColor": "#1169EE",
          active: true
        },
        {
          "pagePath": "/pages/center/center",
          "text": "我的账号",
          "iconPath": "/images/my4.png",
          "selectedIconPath": "/images/my3.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBar2: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/info/info",
          "text": "信息",
          "iconPath": "/images/plant_low.png",
          "selectedIconPath": "/images/plant_high.png",
          "clas": "menu-item2",
          "selectedColor": "#1169EE",
          active: true
        },
        {
          "pagePath": "/pages/showMap/showMap",
          "text": "地图",
          "iconPath": "/images/plant_map_low.png",
          "selectedIconPath": "/images/plant_map_hign.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/dataPage/dataPage",
          "text": "数据",
          "iconPath": "/images/plantdata_low.png",
          "selectedIconPath": "/images/plant_data_hign.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/device/device",
          "text": "设备",
          "iconPath": "/images/plant_device_low.png",
          "selectedIconPath": "/images/plant_device_hign.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/alarmPage/alarmPage?action=queryPlantWarning",
          "text": "告警",
          "iconPath": "/images/plant_alarm_low.png",
          "selectedIconPath": "/images/plant_alarm_hign.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    },
    tabBar3: {
      "color": "#9E9E9E",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/stationAdm/stationAdm",
          "text": "电站",
          "iconPath": "/images/tab_equipment_unchecked.png",
          "selectedIconPath": "/images/tab_equipment_checked.png",
          "clas": "menu-item2",
          "selectedColor": "#1169EE",
          active: false
        },
        {
          "pagePath": "/pages/user/user",
          "text": "用户",
          "iconPath": "/images/useA.png",
          "selectedIconPath": "/images/useAc.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/listAdm/listAdm",
          "text": "总览",
          "iconPath": "/images/plantdata_low.png",
          "selectedIconPath": "/images/plant_data_hign.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: true
        },
        {
          "pagePath": "/pages/deviceAdm/deviceAdm",
          "text": "设备",
          "iconPath": "/images/plant_device_low.png",
          "selectedIconPath": "/images/plant_device_hign.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/alarmPage/alarmPage?action=webQueryPlantsWarning",
          "text": "告警",
          "iconPath": "/images/plant_alarm_low.png",
          "selectedIconPath": "/images/plant_alarm_hign.png",
          "selectedColor": "#1169EE",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    }
  },
  promise: {
    getDeviceInfo: function () {//获取设备信息
      let promise = new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success: function (res) {
            resolve(res)
          },
          fail: function () {
            reject()
          }
        })
      })
      return promise
    }
  },
  getGid: (function () {//全局唯一id
    let id = 0
    return function () {
      id++
      return id
    }
  })()
})
