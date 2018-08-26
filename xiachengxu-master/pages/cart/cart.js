import { Cart } from './cart-model.js';
var cart = new Cart();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hasMore: true,
    allProducts: [],
    slideLeft: 0, // 往左滑动的距离
    startX: 0, // 水平方向位置
    current: 0, // 当前移动的商品ID
    moveDistance: 0, // 已移动的距离
    showGuide: true, // 预约是否第一次引导
    first_show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      first_show: wx.getStorageSync('first_show')
    });
    this._loadData();
  },
  onShow() {
    wx.hideTabBarRedDot({ index: 2 });
    var fresh = wx.getStorageSync('cart-fresh');
    if (fresh) {
      this._loadData();
      wx.removeStorageSync('cart-fresh');
    }
  },
  /**
   * 加载数据
   */
  _loadData() {
    var that = this;
    var userInfo = app.globalData.userInfo;
    if (!userInfo) {
      app.getUserSetting(res => {
        userInfo = res.userInfo
      })
    }
    this.setData({
      userInfo
    });
    this.pullProductsData();
  },

  pullProductsData() {
    var that = this;
    var params = {
      data: {

      }
    };
    cart.getCartProducts(params, res => {
      if (res.status) {
        that.setData({
          allProducts: res.data,
          loadingHidden: true
        });
        wx.setStorageSync('first_show', res.data.length);
      } else {
        that.setData({
          allProducts: [],
          loadingHidden: true
        });
      }
    });
  },

  call(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  // 批量一键预约
  appointStoreProducts(e) {
    var that = this;
    var userInfo = app.globalData.userInfo;
    if (!userInfo && !userInfo.gender) {
      app.getUserSetting(res => {
        that.setData({
          userInfo
        });
      });
    } else {
      app.aldstat.sendEvent('购物车-一键预约');
      var storeNo = cart.getDataSet(e, 'id');
      var store = this.data.allProducts.find(item => { return item.storeNo == storeNo });
      var products = store.goodsList;
      wx.setStorageSync('appointProducts', products);
      app.globalData.appoint = {
        bookerName: userInfo.nickName,
        mobile: wx.getStorageSync('mobile')
      }
      wx.navigateTo({
        url: '/pages/appointment/appointment?type=multiple&storeNo=' + storeNo
      })
    }
  },

  // 购物车点击商品进入商品详情
  detailTap(e) {
    var id = cart.getDataSet(e, 'id');
    this.setData({
      current: 0,
      slideLeft: 0,
      moveDistance: 0
    });
    wx.navigateTo({
      url: '/pages/product/product?id=' + id
    });
  },
  goHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 删除功能实现
   */

  //手指触摸动作开始
  touchS(e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        slideLeft: 0,
        moveDistance: 0
      });
    }
  },

  // 手指触摸后移动
  touchM(e) {
    if (e.touches.length == 1) {
      // 手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      var { startX, startY, moveDistance } = this.data;
      var distance = Math.abs(e.touches[0].clientY - startY);
      var dif = startX - moveX, slideLeft = 0;
      console.log(distance, dif);
      if (distance > 20 || (dif <= 0 && moveDistance <= 0)) return;
      slideLeft = dif > 0 ? 2 * Math.abs(dif) + moveDistance : dif + moveDistance;
      slideLeft = slideLeft > 120 ? 120 : slideLeft < 20 ? 0 : slideLeft;
      this.setData({
        slideLeft: -slideLeft
      });
      var goodsId = cart.getDataSet(e, 'id');
      this.setData({
        current: goodsId
      });
    }
  },


  // 触摸移动结束
  touchE(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      var distance = Math.abs(e.changedTouches[0].clientY - this.data.startY);
      var disX = this.data.startX - endX;
      console.log(disX);
      //触摸开始与结束，手指移动的距离
      var goodsId = cart.getDataSet(e, 'id');
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var slideLeft = Math.abs(this.data.slideLeft);
      this.setData({
        slideLeft: slideLeft > 60 ? -120 : 0,
        moveDistance: slideLeft > 60 ? 120 : 0,
        current: goodsId,
        startX: 0
      });

    }
  },

  // 关闭预约引导
  closeGuide() {
    this.setData({
      showGuide: false
    });
  },

  // 删除购物车商品
  deleteProduct(e) {
    var storeNo = cart.getDataSet(e, 'storeno');
    var goodsId = cart.getDataSet(e, 'id');
    var goodsName = cart.getDataSet(e, 'name');
    var params = {
      data: {
        goodsName,
        goodsId,
        storeNo,
      }
    };
    cart.deleteProduct(params, res => {
      if (res.status) {
        // 设置首页需要刷新数据
        wx.setStorageSync('fresh', true);
        var { allProducts } = this.data;
        var storeIndex = allProducts.findIndex(item => { return item.storeNo == storeNo });
        var index = allProducts[storeIndex].goodsList.findIndex(item => { return item.goodsId == goodsId });
        allProducts[storeIndex].goodsList.splice(index, 1);
        if (!allProducts[storeIndex].goodsList.length) {
          allProducts.splice(storeIndex, 1);
        }
        this.setData({
          slideLeft: -1,
          startX: 0,
          current: -1,
          moveDistance: 0,
          allProducts
        });
      } else {

        this.setData({
          slideLeft: -1,
          startX: 0,
          current: -1,
          moveDistance: 0
        });
      }
    })

  },

  enterStore(e) {
    var storeNo = cart.getDataSet(e, 'storeno');
    wx.setStorageSync('storeNo', storeNo);
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },

  onHide() {
    this.setData({
      slideLeft: -1,
      startX: 0,
      current: -1,
      moveDistance: 0
    });
  },


})