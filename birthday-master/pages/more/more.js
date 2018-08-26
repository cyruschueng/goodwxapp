// pages/more/more.js
const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1
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
    let mid = wx.getStorageSync("mid");
    that.setData({
      mid: mid
    })
    wx.showLoading({
      title: '加载中',
    });
    //可能认识的好友
    wx.request({
      url: apiurl + "birth/might-known?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        count:10
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("可能认识的好友:", res);
        that.setData({
          known: res.data.data
        })
      }
    })
    wx.hideLoading()
  },
  // 互相加好友
  sendShare() {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "birth/make-friend?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        invite_mid: that.data.mid,
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("互相加好友:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('互相加好友成功');
        } else {
          console.log(res.data.msg);
          tips.success(res.data.msg);
        }
      }
    })
  },
  /**
   *   下拉分页
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    let sign = wx.getStorageSync('sign');
    let oldGoodsList = that.data.known;
      console.log("oldGoodsList:" + oldGoodsList);
      var oldPage = that.data.page;
      var reqPage = oldPage + 1;
      console.log(that.data.page);
      wx.request({
        url: apiurl + "birth/might-known?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          page: reqPage,
          count:10
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("新可能认识的人:", res);
          var known = res.data.data.known;
          if (known.length == 0) {
            tips.alert('没有更多数据了');
            return;
          }
          var page = oldPage + 1;
          var newContent = oldGoodsList.concat(known);
          that.setData({
            known: newContent,
            page: reqPage
          })
          wx.hideLoading();
          if (newContent == undefined) {
            tips.alert('没有更多数据')
          }
        }
      })
    
    wx.hideLoading()
  }


})