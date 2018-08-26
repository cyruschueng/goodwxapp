import { Home } from '../home-model.js';
import SafeRenderUtil from '../../../utils/saveRender.js';
import { Config } from '../../../utils/config.js';
var home = new Home();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 10,
    hasMore: true,
    products: [], // 商品列表
    isShowPopup: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    if (options.id) {
      this.data.activityId = options.id;
    }
    if (options.index) {
      this.data.index = options.index;
    }
    if (options.storeNo) {
      wx.setStorageSync('storeNo', options.storeNo);
    }

    this.data.storeNo = options.storeNo || wx.getStorageSync('storeNo');
    this.data.name = options.name;
    this._loadData();
  },

  _loadData() {
    var storeNo = wx.getStorageSync('storeNo');
    this.setData({
      storeNo
    });
    this.render = new SafeRenderUtil({
      arrName: 'products',
      setData: this.setData.bind(this)
    });
    this.getProductsList();
  },

  // 获取商品列表
  getProductsList() {
    var that = this;
    var { page, size, storeNo, activityId, name, index } = this.data;
    var params = {
      index,
      data: {
        page,
        size,
        storeNo
      }
    }
    if (activityId) {
      delete params.index;
      delete params.data.storeNo;
      params.data.activityId = activityId;
    }

    home.getProductsData(params, (data) => {
      if (data && data.status) {
     if (page + 1 > Math.ceil(data.total / size)) {
          that.setData({
            hasMore: false
          });
        }
        let list = data.data;
        list.forEach(item => {
          item.goodsPic = item.goodsPic + Config.processImage;
        })
        that.render.addList(data.data);

      }
      that.setData({
        loadingHidden: true
      });
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    });
    this.getProductsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this, data = this.data;
    var path = '';
    if (data.id) {
      path = `/pages/home/list/list?name=${data.name}&id=${data.activityId}&storeNo=${data.storeNo}`
    } else {
      path = `/pages/home/list/list?name=${data.name}&index=${data.index}&storeNo=${data.storeNo}`;
    }
    return {
      title: that.data.name,
      path: path
    }
  },

  onProductTap(e) {
    // 存储formId
    var that = this;
    app.aldstat.sendEvent('活动列表页-商品详情');
    home.dealFormIds(e.detail.formId);
    // 发送收集的 formIds
    var formIds = wx.getStorageSync('formIds');
    var params = {
      data: formIds
    }
    home.saveFormIds(params, null);
    var id = home.getDataSet(e, "id");
    wx.navigateTo({
      url: '/pages/product/product?id=' + id
    });
  },

  collectProduct(e) {
    home.dealFormIds(e.detail.formId);
    app.aldstat.sendEvent('收藏-首页');
    /**
     * 收藏商品
     */
    wx.showTabBarRedDot({ index: 2 });
    var id = home.getDataSet(e, 'id');
    var index = home.getDataSet(e, 'index');
    var { isShowPopup } = this.data;
    var list = this.data.products;
    var flag, productItem;
    productItem = list.find(item => { return item.goodsId == id });
    if (productItem.isFavorite && !isShowPopup) {
      this.showMyTip('已加入过预购清单');
    } else if (!productItem.isFavorite) {
      list.forEach((item, index) => {
        if (item.goodsId == id) {
          item.isFavorite = 1;
        }
      })
      var params = {
        data: {
          goodsId: id,
          goodsName: productItem.goodsName,
          goodsPrice: productItem.goodsPrice,
          goodsPic: productItem.goodsPic,
          storeNo: this.data.storeNo
        }
      };
      home.collectProduct(params, data => {
        if (data.status) {
          wx.setStorageSync('fresh', true);
          wx.setStorageSync('cart-fresh', true);
          this.setData({
            products: list
          });
          this.showMyTip('加入预购清单成功');
        } else {
          this.showMyTip('加入预购清单失败');
        }
      });
    }

  },
  showMyTip(title) {
    var that = this;
    this.setData({
      isShowPopup: true,
      tip: title
    });
    setTimeout(() => {
      that.setData({
        isShowPopup: false
      });
    }, 3000)
  }
})