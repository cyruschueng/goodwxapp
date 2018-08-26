var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    mine_list: [
      {
        "pic_url": "/images/iocn_home_01.png",
        "title": "我的订单",
      },
      {
        "pic_url": "/images/iocn_home_02.png",
        "title": "优惠券",
      },
      {
        "pic_url": "/images/iocn_home_03.png",
        "title": "收货地址",
      },
      {
        "pic_url": "/images/iocn_home_04.png",
        "title": "待付款",
      },
      {
        "pic_url": "/images/iocn_home_04.png",
        "title": "待收货",
      },
      {
        "pic_url": "/images/iocn_home_04.png",
        "title": "待评价",
      }
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  tapPush: function (e) {
    var typeId = e.currentTarget.id;
    console.log(typeId);
    if(typeId==0){
      console.log('order');
      wx.navigateTo({
        url: './order/order',
      })
    } else if (typeId == 1){
      console.log('juan');
    } else if (typeId == 2) {
      console.log('address');
      wx.navigateTo({
        url: './address/address',
      })
    } else if (typeId == 3) {
      console.log('pay');
    } else if (typeId == 4) {
      console.log('shouhuo');
    } else  {
      console.log('common');
    }
  
  },
})

