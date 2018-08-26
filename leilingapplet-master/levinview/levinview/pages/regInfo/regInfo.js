var app = getApp()
Page({
  data: {
    imagesUrl: app.data.picUrl,
    city: "选择城市",
    // 省市信息
    arrayPro: [],
    provinceInfo: [],
    arrayCity: [],
    cityInfo: [],
    show: true,
    photoURL: app.data.picUrl + "photo.jpg",
    // 性别
    arraySex: [
      { "sex": 0, "checked": true },
      { "sex": 1, "checked": false }
    ],
    iSex: 0,
    number: 50,
    // 登录
    showLogin: false,
    // 手机号
    mobile: "",
    mobileUser: '',
    // name
    name: "",
    // 验证码
    verifycode: "",
    verifycode1: "-1",
    // 传过来的参数
    options: null,
    // openid
    openid: '',
    // 地址
    val: [],
    // 是否显示获取验证码
    code: "",
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
    }
  },
  // 换头像
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

  bindSexChange: function (e) {
    this.setData({
      iSex: e.detail.value
    })
  },
  // 上一步
  pre: function () {
    var that = this
    var url = this.data.options.url
    wx.navigateBack({
      delta: 1
    })
  },
  // 预约
  yuyue: function () {
    var that = this
    var options = this.data.options
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请输入姓名',
      })
    } else if (this.data.verifycode1=="-1" && this.data.code == true) {
      wx.showToast({
        title: '请输入正确的验证码',
        image: '',
        duration: 2000
      })
    } else {
      var url = this.data.options.url
      if (url == "detail") {
        wx.request({
          url: app.data.requestUrl + '/leilingapplet/public/index.php/index/User/reservation/',
          data: {
            "name": that.data.name,
            "gender": parseInt(that.data.iSex) + 1,
            "telephone": that.data.mobile,
            "verificationcode": that.data.verifycode1,
            "model_code": options.model_code,
            "model_name": options.model_name,
            "city": that.data.city,
            "dealer_id": options.dealer_id,//车型4s店地址id
            "config_id": options.config_id,//车型配置id
            "car_model_id": options.car_model_id,//车型id
            "openid": that.data.openid,
            "flag": "add"
          },
          success: function (data) {
            if (data.data.error == "0") {
              wx.setStorage({
                key: 'mobile',
                data: that.data.mobile,
                verifycode1:''
              })
              wx.redirectTo({
                url: '../lookInfo/lookInfo?orderid=' + data.data.orderid + '&orderh5id=',
              })
            } else {
              wx.showToast({
                title: data.data.message,
              })
            }
          }
        })
      } else {
        update(that)
      }

    }
  },
  // 测试手机号
  testMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  testMobile1: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  testMobile2: function (e) {
    this.setData({
      code: true,
      mobile: e.detail.value
    })
  },
  // 键盘下拉
  keyDown: function (e) {
    var val = e.detail.value
    if (val.length == 4) {
      wx.hideKeyboard()
    }
  },
  // 测试姓名
  testName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 测试验证码
  testVerifycode: function (e) {
    this.setData({
      verifycode: e.detail.value
    })
  },
  testVerifycode1: function (e) {
    this.setData({
      verifycode1: e.detail.value
    })
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
    } else {
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
  onLoad: function (options) {
    var that = this
    this.setData({
      options: options
    })
    // 获取手机号
    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        that.setData({
          mobile: res.data,
          mobileUser: change(res.data),
          code: false
        })
      }, fail: function () {
        that.setData({
          code: true
        })
      }
    })
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        // 预约修改
        if (options.url == "lookInfo") {
          wx.request({
            url: app.data.requestUrl + '/leilingapplet/public/index.php/index/User/editreservation',
            method: "POST",
            data: { "openid": res.data },
            success: function (data) {
              var data = data.data.userinfo
              var arraySex = that.data.arraySex
              for (var k = 0; k < arraySex.length; k++) {
                arraySex[k].checked = false
              }
              arraySex[parseInt(data.gender) - 1].checked = true
              that.setData({
                name: data.nickename,
                iSex: parseInt(data.gender) - 1,
                mobile: data.telephone,
                arraySex: arraySex
              })
            }
          })
        }
      }
    })
    // 自动定位
    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.setData({
          city: res.data
        })
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
              mobileUser: change(_this.data.mobile),
              verifycode:''
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
// 修改预约信息
function update(that) {
  wx.request({
    url: app.data.requestUrl + '/leilingapplet/public/index.php/index/User/reservation/',
    data: {
      "name": that.data.name,
      "gender": parseInt(that.data.iSex) + 1,
      "telephone": that.data.mobile,
      "verificationcode": that.data.verifycode1,
      "openid": that.data.openid,
      "orderid": that.options.orderid
    },
    success: function (data) {
      if (data.data.error == "0") {
        wx.setStorage({
          key: 'mobile',
          data: that.data.mobile,
          verifycode1:''
        })
        wx.showToast({
          title: "信息修改成功",
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '../lookInfo/lookInfo?orderid=' + data.data.orderid + '&orderh5id=',
          })
        }, 2000)
      } else {
        wx.showToast({
          title: data.data.message,
        })
      }
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

