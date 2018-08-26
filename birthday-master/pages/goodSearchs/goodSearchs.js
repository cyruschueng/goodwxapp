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
  
  },
  searchInputEvent: function (e) {
    let that = this;
    let sign = wx.getStorageSync('sign');
    console.log(e.detail.value);
    that.setData({
      keyword: e.detail.value
    })
    wx.request({
      url: apiurl + "birth/search-idol?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        keyword: that.data.keyword
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("搜索列表", res)
        that.setData({
          goodList: res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  // 详情
  goodInform(e) {
    let idol_id = e.currentTarget.dataset.idol_id;
    wx.navigateTo({
      url: '../goodInform/goodInform?idol_id=' + idol_id
    })
  },
  quxiao(){
    wx.navigateBack({
      url: '../goodSearch/goodSearch'
    })
  }
})