var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var that;
var app = getApp()
Page({
    data: {
        loading: true
    },
    onLoad: function () {
        that = this;
        // 页面初始化 options为页面跳转所带来的参数


    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    formSubmit: function (event) {

        wx.showLoading({
            title: '注册中，请稍后！',
        })
        var accoutPswd = event.detail.value.accoutPswd;
        var accoutPswd1 = event.detail.value.accoutPswd1;
        var accoutName = event.detail.value.accoutName;
        if (accoutPswd == accoutPswd1 && accoutPswd != "" && accoutName != "") {
            wx.request({
              url:  'http://127.0.0.1:8080/user/register',
              data: {username: accoutName,password: accoutPswd},
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function(res) {  
                  console.log(res.data);
                  if (res.data['res'] == 1) {
                    wx.showLoading({
                      title: '注册成功！',
                    });
                      setTimeout(function() {
                          wx.redirectTo({
                            url: '../login/login'
                        });
                      },2000);
                  }else {
                    setTimeout(function () {
                      wx.showLoading({
                        title: '注册失败！',
                      });
                      setTimeout(function () {
                        wx.hideLoading();
                      }, 1000);
                  });
                }
            

        }
        });
        }
        else {
            wx.showLoading({
                title: '信息填写错误！',
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 2000)
            console.log("信息填写错误")
        }

    }
})