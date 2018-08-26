var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({

    onLoad: function () {
        
    },
    formSubmit: function (event) {
      wx.showLoading({
        title: '登陆中，请稍后！',
      })
      var password = event.detail.value.accoutPswd;
      var username = event.detail.value.accoutName;
      if (username != "" && password != "") {
          wx.request({
            url: 'http://127.0.0.1:8080/user/login',
            data: { username: username, password: password },
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res.data);
                if (res.data['res'] == 1) {
                  wx.showLoading({
                    title: '登陆成功！',
                  });
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../interface/interface'
                    });
                  }, 2000);
                } else {
                  setTimeout(function () {
                    wx.showLoading({
                      title: '登陆失败！',
                    });
                    setTimeout(function () {
                      wx.hideLoading();
                    }, 1000);
                  });
                }
            }
          })
      }else {
          wx.showLoading({
            title: '信息填写错误！',
          })
          setTimeout(function () {
            wx.hideLoading();
          }, 2000)
          console.log("信息填写错误");
      }
    }
})