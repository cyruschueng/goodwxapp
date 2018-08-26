import SafeRenderUtil from '../../utils/saveRender.js';
import { diffTime } from '../../utils/util.js';
import { Config } from '../../utils/config.js';
import { Discover } from './discover-model.js.js';
var discover = new Discover();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    briefProducts: [], // 发现里的商品列表
    page: 1,
    hasMore: true, // 是否可以翻页
    loadingHidden: false,
    templateId: '', // 发现显示的模板类别
    userInfo: null,
    click_like_id: -1, // 是否点击点赞图标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.storeNo) {
      wx.setStorageSync('storeNo', options.storeNo);
    }
    this.data.storeNo = options.storeNo || wx.getStorageSync('storeNo');
    var userInfo = this.data.userInfo;
    if (!userInfo) {
      app.getUserSetting(res => {
        that.setData({
          userInfo: res.userInfo
        });
        this._loadData();
      });
    }
  },

  onShow() {
    var p = app.globalData.product;
    var products = this.data.briefProducts;
    var postItem = wx.getStorageSync('postItem');
    if (p) {
      products.forEach(item => {
        if (item.goodsId == p.goodsId) {
          item.bookingCount += 1;
        }
      });
      this.setData({
        briefProducts: products
      });
      app.globalData.product = {};
    }

    if (postItem) {
      let p = products.find(item => {
        return item.postId == postItem.postId;
      })
      p.likeStatus = postItem.likeStatus;
      this.setData({
        briefProducts: products
      });
      wx.removeStorageSync('postItem');
    }
  },


  _loadData() {
    var that = this;
    // 定义数据数组
    this.render = new SafeRenderUtil({
      arrName: 'briefProducts',
      setData: this.setData.bind(this)
    });
    var params = {
      data: {
        storeNo: this.data.storeNo
      }
    }
    // 判断该门店使用哪个模板
    discover.getStoreInfo(params, res => {
      if (res && res.status) {
        let templateId = res.data.storeTemplate.templateId;
        that.setData({
          templateId
        });

        that.getProductsData();
      }
    })
  },

  // 获取商品列表(今日头条模板数据)
  getProductsData() {
    var { page } = this.data, size = 5, that = this;
    discover.getBriefProducts({ data: { page, size, storeNo: that.data.storeNo }, }, (data) => {
      if (data && data.status) {
        if (page + 1 > Math.ceil(data.total / size)) {
          that.setData({
            hasMore: false
          });
        }
        let list = data.data;
        list.forEach(item => {
          item.createTime = diffTime(new Date(item.createTime), new Date());
          item.viewCount = discover.processCount(item.viewCount);

          item.postPics.forEach(i => {
            i.postPic += Config.processImage;
          })
        })

        this.render.addList(list);

      } else {
        that.setData({
          hasMore: false
        });
      }
      that.setData({
        loadingHidden: true
      });
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var { page, hasMore, briefProducts } = this.data;
    /**
     * 此处加上数据大小的判断
     */
    if (hasMore) {
      app.aldstat.sendEvent('发现模块-下一页');
      this.setData({
        hasMore: true,
        page: page + 1
      });
      this.getProductsData();
    }

  },

  showDetailPopup(e) {
    app.aldstat.sendEvent('发现页-点击商品');
    var id = discover.getDataSet(e, 'id');
    wx.navigateTo({
      url: `/pages/product/product?templateId=simple&id=${id}`
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '发现',
      path: '/pages/discover/discover?storeNo=' + that.data.storeNo
    }
  },

  onPullDownRefresh() {
    this.setData({
      page: 1,
      briefProducts: [],
      click_like_id: -1
    });
    this._loadData();
  },

  // 点击进入发现详情页
  showDetail(e) {
    var id = discover.getDataSet(e, 'id');
    var briefProducts = this.data.briefProducts;
    var item = briefProducts.find(i => {
      return i.postId == id;
    });
    if (!isNaN(item.viewCount)) {
      item.viewCount += 1;
      item.viewCount = discover.processCount(item.viewCount);
      this.setData({
        briefProducts: briefProducts
      });
    }

    wx.navigateTo({
      url: './detail/detail?id=' + id,
    });
  },

  previewImage(e) {
    var postId = discover.getDataSet(e, 'id');
    var p = this.data.briefProducts.find(item => { return item.postId == postId });
    var list = [];
    p.postPics.forEach(item => {
      list.push(item.postPic);
    })
    var src = discover.getDataSet(e, 'src');
    wx.previewImage({
      current: src,
      urls: list
    })
  },

  // 朋友圈列表点击店铺头像或者名字进入店铺
  clickStore(e) {
    var storeNo = discover.getDataSet(e, 'storeno');
    wx.redirectTo({
      url: `/pages/poster/poster?storeNo=${storeNo}`
    })
  },

  likeTapHandle(e) {
    var that = this;
    var postId = discover.getDataSet(e, 'id');
    var products = this.data.briefProducts;
    var postIndex = products.findIndex(item => { return item.postId == postId });
    products[postIndex].likeStatus = products[postIndex].likeStatus == 1 ? 0 : 1;
    var params = {
      status: products[postIndex].likeStatus,
      data: {
        storeNo: this.data.storeNo,
        postId
      }
    };
    this.setData({
      briefProducts: products,
      click_like_id: postId
    });
    discover.likeTap(params, res => {
      if (!res && !res.status) {
        products[postIndex].likeStatus = products[postIndex].likeStatus == 1 ? 0 : 1;
        that.setData({
          briefProducts: products
        });
      }
    });
  },

  makePhone(e) {
    var phone = discover.getDataSet(e, 'phone');
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  makeAppoint(e) {
    var that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo && !userInfo.gender) {
      app.getUserSetting(res => {
        that.setData({
          userInfo: res.userInfo
        });
      });
    } else {
      var postId = discover.getDataSet(e, 'id');
      var post = this.data.briefProducts.find(item => { return item.postId == postId }), products = [];
      /**
     * 过滤数组中重复的元素
     */
      products = post.postPics.filter((item, index, self) => {
        return self.findIndex(i => { return i.goodsId == item.goodsId }) === index;
      })
      wx.setStorageSync('appointProducts', products);
      app.globalData.appoint = {
        bookerName: userInfo.nickName,
        mobile: wx.getStorageSync('mobile')
      }
      wx.navigateTo({
        url: '/pages/appointment/appointment?type=multiple&storeNo=' + this.data.storeNo
      })
    }


  }

})