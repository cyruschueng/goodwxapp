// pages/qun/qun.js
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
    // 群信息
    wx.request({
      url: apiurl + "birth/group?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("群信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            groupList:res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },
  // 添加
  addQun(){
    wx.navigateTo({
      url: '../zhuangfa/zhuangfa'
    })
  },
 //inform
  inform(e){
    let that = this;
    let g_id = e.currentTarget.dataset.g_id;
    wx.navigateTo({
      url: '../qunadd/qunadd?g_id=' + g_id
    })
  }
})