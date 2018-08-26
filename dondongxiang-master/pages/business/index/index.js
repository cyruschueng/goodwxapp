// pages/cooperation/index/index.js
var app = getApp();
Page({
  data: {
    user_info: [],
    shop_info: [],
   
  },
  onLoad: function (options) {
    this.uppartnerlist();
    this.refreshShopList();
  },
  //找合作
  uppartnerlist:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/user/user/getUserList',
      data: {
        page:1,
        size:3,
        search:"",
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data);
        _this.setData({
          user_info: res.data.data.arr,
        })
      }
    })
  },
  ////找合作刷新店铺列表
  refreshShopList:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/shop/shop/getShopList',
      method: 'get',
      data: {
        page:1,
        size:4
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          shop_info: res.data.data.arr,
        })
      }
    })
  },

  viewMoreCooperation: function () {

    wx.navigateTo({
      url: '/pages/business/viewMore/viewMore'
    })
  },
  shoplist: function (e) {
    wx.navigateTo({
      url: '/pages/business/shop/shop?shop_id=' + e.currentTarget.dataset.index +''
    })
  },
  detailsTap:function(e){
    wx.navigateTo({
      url: '/pages/introduce/ddshow/ddshow?user_info='+e.currentTarget.dataset.index+''
    })
  },
  viewMoreList:function(){
    wx.navigateTo({
      url: '/pages/business/ShopList/ShopList'
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.uppartnerlist();
    this.refreshShopList();
    wx.stopPullDownRefresh();
    setTimeout(function () {
      wx.showToast({
        title: '下拉刷新',
        icon: 'success',
        duration: 1000
      })
    }, 800)

  }
})