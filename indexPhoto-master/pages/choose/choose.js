var utils = require("../../utils/util.js");
var tunji = require('../../utils/tunji.js');
//获取应用实例
var app = getApp();
Page({
  data: {
    background: wx.getStorageSync('background'),
    backgroundColor: wx.getStorageSync('bgColor'),
    border: wx.getStorageSync('border')
  },
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
    })
  },
  onShow: function () {
    let that = this;
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    
    //获取性别
    wx.request({
      url: app.data.apiurl + "api/is-set-gender?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("operator_id"),
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("flag:", res);
        console.log("1111", res.data.flag)
        var status = res.data.status;
        let flag = res.data.flag; //"flag":1,//1是 0 否
        if (status == 1) {

          if (res.data.flag == 0) {
            
          }
        } else {
          wx.switchTab({
            url: '../before/before'
          })
        }
        wx.hideLoading()
      }
    })
  },
  // 选择性别
  chooseSex(e){
      let that = this;
      let gender = e.currentTarget.dataset.gender; 
      console.log(gender);
      // 选择性别
      wx.request({
        url: app.data.apiurl + "api/chosen-gender?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("operator_id"),
        data: {
          gender: gender
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("选择性别结果:", res);
          var status = res.data.status;
          if (status == 1) {
            wx.hideLoading()
            wx.setStorageSync('sex', gender);
            wx.switchTab({
              url: '../before/before'
            })
          } else {
            console.log(res.data.msg);
            wx.showToast({
              title: ''+res.data.msg+'',
              icon: 'success',
              duration: 3000
            })
            // 获取性别
            wx.request({
              url: app.data.apiurl + "api/get-gender?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("operator_id"),
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                console.log("获取性别:", res);
                console.log(res.data.sex, '是否')
                var status = res.data.status;
                if (status == 1) {
                  that.setData({
                    sex: res.data.sex,
                  })
                  wx.setStorageSync('sex', res.data.sex);
                } 
                wx.hideLoading()
              }
            })
            wx.switchTab({
              url: '../before/before'
            })
          }
          
        }
      })
  }

})