// pages/seach/seach.js
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
    // search-friend
    let that = this;
    let sign = wx.getStorageSync('sign');
    
  },
  //关键字
  searchInputEvent(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    that.setData({
      name: e.detail.value
    })
    console.log("name:", e.detail.value);
    wx.request({
      url: apiurl + "birth/search-friend?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        name: that.data.name
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("搜索好友:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            friendList: res.data.data
          })
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
          that.setData({
            noData: '查无此人'
          })
        }
      }
    })
  },
  // 详情
  
  inform(e) {
    let mf_id = e.currentTarget.dataset.mf_id;
    let url = e.currentTarget.dataset.url;
    console.log(mf_id, url);
    wx.navigateTo({
      url: '../hinform/hinform?mf_id=' + mf_id + '&url=' + url
    })
  },
  // 取消
  quxiao() {
    wx.switchTab({
      url: '../indexs/indexs'
    })
  }
})