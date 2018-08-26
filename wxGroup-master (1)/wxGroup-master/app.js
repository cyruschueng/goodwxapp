//app.js
var Util = require('utils/util.js');
var Api = require('utils/GroupRequest.js');
var User = require('utils/UserManager.js');
var event = require('utils/event.js')
var code = "";
var groupsLogin = function (userInfo) {
  Api.request({
    url: '/api/user/v1/login',
    data: {
      code: userInfo.code,
      rawData: userInfo.rawData,
      signature: userInfo.signature,
      iv: userInfo.iv
    },
    success: function (data) {
      console.log(data);
      if (data.user ) {
        User.Singleton.getInstance().setWxUserInfo(userInfo);
        User.Singleton.getInstance().setLoginUserInfo(data.user);
        User.Singleton.getInstance().setIsLogin(true);
        event.emit('isLogin','true');
      }
    }
  })
}
  var getUserInfo = function() {
    if (User.Singleton.getInstance().getLogin()) {
      console.log('has login')
      event.emit('isLogin', 'true');
    } else {
      //调用登录接口
      wx.login({
        success: function (codes) {
          console.log(codes)
          wx.getUserInfo({
            success: function (res) {
              res.code = codes.code;
              groupsLogin(res);
            },
            fail: function (res) {
              console.log(res)
            },
            complete: function (res) {
              console.log(res)
            }
          })
        }
      })
    }
  }
App({
  onLaunch: function (res) {
    User.Singleton.getInstance().setShareTicket(res.shareTicket);
    Api.initNetDev(Api.NetDev.preRelease);
    getUserInfo();
  },
  onload:function(){
   
  },
  getUserInfoFun:function(){
    getUserInfo();
  },
  globalData:{
    userInfo:null,
    code:null,
    loginUser:null
  }
})