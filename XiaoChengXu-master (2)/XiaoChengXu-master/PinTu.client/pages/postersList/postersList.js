// pages/postersList/postersList.js
const app = getApp();
const common = require("../../js/common.js");
var that = '';
var totalPage = 1;
var totalNum = 0;     // 总海报数
var pageNum = 0;      // 单面海报数
var selectBegin = 0;
var selectNum = 8;   // 查的条数
var scroll = true;   // 是否可以滚动加载
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',    
    arrPoster:[],
    imgDir:'',
    winW:300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    const phoneInfo = app.globalData.phoneInfo;
    console.log(phoneInfo);

    that.setData({
      imgDir: app.globalData.imgDir,
      winW: phoneInfo.windowWidth
    })
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中...',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {   
    that.getPosterList();
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
  onShareAppMessage: function () {
  
  },
  getPosterList:function(){
    let params = {
      _C: 'Act',
      _A: 'select',
      _LIMIT: selectBegin + "," + selectNum,
      _FILTER: ''
    }
    common.request("getPosterList", that, "form", params);  
  },
  onSuccess: function (methodName, res) {
    if (res.statusCode == 200) {
      let ret = res.data;
      let data = res.data.data;
      if (ret.code == 200) {
        let data = ret.data;
        switch (methodName) {
          case 'getPosterList':
            totalNum = data.total;   //  总条数
            var arrPoster = [];
            if (selectBegin == 0){    // 代表第1页
              arrPoster = arrPoster.concat(data.list)
            }else{
              arrPoster = that.data.arrPoster.concat(data.list);
            }
            that.setData({
              arrPoster: arrPoster
            })
            if (data.num < selectNum){ // 最后一页
              scroll = false;
            }else{
              scroll = true;
              selectBegin += selectNum;
            }            
            wx.hideLoading()
            break;
        }

      } else {
        console.log(ret)
        ret.msg?common.showErrorTip(ret.msg):'';
      }
    } else {
      console.log("接口有问题：" + methodName);
    }
  },
  onFail: function (methodName) {
    wx.hideLoading();
    console.log("接口调用失败：" + methodName);
  },
  onComplete: function (methodName) { 

  },
  scrollToBottom:function(){
    console.log("------底线------");
    if (scroll){
      wx.showLoading({
        title: '加载中...',
      })
      that.getPosterList();
    }
  },
  urlTarget:function(e){
    let curId = e.currentTarget.dataset.id;
    let url = e.currentTarget.dataset.url;
    common.urlTarget(url,"","?aid="+curId);
  }
})