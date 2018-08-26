
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
    // 登录
    showLogin: false,
    // 手机号
    mobile: "",
    mobileUser: "",
    // 验证码
    verifycode: "",
    // 首页广告位
    advertisementinfo: {},
    // openid
    openid: '',
    // 地址
    val: [],
    // 验证码倒计时
    yzm: "获取验证码",
    getCode: "getCode",
    // input  聚焦
    focus: false,
    color: "#621192",
    showrole: true,
    allCity:{},
    tiaoDetail:"tiaoDetail",
    alreadyTest:"alreadyTest",
    alreadyRe:"alreadyRe"

  },
  // 活动规则
  getRole: function () {
    this.setData({
      showrole: !(this.data.showrole)
    })
  },
  // 关闭活动规则
  closeRole: function () {
    this.setData({
      showrole: !(this.data.showrole)
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this
    wx.showNavigationBarLoading()
    load(that)
    setTimeout(function () {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    }, 1000)
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
      show: !(this.data.show),
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
  // 没有预约的跳转
  tiaoDetail: function (event) {
    var that = this
    that.setData({
      tiaoDetail:''
    })
    setTimeout(function(){
      that.setData({
        tiaoDetail: 'tiaoDetail'
      })
    },2000)
      var p = event.currentTarget.dataset.carid
      wx.navigateTo({
         url: '../detail/detail?carid=' + p + '&city=' + that.data.city 
      }) 
  },
  // 已预约的跳转
  alreadyRe: function (event) {
    var that = this
    that.setData({
      alreadyRe: ''
    })
    setTimeout(function () {
      that.setData({
        alreadyRe: 'alreadyRe'
      })
    }, 2000)
      wx.navigateTo({
        url: '../lookInfo/lookInfo?orderid=' + event.currentTarget.dataset.orderid + '&orderh5id=' + event.currentTarget.dataset.orderhid,
      })
  },
  //  灰色
  noclick: function () {
    wx.showToast({
      title: '半年内不能重复试驾',
    })
  },
  // 试驾完成
  alreadyTest: function () {
    var that = this
    that.setData({
      alreadyTest: ''
    })
    setTimeout(function () {
      that.setData({
        alreadyTest: 'alreadyTest'
      })
    }, 2000)
      wx.navigateTo({
        url: '../lookTestDriveInfo/lookTestDriveInfo'
      })
  },
  //  试驾审核中
  // testIng: function () {
  //   console.log("试驾审核中")
  // },
  //  审核成功
  // testSuccess: function () {
  //   console.log("审核成功")
  // },
  //  审核失败
  // testFail: function () {
  //   console.log("审核失败")
  // },
  bindChange: function (e) {
    var val = e.detail.value
    getCity(this, val[0], this.data.provinceInfo, val)

  },
  // 分享信息
  onShareAppMessage: function (res) {
    return {
      title: '预约试驾',
      path: '/page/index',
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (data) {
            console.log(data)
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    }
  },
  // 加载完就调用///////////////////////////////////
  onLoad: function () {
    var that = this
    load(that)
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
    var _this = this
    if (!(/^1[34578]\d{9}$/.test(_this.data.mobile))) {
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
            // input  聚焦
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
                  yzm: --index + "s",
                  color: "#ccc"
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

// 广告列表
function getAdList(data, that) {
  wx.request({
    url: app.data.requestUrl + 'leilingapplet/public/index.php/Index/Advertisement/getAdvertisement/',
    method: "POST",
    data: { "openid": data },
    success: function (d) {
      var tel = d.data.telephone
      var da = d.data.advertisementinfo
      if (tel != null && tel != undefined && tel != "") {
        wx.setStorage({
          key: 'mobile',
          data: tel,
        })
        that.setData({
          mobileUser: change(tel),
          mobile: tel
        })
      }
      that.setData({
        advertisementinfo: da
      })
    }
  })
}
// 获取市
function getCity(that, i, data, val) {
  var allCity=that.data.allCity
  var x
  var arr = []
  for (x in allCity) {
    if (x == data[i].province_code){
        var simpleCity=allCity[x]
        for(var k=0;k<simpleCity.length;k++){
          arr.push(simpleCity[k].city_name)
        }
    }
  }
       that.setData({
        arrayCity: arr,
        val: val
      })
}

// 获取不授权时用户省市
function getUserLocation(that) {
  wx.request({
    url: app.data.requestUrl + '/leilingapplet/public/index.php/index/User/getLocationInfo',
    method: "GET",
    success: function (res) {
      var error = res.data.error
      var city = ''
      if (error == 0) {
        city = res.data.city
      } else {
        city = "选择城市"
      }
      that.setData({
        city: city
      })
      wx.setStorage({
        key: 'city',
        data: city
      })
    }
  })
}

function load(that) {
  // 分享
  wx.showShareMenu({
    withShareTicket: true
  })

  // 自动定位
  wx.getStorage({
    key: 'city',
    success: function (res) {
      if(res.data==null||res.data==""){
        getUserLocation(that)
      }else{
        that.setData({
          city: res.data
        })
      } 
    }, fail: function () {
      getUserLocation(that)
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
  // huo获取省
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
  // 获取openid
  wx.getStorage({
    key: 'openid',
    success: function (res) {
      if(res.data==null||res.data==""){
        getOpenid(that)
      }else{
        that.setData({
          openid: res.data
        })
        getAdList(res.data, that)
      }  
    },
    fail: function () {
     getOpenid(that)
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

function getOpenid(that){
  wx.login({
    success: function (res1) {
      if (res1.code) {
        //发起网络请求
        wx.request({
          url: app.data.requestUrl + 'leilingapplet/public/index.php/index/User/getUserOpenid/',
          data: {
            code: res1.code
          },
          method: "POST",
          success: function (res) {
            var openid = res.data.openid;
            wx.request({
              url: app.data.requestUrl + 'leilingapplet/public/index.php/index/User/firstLogin',
              data: { "openid": openid },
              success: function (res2) {
                var error = res2.data.error
                if (error == 0) {
                  getAdList(openid, that)
                  wx.setStorage({
                    key: 'openid',
                    data: openid
                  })
                  that.setData({
                    openid: openid
                  })
                } else {
                  wx.showToast({
                    title: '出错了,不好意思',
                  })
                }
              },
            })

          }
        })
      }
    }, fail: function () {
      wx.showToast({
        title: '获取用户登录状态失败',
      })
    }
  })
}




