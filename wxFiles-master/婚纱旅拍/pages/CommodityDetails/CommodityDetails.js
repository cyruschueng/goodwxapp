// pages/CommodityDetails/CommodityDetails.js
var util = require("../../utils/util.js");
var date = util.formatTime(new Date).substring(0, 10)
var app = getApp()
Page({
  data: {
    index: 0,
    BoxFlag: false,
    ScrollTop: 0,
    BackFlag: false,
    swiperCurrent: 0,
    slider: app.globalData.slider,
    ImgList: app.globalData.slider,
    product: {},
    shopcarnumber: 0,
    tj: [],
    ShoppingCartFlag: true,
    payStyle: ['1000定金', '全款'],
    date: date,
    payfs: '1000定金'
  },
  //滑块指示
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //显示，隐藏回到顶部 
  EventHandle: function (e) {
    var that = this;
    console.log(e.detail.scrollTop)
    if (e.detail.scrollTop >= 710) {
      that.setData({
        BackFlag: true
      })
    } else {
      that.setData({
        BackFlag: false
      })
    }
  },
  closeDialog: function () {
    console.log("---sdsds")
    this.setData({
      ShoppingCartFlag: true
    });
  },
  //回到顶部
  BackTop: function () {
    var that = this;
    that.setData({
      ScrollTop: 0
    })
    console.log(that.data.ScrollTop)
  },
  //显示购物车
  showShopCar: function () {
    var that = this;
    that.setData({
      ShoppingCartFlag: false
    });


  },
  addshopcar: function () {
    var that = this;
    wx.request({
      url: app.globalData.IP + "wx/addshopcar.do",
      data: { productid: that.data.product.id, userid: app.globalData.UID, ydrq: that.data.date, payfs: that.data.payfs },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        if (res.data == 1) {
          that.getshopcarnumber();
          that.setData({
            ShoppingCartFlag: true
          });
        }
        else {
          wx.showToast({
            title: '已在购物车中',
            duration: 2000,
          })
        }
      },
    });
  },
  shopc: function () {
    wx.switchTab({
      url: '/pages/ShopCar/ShopCar',
    })
  },
  //关闭购物车
  choseShopCar: function () {
    var that = this;
    that.setData({
      ShoppingCartFlag: true
    })
  },
  //立即购买
  ByNow: function () {
    var that = this;
    wx.navigateTo({
      url: '/pages/ByNow/ByNow?id=' + that.data.product.id + "&name=" + that.data.product.name + "&price=" + that.data.product.price
      + "&image=" + that.data.product.image,
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.data.product = { id: options.id, name: options.name, image: options.image, price: options.price, sales: options.sales };
    that.setData({
      product: that.data.product,
      slider: app.globalData.slider,
      ImgList: app.globalData.slider
    });
    wx.request({
      url: app.globalData.IP + "wx/tj.do",
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var item = { image: '', name: '', price: '', sales: '', id: res.data[i].id };
          item.image = app.globalData.IP + 'controller/' + res.data[i].image;
          item.name = res.data[i].name;
          item.price = res.data[i].price;
          item.sales = res.data[i].sales;
          that.data.tj = that.data.tj.concat(item);
        }

        that.setData({
          tj: that.data.tj
        })
      },
    })
    that.getshopcarnumber();
  },
  getshopcarnumber: function () {
    var that = this;

    wx.request({
      url: app.globalData.IP + "wx/shopcarnumber.do",
      data: { userid: app.globalData.UID },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        that.setData({
          shopcarnumber: res.data
        })
      },
    })
  },
  tjclick: function (e) {
    var that = this;
    var that = this;
    var p = that.data.tj[e.currentTarget.id];
    wx.navigateTo({
      url: '/pages/CommodityDetails/CommodityDetails?id=' + p.id + "&name=" + p.name + "&price=" + p.price + "&image=" + p.image + "&sales=" + p.sales,
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      payfs: this.data.payStyle[e.detail.value],
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
})