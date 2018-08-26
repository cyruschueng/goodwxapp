var coolsite360 = require('./coolsite/index.js');
var  aldstat = require("./utils/ald-stat.js");
var push = require('./utils/pushsdk.js');
var user;
App({
  data: {
    userOpenId: "",
    lastExecType: "",
    lastExecType: "",
    lastExecTime :0
  },
  onLaunch: function (options) {
    var that = this;
    console.log(options);
    wx.showLoading({ title: '' });
    wx.login({
      success: function (res) {
        wx.request({
           url: 'https://51yangcong.com/568data/GetOpenId',
        // url: 'http://localhost:8880/568data/GetOpenId',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'code': res.code
          },
          success: function success(res) {
            getApp().data.userOpenId = res.data.openid;
            wx.hideLoading();
            //查询是否有需要展示的信息，如果有则跳转去信息页面展示
          },
          'fail': function (res) {
            wx.reLaunch({ url: '../../page/messagePage/messagePage' });
            wx.hideLoading();//////////////////////////////////////////////
          }
        });
      }
    });
  },
  coolsite360: coolsite360
})