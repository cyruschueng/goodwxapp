// pages/myPuzzles/myPuzzles.js
const app = getApp();
const common = require('../../js/common.js');
var that = '';
var totalPage = 1;
var totalNum = 0;     // 总海报数
var pageNum = 0;      // 单面海报数
var selectBegin = 0;
var selectNum = 20;   // 查的条数
var scroll = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    userInfo:'',
    moneyTotal:0,
    numTotal:0,
    arrSendList: [],   // 发出的
    arrPlayList:[],    // 参与的
    imgDir:''
  
  },
  onLoad: function (options) {
    that = this;
    that.setData({
      currentTab:options.type,
      imgDir: app.globalData.imgDir
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    that.setData({ userInfo: app.globalData.userInfo })
    if (that.data.currentTab == 0){
      that.getSendList();
    }else{
      that.getPlayList();
    }
  },
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
  
  },
  getSendList:function(){   // 发出的
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      _C: "My",
      _A: "selectOut",
      _LIMIT: selectBegin + "," + selectNum
    }
    common.request("getSendList", that, "form", params);
  },
  getPlayList:function(){     // 参与的
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      _C: "My",
      _A: "selectIn",
      _LIMIT: selectBegin + "," + selectNum
    }
    common.request("getPlayList", that, "form", params);
  },
  switchNav: function (e) {
    selectBegin = 0;
    var curTab = e.currentTarget.dataset.current;
    if(curTab == 0){
      that.getSendList();
    }else{
      that.getPlayList();
    }
    if (curTab == this.data.currentTab) {
      return;
    } else {
      this.setData({
        currentTab: curTab
      })

    }
  },
  switchTab: function (e) {
    var curSwiper = e.detail.current;
    this.setData({
      currentTab: curSwiper
    })
    // 请求

  },
  urlTarget: function (event) {
    const url_name = event.currentTarget.dataset.url;
    const aid = event.currentTarget.dataset.id;
    if (url_name == "beginPuzzles"){
      var params = "?aid=" + aid;
    }    
    common.urlTarget(url_name,"",params);
  },
  scrollToBottom:function(){
    if (that.data.currentTab == 0) {
      scroll && that.getSendList();
    } else {
      scroll && that.getPlayList();
    }
  },
  onSuccess: function (methodName, res) {
    if (res.statusCode == 200) {
      let ret = res.data;
      if (ret.code == 200) {
        let data = ret.data;
        switch (methodName) {
          case 'getSendList':
            var arrSendList = [];
            if (selectBegin == 0) {    // 代表第1页
              arrSendList = arrSendList.concat(data.list)
            } else {
              arrSendList = that.data.arrSendList.concat(data.list);
            }
            that.setData({
              moneyTotal: data.money_total ? data.money_total:0,
              numTotal: data.total,
              arrSendList: arrSendList,
              arrPlayList:[]
            })
            wx.hideLoading();
            if (data.num < selectNum) { // 最后一页
              scroll = false;
            } else {
              scroll = true;
              selectBegin += selectNum;
            } 
            break;
          case 'getPlayList':
            var arrPlayList = [];
            if (selectBegin == 0) {    // 代表第1页
              arrPlayList = arrPlayList.concat(data.list)
            } else {
              arrPlayList = that.data.arrPlayList.concat(data.list);
            }            
            that.setData({
              moneyTotal: data.money_total ? data.money_total:0,
              numTotal: data.total,
              arrPlayList: arrPlayList,
              arrSendList:[]
            })
            wx.hideLoading();
            if (data.num < selectNum) { // 最后一页
              scroll = false;
            } else {
              scroll = true;
              selectBegin += selectNum;
            } 
            break;  
        }

      } else {
        console.log(ret);
        wx.hideLoading();
      }
    } else {
      console.log("接口有问题：" + methodName);
      wx.hideLoading();
    }
  },
  onFail: function (methodName) {
    console.log("接口调用失败：" + methodName);
  },
  onComplete: function (methodName) { 

  }
})