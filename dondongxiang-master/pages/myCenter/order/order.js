// pages/self/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    currentindex:0,
    willPayOrderarr: [],//代付款订单数组
    willSendOrderarr: [],//代发货订单数组
    willSeliveryOrderarr: [],//代收货订单数组
    willBackOrderarr: [],//退款退货订单数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab: options.oderid,
      currentindex: options.oderid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  changeType:function(e){
    this.setData({
      currentTab: e.target.dataset.current,
      currentindex: e.target.dataset.current
    })
  },
  //获取用户订单信息
  getUserOrderInfo: function (userid, statustype) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/ordermanage/orders/myorders',
      method: 'get',
      data: {
        user_id: userid,
        page: 1,
        shop_id: 0,
        status: statustype,//订单状态
        size: 10
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        //判断用户身份
        switch (statustype) {
          case 0:
            that.setData({
              willPayOrderarr: resdata.arr //代付款
            })
            break;
          case 1:
            that.setData({
              willSendOrderarr: resdata.arr //代发货
            })
            break;
          case 2:
            that.setData({
              willSeliveryOrderarr: resdata.arr // 待收货
            })
            break;
          case 3:
            that.setData({
              willBackOrderarr: resdata.arr // 退款／退货
            })
            break;
          default:
            console.log("default");
        }
      }
    })

  }
})