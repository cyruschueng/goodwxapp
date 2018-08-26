var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var that;
//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    toView: "",
    arrHomeCarousel: [],
    arrHomeList: [],
    motto: 'MiHome_Store',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    limit: 3,
    skip: 0,
    loadfinish:false,
    noticeList:[]
  },

  onLoad: function () {
    that = this;
  },
  
  onShow: function () {
    if (this.data.arrHomeList.length) {
      return;
    }
    gethomeCarousel();
    gethomeList();
  },

  onPullDownRefresh: function () {
    console.log('--------下拉刷新-------');
  },

  onReachBottom: function () {
    if (that.data.loadfinish){
      wx.showToast({
        title: '已经全部加载完毕',
        icon: '',
      })
      return
    }
    console.log('--------上拉刷新-------');
    wx.showNavigationBarLoading();
    gethomeList();
  },
  scroll: function (e) {
    if (this.data.toView == "top") {
      this.setData({
        toView: ""
      })
    }
  },
  //事件处理函数
  tapCarousel: function (e) {
    var id = e.currentTarget.id;
    console.log(id);
  },
  
  tapPush: function(e) {
    var id = e.currentTarget.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/goods-details/index?contentId='+id,
    })
  },

})

/*
* 获取首页轮播数据
*/
function gethomeCarousel() {
  var homeCarousel = Bmob.Object.extend("homeCarousel");
  var query = new Bmob.Query(homeCarousel);
  query.descending('createdAt');
  var mainQuery = Bmob.Query.or(query);
  mainQuery.find({
    success: function (results) {
      // 循环处理查询到的数据
      console.log(results);
      that.setData({
        arrHomeCarousel: results,
        noticeList: results
      })
    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}

/*
* 获取首页数据
*/
function gethomeList() {
  wx.showLoading({
    title: '刷新中',
    mask:true
  })
  var homeList = Bmob.Object.extend("homeList");
  var query = new Bmob.Query(homeList);
  query.descending('createdAt');
  query.limit(that.data.limit);
  query.skip(that.data.skip);
  query.find({
    success: function (results) {
      wx.hideLoading();
      console.log(results);
      if (results.length>0){
        that.data.skip += results.length;
        console.log(results);
        console.log(that.data.skip);
        that.setData({
          arrHomeList: that.data.arrHomeList.concat(results)
        })
      }else{
        that.data.loadfinish = true;
      }
    },
    error: function (error) {
      wx.hideLoading();
      console.log("查询失败: " + error.code + " " + error.message);
      wx.showToast({
        title: "查询失败: " + error.code + " " + error.message,
        icon: '',
      })
    }
  });
}