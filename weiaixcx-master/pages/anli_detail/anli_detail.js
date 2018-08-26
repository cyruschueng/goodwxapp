// pages/anli_detail/anli_detail.js

var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  imgurl:imgurl,
	anli:{},//详情案例
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getAnli(options.anli_id)
  },
  getAnli:function(anli_id){
	  var that =this
common.httpG('anli/read',{anli_id:anli_id},function(data){
	if(data.code==0){
			that.setData({
				anli:data.data,
				cont: WxParse.wxParse('cont', 'html', data.data.cont, that, 5)
			})
	}
})
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