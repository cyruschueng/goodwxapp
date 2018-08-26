// pages/keep/keep.js
const app = getApp()
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receive_list:[],
    total_count:'',
    total_money:'',
    send_list:'',
    value:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo : userInfo
    })
  },
  // 详情
  inform(e){
    let red_id = e.currentTarget.dataset.red_id;
    wx.navigateTo({
      url: '../inform/inform?red_id=' + red_id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "red/got-red-list?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("收到红包:", res);
        that.setData({
           receive_list: res.data.data.receive_list,
           total_count: res.data.data.total_count,
           total_money: res.data.data.total_money
        })
      }
    })
  },
  keyword(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let value = e.currentTarget.dataset.value;
    this.setData({
      value: value
    })
    if (value==2){ //发出
        wx.request({
          url: apiurl + "red/sent-red-list?sign=" + sign + '&operator_id=' + app.data.kid,
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("发出红包:", res);
            that.setData({
              send_list: res.data.data.send_list,
              total_count: res.data.data.total_count,
              total_money: res.data.data.total_money
            })
          }
        })
    }else{  //收到
        wx.request({
          url: apiurl + "red/got-red-list?sign=" + sign + '&operator_id=' + app.data.kid,
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("收到红包:", res);
            that.setData({
              receive_list: res.data.data.receive_list,
              total_count: res.data.data.total_count,
              total_money: res.data.data.total_money
            })
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})