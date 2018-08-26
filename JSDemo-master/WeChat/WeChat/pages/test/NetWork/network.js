// pages/test/NetWork/network.js

var baseURL = getApp().globalData.baserURL;
var screenHeight = getApp().globalData.screenHeight;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏
    navbar: ['新订单', '进行中', '已完成'],
    currentTab: 0,

    // banner
    banners: [],
    indicatorDots: 0,


    // 数据
    orderList: [],
    page: 1,
    totalPage: 1,
    scrollTop: 0,
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(1, false);
    this.getBanner();
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
    this.setData({
      page:1
    })
    this.getList(this.data.page, true);
    this.getBanner();
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

  /// custom method
  /**
   * 导航切换监听
   */
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 获取banners
   */
  getBanner: function () {
    var that = this
    wx.request({
      url: baseURL + 'focus.getFocus&devicetype=iphone&sign=539e6f0cbb17108feafc990aa9e49181&channel_code=100002004&version=1.5.4&userType=2&deviceId=581f4bf288704f6fbcad035eb44cacda&deviceType=iphone&appType=1&adType=2&channelCode=100002004&deviceid=581f4bf288704f6fbcad035eb44cacda&userToken=505f95af64c802654831bb2ee4657636&app_type=1&usertoken=505f95af64c802654831bb2ee4657636&user_type=2',
      method: 'POST',

      success: function (res) {
        that.setData({
          banners: res.data.data.data.list,
          indicatorDots: res.data.data.data.list.length
        })
      },
      fail: function (res) {

      }
    })
  },

  /**
   * 获取列表
   */
  getList: function (requestPage, stopPull) {
    var that = this
    wx.request({
      url: baseURL + 'serviceOrder.getOrderList&devicetype=iphone&sign=8651a6a07d8b3a55a64ef129cb8b2975&order_type=1&channel_code=100002004&version=1.5.4&userType=2&company_id=14271&deviceId=581f4bf288704f6fbcad035eb44cacda&deviceType=iphone&user_id=18860&appType=1&channelCode=100002004&deviceid=581f4bf288704f6fbcad035eb44cacda&userToken=505f95af64c802654831bb2ee4657636&app_type=1&usertoken=505f95af64c802654831bb2ee4657636&user_type=2' + '&page=' + requestPage,
      
      method: 'POST',

      success: function (res) {
        wx.stopPullDownRefresh();

        if (requestPage == 1) {
          that.setData({
            orderList: res.data.data.data.list,
            totalPage: res.data.data.data.pageNum,
          })
        } else {
          that.setData({
            orderList: that.data.orderList.concat(res.data.data.data.list),
            totalPage: res.data.data.data.pageNum,
          })
        }
      },
      fail: function (res) {
        wx.stopPullDownRefresh();
      }
    })
  },

  refreshData:function(e){
    var that = this;
    that.setData({
      page:1
    })

    that.getList(that.data.page)
  },

  loadMore: function (e) {
  // var offsetY = e.detail.

    var that = this;
    if (that.data.page > that.data.totalPage) {
      return
    } else {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      });

      that.setData({
        page: that.data.page + 1,
      });

      if (that.data.page <= that.data.totalPage) {
        that.getList(that.data.page);
      }
    }
  },

  scroll: function (e) {
    var that = this;
    var scrollTop = e.detail.scrollTop;
    if (screenTop > screenHeight) {
      that.setData({
        scrollTop: 1,
        hidden: false
      });
    } else {
      that.setData({
        scrollTop: 0,
        hidden: true
      });
    }
    // if (scrollTop > 600) {
    //   this.setData({
    //     scrollTop: 1,
    //     hidden: false
    //   })
    // } else {
    //   this.setData({
    //     scrollTop: 1,
    //     hidden: true
    //   });
    // }
  },

  goTop: function () {
    this.setData({
      scrollTop: 0,
      hidden: true
    })
  },
})