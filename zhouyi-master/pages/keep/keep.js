const app = getApp()
const comm = require('../../utils/comm');
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js'
let sign = wx.getStorageSync('sign');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1
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
    wx.request({
      url: apiurl + "zhouyi/result-list?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("列表:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            alllist: res.data.data
          })
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  },
  
  //去测试
  go: function () {
    wx.switchTab({
      url: '../new/new'
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
    let oldGoodsList = that.data.alllist;
      console.log("oldGoodsList:" + oldGoodsList);
      var oldPage = that.data.page;
      var reqPage = oldPage + 1;
      console.log(that.data.page);
      wx.request({
        url: apiurl + "zhouyi/result-list?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          page: reqPage,
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("新数据:", res);
          if (res.data.status==0){
            tips.alert(res.data.msg);
          }else{
              var alllist = res.data.data;
              console.log(alllist);
              if (alllist.length == 0) {
                tips.alert('没有更多数据了');
                return;
              }
              var page = oldPage + 1;
              var newContent = oldGoodsList.concat(alllist);
              that.setData({
                alllist: newContent,
                page: reqPage
              })
              wx.hideLoading();
              if (newContent == undefined) {
                tips.alert('没有更多数据')
              }
          }
        }
      })
    
    wx.hideLoading()
  }


})