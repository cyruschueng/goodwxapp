var app = getApp();
var common = require("../../utils/util.js");
var wxApi = require("../../utils/wxApi.js");
var wxRequest = require("../../utils/wxRequest.js");

Page({
    data:{
        day:7,
        array: [7, 21, 56,100,365],
        index:0,
        exist:false,
        btnName:"我要加入",
        refresh:false,
        habitId:0
    },
    onLoad:function(options){
        var that=this;

        this.setData({
          habitId: options.habitid
        })
        app.ready(function () {
          that.init();
        })
    },
    onShow: function () {
      var refresh = this.data.refresh;
      console.log(refresh);
      if (refresh == false) {
        this.setData({
          refresh: true
        })
      } else {
        app.checkSessionId(function () {
          that.init();
        }, function () {
          that.errorHandle();
        });
      }
    },
    inti:function(){
        var that=this;
        var url = app.globalData.host +'/api/habit/my/info';
        var data = JSON.stringify({
          habitid: this.data.habitId,
          sessionid: wx.getStorageSync('sessionId')
        });
        wxRequest.postRequest(url,data).then(res=>{
          that.checkRequesResult(res);
          if (res.data.success == true) {
            if (res.data.exist == true) {
              that.setData({
                exist: true,
                btnName: "更新",
                index: common.findArryIndex(that.data.array, res.data.value)
              })
            }
          }
        })
    },
    updateHabit:function(e){
        var that=this;
        var url = app.globalData.host +'/api/habit/my/set';
        var data = JSON.stringify({
          habitid: this.data.habitId,
          sessionid: wx.getStorageSync('sessionId'),
          target: e.currentTarget.dataset.target
        });
        this.showToast();
        wxRequest.postRequest(url,data).then(res=>{
          that.checkRequesResult(res);
          if (res.data.success == true) {
              /*
              that.setData({
                exist: true,
                btnName: "更新",
                index: common.findArryIndex(that.data.array, target)
              })
              */
              wx.switchTab({
                url: '/pages/myhabit/myhabit'
              })
          }
        }).finally(function (res) {
          wx.hideToast()
        });
    },
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value
      })
    },
    errorHandle:function(){
      wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/set/set', 'opentype': 'navigateTo' });
    },
    checkRequesResult: function (result) {
      if (result.data.success == false && result.data.sourse == 'session') {
        this.errorHandle();
      }
    },
    showToast: function () {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
    }
})
