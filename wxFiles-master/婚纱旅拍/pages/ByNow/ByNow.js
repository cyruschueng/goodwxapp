// pages/ByNow/ByNow.js
var util = require("../../utils/util.js");
var date = util.formatTime(new Date).substring(0,10)
var app = getApp();
Page({
  data: {
    product: {},
    address:{},
    select:false,
    total: 0,
    count: 1,
    payStyle: ['1000定金', '全款'],
    date: date,
    payfs: '全款',
    index:1
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.data.product = { id: options.id, name: options.name, image: options.image, price: options.price };
    that.setData({
      product: that.data.product
    });
    wx.request({
      url: app.globalData.IP + "wx/findbymoren.do",
      data: { id: app.globalData.UID },
     
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res);
        if (res.data == 0) {
          that.data.address = { detail: '还没有收获地址点我去添加' }
        }
        else {
          that.data.address = { id: res.data.id, name: res.data.name, phone: res.data.phone, detail: res.data.detail };
          that.data.select=true;
        }
        that.setData({
          total: that.data.product.price,
          address: that.data.address,
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //增加
  add: function () {
    var that = this;
    that.data.count += 1;
    that.jisuan();
  },
  //减少
  reduce: function () {
    var that = this;
    if (that.data.count > 1) {
      that.data.count -= 1;
      that.jisuan();
    }
  },
  //计算总价格
  jisuan: function () {
    var that = this;
    var count = parseFloat(that.data.count);
    var price = that.data.product.price * 1.0;
    if(that.data.payfs=='全款')
    var total = (price - ((count - 1) * app.globalData.pt * price)) * count;
    else
     var total = 1000 * count;
    total = parseInt(total);
    that.setData({
      count: count,
      total: total
    })
  },
  //立即购买
  buy: function () {
    var that = this;
    if (that.data.select) {
      wx.request({
        url: app.globalData.IP + "wx/buyinproduct.do",

        data: {
          addressid: that.data.address.id,
          userid: app.globalData.UID,
          productid: that.data.product.id,
          count: that.data.count,
          total: that.data.total,
          payfs:that.data.payfs,
          ydrq:that.data.date
        },
          header:{'content-type':'application/x-www-form-urlencoded'},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
          if (res.data == 0) {
            wx.showToast({
              title: '订单生成失败请重试',
              duration: 2000,
              icon: 'loading'
            })
          } else {
            that.data.addressid = 0;
            var id = res.data;
            wx.navigateTo({
              url: '/pages/OrderDetails/OrderDetails?id=' + id
            })
          }
        },
      })
    }else{
      wx.showToast({
        title:'选择收货地址',
        duration:2000
      })
    }
  },
  toaddress: function () {
    wx.navigateTo({
      url: '/pages/Address/Address?type=1',
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      payfs:this.data.payStyle[e.detail.value],
      index:e.detail.value
    })
    this.jisuan();
  },
    bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
})