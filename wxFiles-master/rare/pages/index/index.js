var app = getApp()
Page({
  data: {
    opq:0,
    imgUrls: [],//轮播图
    swiperCurrent:0,
    ShopList:[]//产品信息
  },
  //搜索页面
  navToSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  navToDoclassify: function (e) {
    var that = this
    wx.navigateTo({
      url: '/pages/doclassify/doclassify?li=' + JSON.stringify(that.data.ShopList[e.currentTarget.id]),
    })
  },
  //产品详情
  navToGoods: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.id,
    })
  },
  //公告
  navToNotice:function () {
    wx.navigateTo({
      url: '/pages/notice/notice',
    })
  },
  //全部
  navToAll: function (e) {
    wx.navigateTo({
      url: '/pages/all/all?ty='+e.currentTarget.dataset.ty
    })
  },
  //
  navToPromotion: function () {
    wx.navigateTo({
      url: '/pages/promotion/promotion',
    })
  },
  onLoad: function () {
    var that = this
    app.load(that)
    app.getUserInfo();
    
  },
  onShow:function () {
    var that = this;
    //获取产品信息
    wx.request({
      url: app.url + 'ShowIndexPro/showselect',
      data:{
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          opq:1
        });
        console.log(res)
        that.setData({
          ShopList:res.data
        })
      }
    });
    //首页轮播图
    wx.request({
      url: app.url + 'ShowIndexPro/TopImg',
      data: {
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        that.setData({
          imgUrls: res.data
        })
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: 'Rare首页',
      path: '/page/index/index',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
})