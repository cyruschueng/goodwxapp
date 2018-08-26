var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var that;
//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    toView: "",
    limit: 3,
    searchProductList: [],
    skip: 0,
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {
    if (this.data.searchProductList.length) {
      return;
    }
  },

  // onPullDownRefresh: function () {
  //   console.log('--------下拉刷新-------');
  //   this.data.skip = 0;
  //   this.data.searchProductList = [];
  //   getList(this);
  //   wx.showNavigationBarLoading();
  // },

  onReachBottom: function () {
    console.log('--------上拉刷新-------');
    getList(this, this.data.inputVal);
  },

  scroll: function (e) {
    if (this.data.toView == "top") {
      this.setData({
        toView: ""
      })
    }
  },
  //事件处理函数

  // 输入数据
  inputTyping: function (e) {
    //搜索数据
    that.data.skip = 0;
    that.data.searchProductList = [];
    console.log(e.detail.value);
    getList(this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },

  //点击取消
  clearInput: function () {
    console.log("clearInput");
    this.setData({
      inputVal: ""
    });
    getList(this);
  },

  showInput: function () {
    console.log("showInput");
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    console.log("hideInput");
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    getList(this);
  },

})

/*
* 获取数据
*/
function getList(t, k) {
  wx.showLoading({
    title: '刷新中',
    mask: true
  })
  that = t;
  console.log("homeList");
  var homeList = Bmob.Object.extend("homeList");
  var query = new Bmob.Query(homeList);
  // query.equalTo("title", { "$regex": "" + k + ".*" });
  query.descending('createdAt');
  //模糊查询
  if (k) {
    query.equalTo("title", k);
  } 
  // 查询所有数据
  query.limit(that.data.limit);
  query.skip(that.data.skip);
  query.find({
    success: function (results) {
      wx.hideLoading();
      if (results.length > 0) {
        that.data.skip += results.length;
        console.log(results);
        console.log(that.data.skip);
        that.setData({
          searchProductList: that.data.searchProductList.concat(results)
        })
      }
    },
    error: function (error) {
      wx.hideLoading();
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}
