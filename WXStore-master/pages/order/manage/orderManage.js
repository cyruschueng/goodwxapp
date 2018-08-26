// pages/order/manage/orderManage.js
let app = getApp();
let serverHost = app.globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },
  viewOrderInfo: function (e) {
    let orderId = e.currentTarget.dataset.id;
    console.log(orderId);
    wx.navigateTo({
      url: '../orderInfo?orderId=' + orderId
    })
  },
  deleOrder: function (e) {
    let index = e.currentTarget.dataset.index;
    let newList = this.data.orderList;
    let orderId = e.currentTarget.dataset.id;
    newList.splice(index, 1);
    this.setData({
      orderList: newList
    })
    wx.request({
      url: serverHost + 'order/delete',
      data: {
        orderId: orderId
      },
      success: function (res) {
        let msg = "删除失败"
        if (res.data == "success") {
          msg = "删除成功";
        }
        wx.showToast({
          title: msg,
        })
      },
      fail: function () {
        wx.showToast({
          title: "删除失败",
        })
      }
    })
    console.log("删除", index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderManageList()
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.getOrderManageList();
  },
  //获取订单数据
  getOrderManageList: function () {
    let _this = this;
    let userId = app.globalData.userid;
    wx.request({
      url: serverHost + 'order/orderManage',
      data: {
        userId: userId
      },
      success: res => {
        console.log(res);
        _this.setData({
          orderList: res.data
        });
        wx.stopPullDownRefresh();
      }
    })
  }
})