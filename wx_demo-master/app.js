
var server = require('./utils/server');
var md5 = require('./utils/md5.js');

// 授权登录 
App({
  onLaunch: function () {
    // auto login via SDK
    var that = this;
    //AV.User.loginWithWeapp();


    // 设备信息
    wx.getSystemInfo({
      success: function (res) {
        that.screenWidth = res.windowWidth;
        that.pixelRatio = res.pixelRatio;
      }
    });
	//获取群标识id
    // console.log(ops);
    // if (ops.scene == 1044) {
    //   console.log(ops.shareTicket)
    //   wx.getShareInfo({
    //     shareTicket: ops.shareTicket,
    //     complete(res) {
    //       console.log(res)
    //     }
    //   });
    // }
  },
  getOpenId: function (cb) {

    wx.login({
      success: function (res) {
        if (res.code) {
          server.getJSON('/User/sendappid?js_code=' + res.code, function (response) {
            // 获取openId
            var openId = response.data.openid;
            // TODO 缓存 openId
            var app = getApp();
            var that = app;
            that.globalData.openid = openId;
            console.log('获取的openid' + openId);
            //验证是否关联openid

            typeof cb == "function" && cb()
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  register: function (cb, first_leader) {
    var app = this;
    this.getUserInfo(function () {
      var openId = app.globalData.openid;
      if (openId) {
        var userInfo = app.globalData.userInfo;
        var country = userInfo.country;
        var city = userInfo.city;
        var gender = userInfo.gender;
        var nick_name = userInfo.nickName;
        var province = userInfo.province;
        var avatarUrl = userInfo.avatarUrl;
      

        server.getJSON('/User/register?open_id=' + openId + "&country=" + country + "&gender=" + gender + "&nick_name=" + nick_name + "&province=" + province + "&city=" + city + "&head_pic=" + avatarUrl + "&first_leader=" + first_leader, function (res) {
          app.globalData.userInfo = res.data.res
          console.log('注册获取的userInfo' + res.data.res);
          typeof cb == "function" && cb()
        });
      } else {
        wx.showToast({
          title: '登录异常',
          duration: 2000
        });
      }


    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    'openid': null,
    'domain': null,
    'userInfo': null,
    'login': false
  }
})
