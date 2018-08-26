// pages/cart/cart.js

const app = getApp();
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.showCart();
    that.setData({
      skin: app.globalData.skin,
      skinPrimaryColor: app.skin.getSkinPrimaryColor(app.globalData.skin)
    });
    app.skin.setNavigationBarColor(that.data.skin);
  },
  showCart: function () {
    app.util.get("/ApiShop/GetCarts", {}, function (res) {
      that.setData({
        cart: res,
        cartVisible: true
      });
    });
  },
  changeCartProductQty: function (e) {
    var cartId = e.currentTarget.dataset.cartId, qty = e.currentTarget.id == "minusCartProductQty" ? -1 : 1;
    app.util.post("/ApiShop/ChangeCartProductQty", { cartId: cartId, qty: qty }, function (res) {
      that.setData({
        cart: res,
        cartVisible: true
      });
      app.util.hideLoading();
    });
  },
  removeCartProduct: function (e) {
    var cartId = e.currentTarget.dataset.cartId;
    app.util.post("/ApiShop/RemoveCartProduct", { cartId: cartId }, function (res) {
      that.setData({
        cart: res,
        cartVisible: true
      });
      app.util.hideLoading();
    });
  },
  changeCartProductStatus: function (e) {
    var cartId = e.currentTarget.dataset.cartId;
    app.util.post("/ApiShop/ChangeCartProductStatus", { cartId: cartId }, function (res) {
      that.setData({
        cart: res,
        cartVisible: true
      });
      app.util.hideLoading();
    });
  },
  changeCartAllProductStatus: function (e) {
    app.util.post("/ApiShop/ChangeCartAllProductStatus", { selected: !that.data.cart.IsSelectedAll }, function (res) {
      that.setData({
        cart: res,
        cartVisible: true
      });
      app.util.hideLoading();
    });
  },
  goBuy: function () {
    if (!that.data.cart || that.data.cart.TotalQty == 0) {
      app.util.toast("请选择商品");
      return;
    }
    wx.navigateTo({
      url: '/pages/order/order'
    });
  },

})