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
    monthList: [
      {
        month: 1,
        active: false
      }, {
        month: 2,
        active: false
      }, {
        month: 3,
        active: false
      }, {
        month: 4,
        active: false
      }, {
        month: 5,
        active: false
      }, {
        month: 6,
        active: false
      }, {
        month: 7,
        active: false
      }, {
        month: 8,
        active: false
      }, {
        month: 9,
        active: false
      }, {
        month: 10,
        active: false
      }, {
        month: 11,
        active: false
      }, {
        month: 12,
        active: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    let sign = wx.getStorageSync('sign');
    let nowMonth = wx.getStorageSync('nowMonth');
    let monthList = that.data.monthList;
    for (let i = 0;i<monthList.length;i++){
      if (monthList[i].month == nowMonth){
          monthList[i].active = true;
          console.log("nowMonth:",i);
          console.log("active:", monthList[i].active);
          that.setData({
            monthList
          })
      }
    }
    
    // 明星列表
    wx.request({
      url: apiurl + "birth/idol-list?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("明星列表:", res);
        let status = res.data.status;
        if (status == 1) {
          that.setData({
            goodList: res.data.data,
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },
  goodSearchs(){
      wx.navigateTo({
        url: '../goodSearchs/goodSearchs'
      })
  },
  goodInform(e) {
    let idol_id = e.currentTarget.dataset.idol_id;
    wx.navigateTo({
      url: '../goodInform/goodInform?idol_id=' + idol_id
    })
  },
  //月份切换
  tapKeyWorld1: function (e) {
    console.log(e);
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let sign = wx.getStorageSync('sign');
    let inx = e.currentTarget.dataset.inx;
    let month = e.currentTarget.dataset.month;    
    let monthList = that.data.monthList;
    for (let j = 0; j < monthList.length; j++) {
        monthList[j].active = false;
        monthList[inx].active = true;
    }
    that.setData({
      monthList,
      month: month
    })
    wx.request({
      url: apiurl + "birth/idol-list?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        month: that.data.month
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("新明星列表", res)
        that.setData({
          goodList: res.data.data
        })
        wx.hideLoading()
      }
    })
  }


 
})