// pages/hinform/hinform.js
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
    renzheng:false //认证手机号
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    that.setData({
      mf_id: options.mf_id,
      url: options.url
    })
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
    // 详细信息
    wx.request({
      url: apiurl + "birth/get-friend-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        mf_id: that.data.mf_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("详细信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            inform: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    // 是否绑定了手机
    wx.request({
      url: apiurl + "birth/is-build-phone?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        mf_id: that.data.mf_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("朋友是否认证手机:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            renzheng: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },
  setting(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    console.log(e);
    that.setData({
      setting: true
    })
 },
//  取消
  quxaio(){
    this.setData({
      setting: false
    })
  },
  //dels删除好友
  dels() {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    });
    // 删除好友
    wx.request({
      url: apiurl + "birth/del-friend?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        mf_id: that.data.mf_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("删除好友:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('删除好友成功！');
          setTimeout({

          },2000)
          wx.switchTab({
            url: '../indexs/indexs'
          })
        } else {
          console.log(res.data.msg);
          tips.error(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  },
  //认证手机号
  gorenzheng(){
    wx.navigateTo({
      url: '../renzheng/renzheng'
    })
  },
  // 点赞、
  zan(){
    wx.navigateTo({
      url: '../blessing/blessing?mf_id=' + this.data.mf_id + '&name=' + this.data.inform.name
    })
  },
  bianji(e){
    wx.navigateTo({
      url: '../bianjiAdd/bianjiAdd?mf_mid=' + this.data.mf_id + '&url=' + this.data.url
    })
    this.setData({
      setting:false
    })
  }
  
})