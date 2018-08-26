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


})