// pages/activity/activity.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  }, 
  onLoad(){
    this.setData({ baseUrl: app.globalData.apiBase })
  }
})