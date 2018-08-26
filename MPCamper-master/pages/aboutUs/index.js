// pages/aboutUs/aboutUs.js

const CONF = require('../../conf.js');
const VERSION = CONF.version;

Page({

  /**
   * 页面的初始数据
   */
  data: {
          version: VERSION
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

  followUs: function (){
    console.log('关注快乐车行公众号');
  }
})