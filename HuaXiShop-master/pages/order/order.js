// pages/order/order.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    GuestUserData: null,//用户信息
    navItems: [
      { id: 0, item: "全部订单" },
      { id: 1, item: "待付款" },
      { id: 2, item: "待收货" },
      { id: 3, item: "售后订单" },
    ],
    tag: 0,
    OrderList:null,//订单列表
  },
  //事件处理函数
  switchTab: function (e) {
    var id = e.target.dataset.id
    this.setData({
      tag: id,
    });
    this.getUserOrderList();
  },
  onLoad: function (options) {
    console.log(options.tag)
    this.setData({
      tag: options.tag
    });
  },
  onShow: function () {
    var that = this
    if (app.globalData.GuestUserData) {
      that.setData({
        GuestUserData: app.globalData.GuestUserData,
        userInfo: app.globalData.userInfo
      })
      that.getUserOrderList();
    } else {
      app.appCallback = res => {//用户信息返回后调用
        that.setData({
          GuestUserData: res.data,
          userInfo: app.globalData.userInfo
        });
        that.getUserOrderList();
      }
    }
  },

  //获取订单列表
  getUserOrderList:function(){
    var that = this;
    that.setData({
      OrderList:null
    })
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getUserOrderList",
        UserId: that.data.GuestUserData.ds[0].UserId,
        Tag: that.data.tag
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if(res.data.ds!=undefined){
          that.setData({
            OrderList:res.data.ds
          })
        }
      }
    });
  },

  
})