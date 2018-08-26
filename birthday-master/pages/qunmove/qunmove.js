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
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options:",options);
    let informAll = wx.getStorageSync('informAll');
    this.setData({
      types: options.types,
      g_id: options.g_id,
      informAll: informAll,
      members: informAll.members,
      group_name: informAll.group_info.group_name
    })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
   
  },
  //选择
  checked(e) {
    console.log(e);
    let that = this;
    let members = that.data.members;
    let mid = e.currentTarget.dataset.mid;
    let index = e.currentTarget.dataset.index;
    that.setData({
      members,
      mid
    })

  },
  quxaio() {
    let informAll = this.data.informAll
    this.setData({
      members: informAll.members,
      mid: ''
    })
    wx.navigateBack({
      url: '../qunsetting/qunsetting?g_id=' + this.data.g_id
    })
  },
  setting(){
    console.log('setting');
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "birth/transfer-captain?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id,
        mid: that.data.mid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("转移群主:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('转移群主成功')
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  }

})