// pages/search/search.js

let that;
const app = getApp();
const historyKey = "searchHistory";

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    that.setData({
      skin: app.globalData.skin
    });
    app.skin.setNavigationBarColor(that.data.skin);

    wx.getStorage({
      key: historyKey,
      success: function (res) {
        that.setData({
          histories: res.data
        });
      },
    });
  },
  removeHistories: function () {
    wx.removeStorage({
      key: historyKey,
      success: function (res) {
        that.setData({
          histories: null
        });
      },
      fail: function (res) {
        app.util.error("删除失败");
      }
    });
  },
  search: function (e) {
    var keywords = that.data.input;
    if (e.currentTarget.id =='histroy-item'){
      keywords=e.currentTarget.dataset.keywords;
    }
    
    if (!keywords) {
      app.util.toast("请输入要查询的内容")
      return;
    }
    wx.getStorage({
      key: historyKey,
      success: function (res) {
        var data = res.data || [];
        var existIndex = -1;
        data.forEach(function (item, index) {
          if (item == keywords) {
            existIndex = index;
          }
        });
        if (existIndex != -1) {
          data.splice(existIndex, 1);
        }
        data.splice(0, 0, keywords);
        that.setData({
          histories: (data)
        });
        that.insertStorage(data);
      },
      fail: function (e) {
        that.insertStorage([keywords]);
      }
    });
    wx.navigateTo({
      url: '/pages/searchResult/searchResult?keywords=' + keywords,
    });
  },
  input: function (e) {
    that.setData({
      input: e.detail.value
    });
  },
  insertStorage: function (data) {
    wx.setStorage({
      key: historyKey,
      data: data
    });
  }
})