var app = getApp()
Page({
  data: {
    imagesUrl: app.data.picUrl,
    city: "选择城市",
    // 地址
    val: [],
    // 省市信息
    arrayPro: [],
    provinceInfo: [],
    arrayCity: [],
    cityInfo: [],
    show: true,
    photoURL: app.data.picUrl + "photo.jpg",
    // 车信息
    carinfo: {},
    // 车型配置信息
    configurationinfo: {},
    dealerinfo: {},
    banner: [],
    indicatorDots: true,
    duration: 400,
    circular: true,
    content: [],
    arrayModel: [],
    arrayS: [],
    iModel: 0,
    iS: 0,
    // 电话
    tel: '',
    // 地址
    address: '',
    // 登录
    showLogin: false,
    // 手机号
    mobile: "",
    mobileUser: '',
    // 验证码
    verifycode: "",
    verifycode2: "2",
    openid: '',
    options: '',
    // 验证码倒计时
    yzm: "获取验证码",
    getCode: "getCode",
    // input  聚焦
    focus: false,
    color: "#621192",
    showrole: true,
    allCity: {}
  },
  // 活动规则
  getRole: function () {
    this.setData({
      showrole: !(this.data.showrole)
    })
  },
  closeRole: function () {
    this.setData({
      showrole: !(this.data.showrole)
    })
  },
  // 打电话
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    })
  },

  // 点击头像
  updatePhoto: function () {
    this.setData({
      showLogin: true
    })
  },
  close2: function () {
    this.setData({
      showLogin: false
    })
  },
  switchCity: function () {
    this.setData({
      show: (!this.data.show)
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    getCity(this, val[0], this.data.provinceInfo, val)
  },

  // 确定地址
  confirm: function () {
    if (this.data.val[0] == 0 || this.data.val[0] == 7) {
      this.setData({
        show: (!this.data.show),
      })
    } else {
      this.setData({
        show: (!this.data.show),
        city: this.data.arrayCity[this.data.val[1]],
      })
      wx.setStorage({
        key: 'city',
        data: this.data.arrayCity[this.data.val[1]],
      })
      getModel(this, this.data.arrayCity[this.data.val[1]])
    }
  },
  // 页面初始化 options为页面跳转所带来的参数 
  onLoad: function (options) {
    if (options.iS) {
      this.setData({
        options: options,
        iS: options.iS,
        city: options.city
      })
    } else {
      this.setData({
        options: options
      })
    }

    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      }
    })
    // 获取手机号
    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        that.setData({
          mobile: res.data,
          mobileUser: change(res.data)
        })
      }
    })
    // 获取定位
    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.setData({
          city: res.data
        })
        if (res.data == "选择城市") {
          getModel(that, '')
        } else {
          if (options.iS) {
            getModel2(that, res.data, options.iS)
          } else {
            getModel(that, res.data)
          }

        }

      },
    })
    //获取省
    wx.request({
      url: app.data.requestUrl + '/leilingapplet/public/index.php/index/User/getProvince',
      success: function (data) {
        var allCity = data.data.city
        var data = data.data.province
        var province = [];
        for (var i = 0; i < data.length; i++) {
          province.push(data[i].province_name)
        }
        that.setData({
          arrayPro: province,
          provinceInfo: data,
          allCity: allCity
        })
      }
    })
  },
  // 选择车型和4S店
  bindModelChange: function (e) {
    this.setData({
      iModel: e.detail.value
    })
  },
  bindSChange1: function () {
    wx.showToast({
      title: '请点击附近的店',
    })
  },
  bindSChange: function (e) {
    var dealer = this.data.dealerinfo
    if (dealer.length > 0) {
      for (var k = 0; k < dealer.length; k++) {
        dealer[k].checked = false
      }
      dealer[e.detail.value].checked = true
      this.setData({
        iS: e.detail.value,
        tel: this.data.dealerinfo[e.detail.value].tel,
        address: this.data.dealerinfo[e.detail.value].address,
        dealerinfo: dealer
      })
    }
  },
  // 下一步
  next: function () {
    if (this.data.city == "选择城市") {
      wx.showToast({
        title: '请先选择城市',
      })
    }else if (this.data.arrayS[this.data.iS] == undefined) {
      wx.showToast({
        title: '请先选择4S店',
      })
    }else {
      var that = this
      wx.navigateTo({
        url: '../regInfo/regInfo?model_code=' + that.data.carinfo.model_code + '&model_name=' + that.data.carinfo.model_name + '&car_model_id=' + that.data.configurationinfo[that.data.iModel].car_model_id + '&config_id=' + that.data.configurationinfo[that.data.iModel].id + '&dealer_id=' + that.data.dealerinfo[that.data.iS].id + '&url=detail',
      })
    }
  },
  // 地图显示
  showMap: function () {
    var _this = this
    if (_this.data.city == "选择城市") {
      wx.authorize({
        scope: 'scope.userLocation',
        success() {
          wx.redirectTo({
            url: '../map/map?carid=' + _this.options.carid + '&flag=1&iS=0',
          })
        },
        fail: function () {
          wx.showToast({
            title: '请点击左上角手动选择城市',
          })
        }
      })
    } else {
      wx.authorize({
        scope: 'scope.userLocation',
        success() {
          wx.redirectTo({
            url: '../map/map?carid=' + _this.options.carid + '&flag=1&iS=' + _this.data.iS,
          })
        },
        fail: function () {
          wx.showToast({
            title: '请点击左上角手动选择城市'
          })
          // wx.redirectTo({
          //   url: '../map/map?markers=' + JSON.stringify(_this.data.markers) + '&dealerinfo=' + JSON.stringify(_this.data.dealerinfo) + '&iS=' + _this.data.iS + '&carid=' + _this.options.carid + '&city=' + _this.data.city + '&flag=0',
          // })
        }
      })
    }
  },
  // 测试手机号
  testMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 测试验证码
  testVerifycode: function (e) {
    this.setData({
      verifycode: e.detail.value
    })
  },
  // 键盘下拉
  keyDown: function (e) {
    var val = e.detail.value
    if (val.length == 4) {
      wx.hideKeyboard()
    }
  },
  // 获取验证码
  getCode: function () {
    var _this = this;
    if (!(/^1[34578]\d{9}$/.test(this.data.mobile))) {
      wx.showToast({
        title: '手机号格式不正确',
        image: '',
        duration: 2000
      })
    }
    else {
      wx.request({
        url: app.data.requestUrl + 'leilingapplet/public/index.php/index/User/CreateVerificationCode/',
        method: "GET",
        data: { "telephone": _this.data.mobile },
        success: function (d) {
          var data = d.data.verifycode
          if (data == 0) {
            wx.showToast({
              title: '不好意思,请稍后重试',
            })
          } else {
            var index = 59
            _this.setData({
              yzm: index + "s",
              getCode: "",
              focus: true,
              color: "#ccc"
            })
            var timer = setInterval(function () {
              if (index == 1) {
                clearInterval(timer)
                _this.setData({
                  yzm: "获取验证码",
                  getCode: "getCode",
                  color: "#621192"
                })
              } else {
                _this.setData({
                  yzm: --index + "s"
                })
              }
            }, 1000)
          }
        }
      })
    }
  },
  // 账号登录
  user_login: function () {
    var _this = this
    if (this.data.verifycode.length == 0) {
      wx.showToast({
        title: '请输入验证码'
      })
    } else {
      wx.request({
        url: app.data.requestUrl + 'leilingapplet/public/index.php/index/User/userLogin',
        method: "POST",
        data: {
          'telephone': _this.data.mobile,
          'city': _this.data.city,
          'verificationcode': _this.data.verifycode,
          'openid': _this.data.openid
        },
        success: function (d) {
          var data = d.data
          if (data.error == 0) {
            wx.showToast({
              title: data.message,
              image: '',
              duration: 2000
            })
            _this.setData({
              showLogin: false,
              mobileUser: change(_this.data.mobile)
            })
            wx.setStorage({
              key: 'mobile',
              data: _this.data.mobile,
            })
          } else {
            wx.showToast({
              title: data.message,
              image: '',
              duration: 2000
            })
          }
        }
      })
    }
  }
})

