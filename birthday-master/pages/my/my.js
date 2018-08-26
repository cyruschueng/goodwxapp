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
    certification:false //认证手机
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
    let certification = wx.getStorageSync('certification');
    let myselfName = wx.getStorageSync('myselfName');
    console.log("myselfName:", myselfName);
    let mid = wx.getStorageSync('mid');
    let userInfo = wx.getStorageSync('userInfo');
    that.setData({
      myselfName: myselfName,
      userInfo: userInfo,
      certification:certification
    })
    // 获取自己详细信息
    wx.request({
      url: apiurl + "birth/get-edit-friend-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        mf_id: 0
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("我的详情:", res);
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
    // 是否填写了基本信息
    wx.request({
      url: apiurl + "birth/is-fill-birth?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("是否填写了基本信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            shiming: res.data.data.flag
          })
        } else {
          console.log(res.data.msg)
        }
      }
    }),
      // 我的余额
      wx.request({
        url: apiurl + "birth/my-balance?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("我的余额:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              money: res.data.data
            })
            wx.setStorageSync('money', res.data.data);
          } else {
            console.log(res.data.msg)
          }
        }
      })
  },
  //完善
  wanshan(){
    wx.navigateTo({
      url: '../myself/myself?myself=1'
    })
  }

 

})