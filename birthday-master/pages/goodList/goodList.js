let tcity = require("../../utils/citys.js");
let app = getApp();
let sign = wx.getStorageSync('sign');
let common = require('../../common.js');
let apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    });
    // 本月明星生日榜 
    wx.request({
      url: apiurl + "birth/idol-month-rank?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("本月明星生日榜 :", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            goodList: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    //我的爱豆
    wx.request({
      url: apiurl + "birth/my-idol?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("我的爱豆 :", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            idolList: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },
  more(){
    wx.navigateTo({
      url: '../goodMore/goodMore'
    })
  },
  moreIdol(){
    wx.navigateTo({
      url: '../goodSearch/goodSearch'
    })
  },
  goodInform(e){
    console.log(e);
    let idol_id = e.currentTarget.dataset.idol_id;
    wx.navigateTo({
      url: '../goodInform/goodInform?idol_id=' + idol_id
    })
  },
  
 
 
})