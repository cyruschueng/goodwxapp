// pages/sign/sign.js
let qcloud = require('../../vendor/wafer2-client-sdk/index')
let config = require('../../config')
let util = require('../../utils/util.js')

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_sort: [],
    sortId: '',
    sortName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.appData.fromClickId = options.currentClickId
    // app.upDateUser_networkFromClickId = require('../../utils/upDateUser_networkFromClickId.js').upDateUser_networkFromClickId
    
    app.pageGetUserInfo(this)
    this.getFriends_sort()
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
    this.closeTunnel()//当信道连接或者重连了时，关闭已连接的信道
  },
  closeTunnel() {
    //当信道连接或者重连了时，关闭已连接的信道
    if (app.appData.tunnelStatus == 'connect' || app.appData.tunnelStatus == 'reconnect') {
      app.tunnel.close()
    }
  },
  getFriends_sort() {
    //util.showBusy('正在请求');
    qcloud.request({
      login: false,
      url: `${app.appData.baseUrl}question_sort`,
      success: (res) => {
        // util.showSuccess('请求成功完成');
        let data0 = res.data.data;
        this.setData({
          question_sort: data0
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      },
    });
  },
  beginSign(e) {
    wx.redirectTo({
      url: `../sign_room/sign_room?sortId=${e.target.dataset.sortid}`
    })
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