App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  setWindow: function (that) {
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          innerHeight: res.windowHeight,
          innerWidth: res.windowWidth
        })
      },
    })
  },
  getLocation: function (cb) {
    var that = this;
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.wxRequest('user/wx/getlocation.do', { latitude: res.latitude, longitude: res.longitude ,userid:wx.getStorageSync("openid")}, function (res) {
          if (res.code == 1) {
            typeof cb == "function" && cb({ location: res, latitude: latitude, longitude: longitude })
          } else {
            wx.showToast({
              title: '获取位置失败',
              image: '/img/60.png',
              duration: 800
            })
          }
        })
      },
    })
  },
  getUserInfo: function (cb,call) {
    var that = this;
    var userid = '';
    if(typeof cb == 'string' && cb != ''){
      userid = cb;
    }
    wx.setStorageSync('showCoupon', []);
    //微信登录接口
    wx.login({
      success: function (res) {
        that.wxRequest('user/wx/login.do', { code: res.code ,pid:userid}, function (res) {
          var info = JSON.parse(res.body);
          if (info.bz){     
            if(info.bz.type == 3){
              info.bz.tprice = info.bz.couponprice.substring(0, info.bz.couponprice.indexOf(','));
              info.bz.bprice = info.bz.couponprice.substring(info.bz.couponprice.indexOf(',') + 1, info.bz.couponprice.length);
            }
            var list = [];
            list.push(JSON.parse(info.bz));
            wx.setStorageSync('showCoupon', list);
          }
          wx.setStorageSync("openid", info.id);
          if (info.phone){
            wx.setStorageSync("phone", info.phone);
          }else{
            wx.setStorageSync("phone", '');
          }
          //微信获取用户信息接口
          wx.getUserInfo({
            withCredentials: false,
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              wx.setStorageSync("userInfo", res.userInfo)
              //后台更新用户信息接口
              that.wxRequest('user/wx/getusermsg.do', {
                id: info.id,
                wxname: res.userInfo.nickName,
                wximage: res.userInfo.avatarUrl,
                sex: res.userInfo.gender,
                province: res.userInfo.province,
                city: res.userInfo.city
              }, function (res) {

              })
              typeof cb == "function" && cb(that.globalData.userInfo);
              typeof call == "function" && call(that.globalData.userInfo);
            },
            fail: function (res) {
              wx.showModal({
                title: '提示',
                content: '请用微信登录',
                showCancel: false,
                success: function (res) {
                  wx.openSetting({
                    success: function () {
                      that.getUserInfo();
                    }
                  })
                }
              })
            }
          })
        })
      }
    })
  },
  //ip: 'http://10.151.3.155:8080/bigja/',
  //ip: 'http://192.168.5.69:8080/bigja/',
  ip:'https://www.tongzhuhe.com/bigja/',
  //ip:'https://www.medusachina.com/bigja/',
  globalData: {
    userInfo: null
  },
  wxRequest: function (url, data, success, fail, method) {
    var that = this;
    let _data = data || {};
    let _success = success || function (e) {
      console.log(e)
    };
    let _fail = fail || function (e) {
      console.log(e)
    };
    let _method = method || 'POST';
    let _header = { 'content-type': 'application/x-www-form-urlencoded' };

    if (_method.toUpperCase() == 'GET') {
      _header = { 'content-type': 'application/json' };
    }
    if (arguments.length == 2 && typeof _data == 'function') {
      _success = _data
    }
    wx.request({
      url: that.ip + url,
      method: _method,
      header: _header,
      data: _data,
      success: function (res) {
        if (typeof _success == 'function' && res.statusCode != 404 && res.statusCode != 500 && res.statusCode != 400) {
          console.log(`======== 接口 ${url} 请求成功 ========`);
          _success(res.data);
        } else {
          if (typeof _success != 'function') {
            console.log(`========  ${_success} 不是一个方法 ========`);
          }
          console.log(`======== 接口 ${url} 错误 ${res.statusCode} ========`);
        }
      },
      fail: function (res) {
        console.log(`======== 接口 ${url} 请求失败 ========`);
        if (typeof _fail == 'function') {
          _fail(res);
        }
      }
    });
  }
})