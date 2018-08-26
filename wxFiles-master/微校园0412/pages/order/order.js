// pages/order/order.js
var app = getApp();
var that;
Page({
  jinji: '金额',
  data: {
    order: [],
    url: app.globalData.IP + 'controller/',
    showl:false
  },
  navtos: function (e){
    wx.navigateTo({
      url: '/pages/menu/item/storeMenu/storeMenu?id='+e.currentTarget.dataset.index,
    })
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:5000,
    })
  },
  onReachBottom: function () {


    wx.request({
      url: app.globalData.IP + "wx/updateorder.do",
      data: {
        id: app.globalData.ID,
        len: that.data.order.length
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var item = { id: res.data[i].id, time: res.data[i].time.substring(0, res.data[i].time.length - 2), ops: res.data[i].ops,shop: res.data[i].shop, content: res.data[i].ops.length, sum: res.data[i].totalprice, status: res.data[i].paystatus,boxprice:res.data[i].boxprice,sendprice:res.data[i].sendprice };
          var content = '';
          for (var j = 0; j < res.data[i].ops.length; j++) {
            content += res.data[i].ops[j].product.name + res.data[i].ops[j].count + "份,";
          }
          item.content = content;
          that.data.order.push(item);
        }
        that.setData({
          order: that.data.order
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      },
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    app.run("进入订单界面");
    that = this;
    wx.request({
      url: app.globalData.IP + "wx/myorder.do",
      data: { id: app.globalData.ID },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.hideToast();
        console.log(res);
        that.data.order = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = { id: res.data[i].id, time: res.data[i].time.substring(0, res.data[i].time.length - 2), ops: res.data[i].ops, shop: res.data[i].shop, content: res.data[i].ops.length, sum: res.data[i].totalprice, status: res.data[i].paystatus, boxprice: res.data[i].boxprice, sendprice: res.data[i].sendprice };
          var content = '';
          if (res.data[i].ops.length > 0) {
            for (var j = 0; j < res.data[i].ops.length; j++) {
              content += res.data[i].ops[j].product.name + res.data[i].ops[j].count + "份,";
            }
          } else {
            content = res.data[i].bz.split("*")[2] + "1份,";
          }
          item.content = content;
          that.data.order.push(item);
        }
        that.setData({
          showl:true,
          order: that.data.order
        })
      },
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  order: function (e) {

    var that = this;
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/order/orderDetail/orderDetail?value=1&id=" + id
    })

  },
  onPullDownRefresh: function () {
    that = this;
    wx.request({
      url: app.globalData.IP + "wx/myorder.do",
      data: { id: app.globalData.ID },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.stopPullDownRefresh();
        wx.hideToast();
        console.log(res);
        that.data.order = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = { id: res.data[i].id, time: res.data[i].time.substring(0, res.data[i].time.length - 2), ops: res.data[i].ops, shop: res.data[i].shop, content: res.data[i].ops.length, sum: res.data[i].totalprice, status: res.data[i].paystatus, boxprice: res.data[i].boxprice, sendprice: res.data[i].sendprice };
          var content = '';
          if (res.data[i].ops.length > 0) {
            for (var j = 0; j < res.data[i].ops.length; j++) {
              content += res.data[i].ops[j].product.name + res.data[i].ops[j].count + "份,";
            }
          } else {
            content = res.data[i].bz.split("*")[2] + "1份,";
          }
          item.content = content;
          that.data.order.push(item);
        }
        that.setData({
          showl: true,
          order: that.data.order
        })
      },
    })
  }



})