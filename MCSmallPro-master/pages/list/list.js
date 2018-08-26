// pages/list/list.js

const app = getApp();
let that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { tabType: 0, title: "热门" },
      { tabType: 1, title: "最新" },
      { tabType: 2, title: "关注" }],
    currentTabIndex: 0,
    datas: [],
    pageIndex: 1,
    hasMoreData: true
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
    
    that.loadData(0);
    app.util.get("/ApiShop/GetShareInfo", {}, function (res) {
      that.setData({
        shareTitle: res
      });
    });
  },
  onShareAppMessage: function () {
    return {
      title: that.data.shareTitle,
      success: function (res) {
        app.util.toast("转发成功");
      },
      fail: function (res) {

      }
    }
  },
  swichTab: function (e) {
    that.setData({
      currentTabIndex: e.currentTarget.dataset.currentIndex,
      datas: [],
      pageIndex: 1,
      hasMoreData: true
    });
    that.loadData(that.data.currentTabIndex);
  },
  loadData: function (tabIndex, callback) {
    if (tabIndex == 2 && !app.globalData.isLogin) {
      app.login(function () {
        that.getListData(tabIndex);
      });
      return;
    }
    var tab = that.data.tabs[tabIndex], datas = that.data.datas, pageIndex = that.data.pageIndex;
    if (!that.data.hasMoreData) {
      return;
    }
    wx.showNavigationBarLoading();
    app.util.get("/ApiShop/List", { "type": tab.tabType, pageIndex: pageIndex }, function (res) {
      wx.hideNavigationBarLoading();

      callback && callback();

      if (res.length == 0) {
        that.setData({
          hasMoreData: false
        });
        return;
      }
      res.forEach(function (item) {
        datas.push({
          id: item.ZhuboId,
          zhuboAvatar: item.ZhuboAvatar,
          zhuboName: item.ZhuboName,
          roomTitle: item.RoomTitle,
          onlineCount: item.OnlineCount,
          likeCount: item.LikeCount,
          isOnline: item.IsOnline,
          productImages: item.ProductImages,
          productTotalCount: item.ProductTotalCount
        });
      });
      that.setData({
        datas: datas,
        pageIndex: pageIndex + 1
      });
    });
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    that.setData({
      datas: [],
      pageIndex: 1,
      hasMoreData: true
    });
    that.loadData(that.data.currentTabIndex, function () {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    that.loadData(that.data.currentTabIndex);
  },
})