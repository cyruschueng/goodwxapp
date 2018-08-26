var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var that;
//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    tyleList:[],
    goodList: [],
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {
    if (this.data.tyleList.length){
      return;
    }
    getList(this);
    getGoodList(this);
  },

  //事件处理函数
  pushSearch:function(){
    console.log("pushSearch");
    wx.navigateTo({
      url: '../search/search',
    })
  },

  tapPushDetail:function(e){
    var typeId = e.currentTarget.id;
    console.log('./detail/detail?typeId=' + typeId);
    wx.navigateTo({
      url: './detail/detail?typeId=' + typeId,
    })
  },
})

/*
* 获取数据
*/
function getList(t,k) {
  that = t;
  console.log("tyleList");
  var typeList = Bmob.Object.extend("typeList");
  var query = new Bmob.Query(typeList);
  query.descending('createdAt');
  query.find({
    success: function (results) {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
        console.log(results);
        console.log(that.data.skip);
        that.setData({
          tyleList: that.data.tyleList.concat(results)
        })
    },
    error: function (error) {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}
function getGoodList(t, k) {
  that = t;
  var typeList = Bmob.Object.extend("goodSelected");
  var query = new Bmob.Query(typeList);
  query.descending('createdAt');
  query.find({
    success: function (results) {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
        console.log(results);
        console.log(that.data.skip);
        that.setData({
          goodList: that.data.goodList.concat(results)
        })
    },
    error: function (error) {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}