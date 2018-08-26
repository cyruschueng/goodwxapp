// pages/inventory/index.js
var config = require('../../config.js')
import req from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHints: "",
    inputShowed: false,
    inputVal: "",
    inventoryList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryInventory('');
    console.log(wx.getStorageSync('wxuser'));
  },
  queryInventory: function (name, callback) {
    let self = this;
    self.callback = callback;
    req.get(config.api.inventory + '/list', {name: name})
      .then(res => res.data)
      .then(data => {
        console.log(data);
        if (data.success) {
          if (data.data) {
            self.setData({ inventoryList: data.data });
          } else {
            self.setData({ inventoryList: [] });
          }
          if (self.callback) {
            self.callback();
          }
        } else {
          console.log(response.data);
          // wx.navigateTo({
          //   url: '../message/fail?msg=' + response.data.errorMessage
          // })
        }
      });
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.data.searchHints = e.detail.value;
    this.queryInventory(e.detail.value);
  },
  /**
   * 点击查询提示的条目
   */
  tapHint: function (e) {
    console.log("tapHint:" + e);
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
    console.log("onPull");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.log("onReachBottom");
    this.queryInventory(this.data.searchHints);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    this.queryInventory(this.data.searchHints, function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
  },
})