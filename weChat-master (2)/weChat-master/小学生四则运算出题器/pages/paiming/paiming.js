// pages/paiming/paiming.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist:[],//返回排名信息的列表
    isShow: true,//是否显示提示信息和按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that=this;
    console.log("paiming.wxml");
    setTimeout(function(){
      //将openGId与openid的关系对上传到服务器
      let cs = {};
      cs['openID'] = getApp().globalData.secret.openid;
      cs['openGId'] = getApp().globalData.openGId;
      wx.request({
        url: getApp().globalData.host + "InsertRelationshipBetweenOpenIdAndOpenGIdszys",
        data: cs,
        method: 'POST',
        header: { 'content-type': "application/x-www-form-urlencoded" },
        success: function (e) {
          console.log(e.data);
          //获取群排名
          let cs = { 'openGId': getApp().globalData.openGId };
          wx.request({
            url: getApp().globalData.host + "GetQunPaiMing",
            data: cs,
            method: 'POST',
            header: { 'content-type': "application/x-www-form-urlencoded" },
            success: function (e) {
              console.log(e.data);
              that.setData({ userlist:e.data,isShow:!that.data.isShow});
            }
          });//end of 获取群排名
        }
      });//end of openGId与openid的关系对上传到服务器
    },6000);
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  openMini: function(){
    wx.switchTab({
      url: '/pages/index/index',
    });
  }
})