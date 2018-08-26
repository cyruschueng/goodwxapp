//index.js
var util = require('../../utils/util.js');
var common = require('../../utils/common.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    userInfo: {}
  },


  //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，
  //所以，需要在页面的onLoad事件中给scroll-view的高度赋值
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    console.log('onShow')
    var that = this;
    that.setData({
      hidden: false
    })
    util.getList().then(res => {
      that.setData({
        list: res.data,
        hidden: true
      });
    })
  },
  listAction: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("点击" + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    that.setData({
      hidden: false
    })
    util.getList().then(res => {
      that.setData({
        list: res.data,
        hidden: true
      });
    })
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    console.log("refresh")
    var that = this
    this.setData({
      list: [],
      scrollTop: 0,
      hidden:false
    });
    util.getList().then(res => {
      that.setData({
        list: res.data,
        hidden: true
      });
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    this.setData({
      list: [],
      scrollTop: 0
    });
    util.getList().then(res => {
      that.setData({
        list: res.data,
        hidden: true
      });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh()
    })
  },
})

