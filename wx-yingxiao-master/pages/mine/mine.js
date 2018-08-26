// pages/mine/mine.js
var util = require('../../utils/API.js');
Page({
  data: {
    statusList:[
      {img:'/pages/source/images/status1.png',title:'待付款'},
      { img: '/pages/source/images/status2.png', title: '待成团' },
      { img: '/pages/source/images/status3.png', title: '待发货' },
      { img: '/pages/source/images/status4.png', title: '待收货' },
      { img: '/pages/source/images/status5.png', title: '已完成' },                        
    ],
    functionList: [
      { img: '/pages/source/images/online.png', title: '在线预约' },
      { img: '/pages/source/images/select.png', title: '在线查询' },
      { img: '/pages/source/images/macard.png', title: '我的会员卡' },
      { img: '/pages/source/images/mysalary.png', title: '我的优惠券' },
    ],
    active: [
      { img: '/pages/source/images/pt.png', title: '我的团购' },
      { img: '/pages/source/images/fx.png', title: '我的分销' },
      { img: '/pages/source/images/xc.png', title: '我在现场' },
      { img: '/pages/source/images/qg.png', title: '我的地域抢订' },
    ],
    url:[
      '/pages/appointment/appoinment',
      '/pages/checking/checking',
      '/pages/membership/membership',
      '/pages/coupon/coupon'
    ]
  },
  onLoad:function(){   
    var that = this;
    if (getApp().globalData.userphone != null) {
      that.setData({
        tobindphone: '0'
      })
    }
    that.setData({
      userName: getApp().globalData.uesrinfo.nickName,
      header: getApp().globalData.uesrinfo.avatarUrl,
    })
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getCartnum',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { user_id: getApp().globalData.userid },
      success: function (res) {
        that.setData({
          cart_num: res.data.cart_num,
        })
      },
    })
  },
  onShow: function (options) {
    var that = this;
    if (getApp().globalData.userphone != null) {
      that.setData({
        tobindphone: '0'
      })
    }
    that.setData({
      userName: getApp().globalData.uesrinfo.nickName,
      header: getApp().globalData.uesrinfo.avatarUrl,
    })
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getCartnum',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { user_id: getApp().globalData.userid },
      success: function (res) {
        that.setData({
          cart_num: res.data.cart_num,
        })
      },
    })
  },
  todetail:function(e){
    var that = this;
    wx.navigateTo({
      url: that.data.url[e.currentTarget.dataset.index],
    })
  },
  toorderlistAll:function(){
    wx.navigateTo({
      url: '/pages/orders/orders',
    })
  },
  toorderlist:function(e){
    var current = e.currentTarget.dataset.index+1;
    wx.navigateTo({
      url: '/pages/orders/orders?current='+current,
    })
  },
  tocollection:function(){
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  topaycar:function(){
    wx.navigateTo({
      url: '/pages/paycar/paycar',
    })
  },
  setting:function(){
    wx.navigateTo({
      url: '/pages/setting/setting?code=0',
    })
  },
  address:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  tocheck:function(e){
    console.log(e.currentTarget.dataset)
    switch (e.currentTarget.dataset.key){
      case 1:
        wx.navigateTo({
          url: '/pages/distributionList/distributionList',
        })
        break;
      default:
        wx.showToast({
          title: '请联系客服开通',
          duration:2000,
          image:'/pages/source/images/waiting.png'
        })
      break;
    }
  },
  tonotice:function(e){
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: '/pages/appointment/appoinment',
        })
        break;
      default:
        wx.showToast({
          title: '请联系客服开通',
          duration: 2000,
          image: '/pages/source/images/waiting.png'
        })
        break;
    }    
  },
  bindphone:function(){
    wx.navigateTo({
      url: '/pages/setting/setting?code=1',
    })
  }
})