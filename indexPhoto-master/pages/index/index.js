var utils = require("../../utils/util.js");
var tunji = require('../../utils/tunji.js');
var app = getApp();
import {md5} from '../../utils/md5.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 3,
  },

  onLoad(options) {
    console.log(tunji,'tunji');
    var scene = decodeURIComponent(options.scene);
    console.log(options);
    var uid = scene.split("-")[0];
    var set_number = scene.split("-")[1];
    var gender = scene.split("-")[2];
    this.setData({
      scene: scene,
      uid: uid,
      set_number: set_number,
      gender: gender
    })
    if (scene != "undefined" && scene != "") {
      wx.reLaunch({
        url: '../begin_answer/begin_answer?uid=' + uid + '&set_number=' + set_number + '&sex=' + gender,
      })
    }
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    app.getUserInfo(function () {})
  },
  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {
    const that = this;
    let time = that.data.time;
    var second = that.data.second;
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    var id = extConfig.kid;
    wx.setStorageSync('operator_id', 103);
    console.log("kid", extConfig.kid);
    // 倒计时
    wx.request({
      url: "https://unify.playonweixin.com/site/get-advertisements",
      data: {
        operator_id: 103
      },
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var advers = res.data.adver.advers;
          var head_adver = res.data.adver.head_adver;
          var broadcasting = res.data.adver.broadcasting;
          wx.setStorageSync("advers", advers);
          wx.setStorageSync("broadcasting", broadcasting);
          that.setData({
            head_adver
          })

          let scene = that.data.scene;
          if (scene == "undefined" || scene == "") {
            var inter = setInterval(function () {
              //let sex = 0;
              if (second <= 1) {
                clearInterval(inter);
                if (that.data.sex == 0) {
                  // wx.reLaunch({
                  //   url: '../choose/choose'
                  // })
                } else {
                  wx.switchTab({
                    url: '../before/before'
                  })
                  wx.setStorageSync('sex', that.data.sex)
                }
              }
              second--;
              console.log(second);
              that.setData({
                second,
                inter
              })
            }, 1000)
          } else {
            if (that.data.uid != "undefined" && that.data.uid != "") {
              wx.reLaunch({
                url: '../begin_answer/begin_answer?uid=' + that.data.uid + '&set_number=' + that.data.set_number + '&sex=' + that.data.gender,
              })
            }
          }
        }
      }
    })
    

  },



  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      success: function (res) {
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
})