// 获取市
function getCity(that, i, data, val) {
  var allCity = that.data.allCity
  var x
  var arr = []
  for (x in allCity) {
    if (x == data[i].province_code) {
      var simpleCity = allCity[x]
      console.log(simpleCity.length)
      for (var k = 0; k < simpleCity.length; k++) {
        arr.push(simpleCity[k].city_name)
      }
    }
  }
  that.setData({
    arrayCity: arr,
    val: val
  })
}



function getModel(that, city) {
  wx.request({
    url: app.data.requestUrl + 'leilingapplet/public/index.php/index/Car/getCar/',
    method: "POST",
    data: { 'car_model_id': that.data.options.carid, 'city': city },
    success: function (data) {
      var da = data.data.carinfo
      var description = data.data.carinfo.description
      var model = data.data.configurationinfo
      var address = data.data.dealerinfo
      if (address.length != 0) {
        var arr2 = []
        var markers = []
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
          markers.push(obj)
          arr2.push(address[i].dealer_name)
          address[i].checked = false
        }
        address[0].checked = true
        markers[0].iconPath = "/img/all.png"
        markers[0].callout.display = "ALWAYS"
        that.setData({
          dealerinfo: address,
          tel: address[0].tel,
          address: address[0].address,
          arrayS: arr2,
          latitude: address[0].latitude,
          longitude: address[0].longitude,
          markers: markers
        })
      } else {
        that.setData({
          tel: "",
          address: ""
        })
      }
      var arr = []
      for (var i = 0; i < model.length; i++) {
        arr.push(model[i].series_name)
      }
      that.setData({
        carinfo: da,
        configurationinfo: model,
        banner: da.banner_img.split(','),
        // 试驾车型
        arrayModel: arr,
        content: description
      })
    }
  })
}
function getModel2(that, city, iS) {
  wx.request({
    url: app.data.requestUrl + 'leilingapplet/public/index.php/index/Car/getCar/',
    method: "POST",
    data: { 'car_model_id': that.data.options.carid, 'city': city },
    success: function (data) {
      var da = data.data.carinfo
      var description = data.data.carinfo.description
      var model = data.data.configurationinfo
      var address = data.data.dealerinfo
      if (address.length != 0) {
        var arr2 = []
        var markers = []
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
          markers.push(obj)
          arr2.push(address[i].dealer_name)
          address[i].checked = false
        }
        address[iS].checked = true
        markers[iS].iconPath = "/img/all.png"
        markers[iS].callout.display = "ALWAYS"
        that.setData({
          dealerinfo: address,
          tel: address[iS].tel,
          address: address[iS].address,
          arrayS: arr2,
          latitude: address[0].latitude,
          longitude: address[0].longitude,
          markers: markers
        })
      } else {
        var arr3 = ["请先定位"]
        that.setData({
          arrayS: arr3,
          tel: "",
          address: ""
        })
      }
      var arr = []
      for (var i = 0; i < model.length; i++) {
        arr.push(model[i].series_name)
      }
      that.setData({
        carinfo: da,
        configurationinfo: model,
        banner: da.banner_img.split(','),
        // 试驾车型
        arrayModel: arr,
        content: description
      })
    }
  })
}
function change(str) {
  var s = ""
  for (var i = 0; i < 3; i++) {
    s += str[i];
  }
  for (var i = 3; i < 7; i++) {
    s += "*"
  }
  for (var i = 7; i < 11; i++) {
    s += str[i]
  }
  return s;
}
