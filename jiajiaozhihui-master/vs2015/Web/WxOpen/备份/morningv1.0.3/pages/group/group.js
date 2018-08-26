var app=getApp();
var wxApi = require("../../utils/wxApi.js");
var wxRequest = require("../../utils/wxRequest.js");
// group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList:[],
    url:'',
    userInfo:{},
    busy:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.ready(function(){
      that.init();
      app.getUserInfo(function (userInfo) {
        that.setData({
          userInfo: userInfo
        })
      },null)
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
    var busy = this.data.busy;
    if (this.data.busy == false) {
      this.setData({
        'busy': true,
      })
      this.init();
    }
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
  init:function(){
    var that=this;
    console.log("group init ");
    console.log(wx.getStorageSync("sessionId"));
    var url = app.globalData.host+'/api/habit/my/list';
    var data=JSON.stringify({
      sessionid: wx.getStorageSync("sessionId")
    })
    this.showToast();
    wxRequest.postRequest(url,data).then(res=>{
      console.log(" group request /api/habit/my/list");
      console.log(res);
      that.checkRequesResult(res);


      if (res.data.success==true && res.data.list.length>0){
        that.setData({
          url:'/pages/myhabit/myhabit'
        })
      } else if (res.data.success == true && res.data.list.length == 0) {
        that.setData({
          url: '/pages/new/new'
        })
      }
    }).then(()=>{
      var url = app.globalData.host + '/api/habit/group/list';
      wxRequest.getRequest(url, null).then(res => {
        that.checkRequesResult(res);
        if (res.data.success == true) {
          that.setData({
            groupList: res.data.list
          })
        }
      })
    }).catch(res=>{
      console.log("qssssssssss");
      console.log(res);
    }).finally(function (res) {
        wx.hideToast()
    });
  },
  bindSelect:function(options){

    console.log("this.data.url");
    console.log(options);
    console.log(this.data.url);
    var groupId = options.currentTarget.dataset.groupid;
    app.globalData.groupId = groupId;
    wx.switchTab({
      url: this.data.url,
      success:function(){
        app.globalData.groupId = groupId
        //app.globalData.groupId = 0
      }
    })
  },
  checkRequesResult:function(result){
    if (result.data.success == false && result.data.sourse =='session' ){
      this.errorHandle();
    }
  },
  errorHandle: function () {
    wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/group/group', 'opentype': 'redirectTo' });
  },
  showToast: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
  },
})

