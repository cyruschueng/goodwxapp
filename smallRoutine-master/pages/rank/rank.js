// pages/rank/rank.js
var postsData = require('../../data/posts-data.js');
var util = require('../../utils/util.js');
var app = getApp();
var windowWidth = app.globalData.windowWidth;
var windowHeight = app.globalData.windowHeight;

var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["好友排行", "世界排行"],
    activeIndex: 0,
    userInfo: app.globalData.userInfo,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;

      that.setData({
        userInfo: app.globalData.userInfo
      });

      wx.showLoading({
        title: '加载中...',
      })

      setTimeout(function(){
        //世界排行榜
        util.httpPost("/qBank/getSpiritsQuestionTopMid?mid=" + that.data.userInfo.mid, function (res) {
          console.log(res);
          that.setData({
            worldList: res.questionTop
          });
          var userInfo = that.data.userInfo;
          userInfo.rank = parseInt(res.userInfo.rank);
          that.setData({
            userInfo: userInfo,
          });
          wx.hideLoading();
        });
        //好友排行榜
        util.httpPost("/qBank/getSpiritsFriendsTopMid?mid=" + that.data.userInfo.mid, function (res) {
          console.log(res);
          that.setData({
            friendsList: res.questionTop
          });
          var userInfo = that.data.userInfo;
          userInfo.rank = parseInt(res.userInfo.rank);
          that.setData({
            userInfo: userInfo,
          });
          wx.hideLoading();
        });
      }, 100);

  },

  //选项卡点击事件
  tabTap: function(event){
    var id = event.currentTarget.id;
    that.setData({
      activeIndex: id,
    })
  },

  rankItemTap: function(event){
    var item = event.currentTarget.dataset.item;
    app.setGlobalData("otherUserInfo", item);
    wx.navigateTo({
      url: '../userInfo/userInfo?mid=' + item.mid + "&displayName=" + item.displayName,
    });
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
    that.setData({
      userInfo: app.globalData.userInfo
    })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '章鱼答答堂',
      path: '/pages/index/index?mid=' + that.data.userInfo.mid,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})