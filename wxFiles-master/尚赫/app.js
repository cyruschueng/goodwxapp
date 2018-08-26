//app.js
App({
  onLaunch: function () {
    var that = this;
    this.getUserInfo(function(res){
      
      that.globalData.userInfo = res;
    })
    
  },
  getUserInfo(cb){
    var that = this;
    wx.login({
      success(res) {
        var code = res.code;
        wx.showNavigationBarLoading()
        that.post('user/info/wx/login', { js_code: code }, function (res) {
          var id = res.body.id;
          var openid = res.body.openid;
          wx.hideNavigationBarLoading()
          if (res.code == 1000) {
            wx.getUserInfo({
              success(res) {
                var userInfo = {
                  avatar: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName,
                  gender: res.userInfo.gender,
                  id: id,
                  openid: openid
                };
                wx.showNavigationBarLoading()
                that.post('user/info/wx/update', userInfo, function (res) {
                  wx.hideNavigationBarLoading()
                  if (res.code == 1000) {
                    cb(res.body);
                  }
                })
              }
            })
          }

        })
      }
    }) 
  },
  post(url, data, success, fail, method){
    
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
      url: that.globalData.url + url,
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
  },
  globalData: {
    url:'http://192.168.0.104:8080/sunhope/',
    userInfo: null,
    systemInfo:null
  }
})