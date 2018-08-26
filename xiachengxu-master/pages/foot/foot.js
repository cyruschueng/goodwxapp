// pages/foot/foot.js
import { Foot } from './foot-model.js';
import SafeRenderUtil from '../../utils/saveRender.js';
import { Config } from '../../utils/config.js';
var foot = new Foot();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '收藏', '点赞'],
    flag: true, // 去除抖动
    currentNavbar: 0,
    allList: [], // 全部浏览历史记录
    collectList: [], // 收藏的商品列表
    praiseList: [], // 点赞的商品列表
    params: [
      {
        hasMore: true,
        page: 1,
      },
      {
        hasMore: true,
        page: 1,
      },
      {
        hasMore: true,
        page: 1,
      }
    ],
    winHeight: '', // 内容高度
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  onShow() {
    var product = app.globalData.product;
    var result = {};
    if (Object.keys(product).length) {
      /**
       * 如果点击了收藏返回足迹
       * 则删除一条收藏数据
       */
      if (product.isFavorite != undefined && product.isFavorite == 0) {
        var data = this.data.collectList;
        var index = this.getCurrentProduct(data, 'goodsId', product.goodsId);
        data.splice(index, 1);
        result.collectList = data;
      }
      if (product && product.isLike != undefined && product.isLike == 0) {
        var data = this.data.praiseList;
        var index = this.getCurrentProduct(data, 'goodsId', product.goodsId);
        data.splice(index, 1);
        result.praiseList = data;
      }
      if (product && product.appoint) {
        var current = this.data.currentNavbar;
        var mapList = ['allList', 'collectList', 'praiseList'];
        var allList = this.data.allList,
          collectList = this.data.collectList,
          praiseList = this.data.praiseList;
        allList.forEach(item => {
          if (item.goodsId == product.goodsId) {
            item.bookingStatus = 1;
          }
        });
        collectList.length > 0 && collectList.forEach(item => {
          if (item.goodsId == product.goodsId) {
            item.bookingStatus = 1;
          }
        })
        praiseList.length > 0 && praiseList.forEach(item => {
          if (item.goodsId == product.goodsId) {
            item.bookingStatus = 1;
          }
        })
        result = {
          allList,
          collectList,
          praiseList
        }
      }
      app.globalData.product = {};
      this.setData(result);
    }

  },
  getCurrentProduct(arr, param, value) {
    var resultIndex = -1;
    arr.length && arr.forEach((item, index) => {
      if (item[param] == value)
        resultIndex = index;
    });
    return resultIndex;
  },
  _loadData() {
    var that = this;
    var current = this.data.currentNavbar;
    // // 默认是所有浏览历史记录列表数据
    this.render0 = new SafeRenderUtil({
      arrName: 'allList',
      setData: this.setData.bind(this)
    });
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
    this.pullUpLoadData();
  },
  /**
   * 切换顶部tabbar
   */
  switchNav(e) {
    var index = e.currentTarget.dataset.idx;
    if (index == this.data.currentNavbar) return false;
    /**
     * 这里更新currentNavbar 是为了让swiper 组件进行变换
     * 然后自动调用switchTab 方法
     */
    this.setData({
      currentNavbar: index
    })

  },
  /**
   * 左右滑动
   */
  // switchTab(e) {
  //   var current = e.detail.current;
  //   this.setData({
  //     currentNavbar: current
  //   });
  //   var nameList = this.data.navbar;
  //   app.aldstat.sendEvent('足迹' + nameList[current]);
  //   // 如果当前类别没有数据则提示加载中并且从后端获取第一页数据
  //   if (!this.existData(current)) {
  //     // 获取当前数据（全部、收藏、点赞）
  //     this.setData({
  //       loadingHidden: false
  //     });
  //     var render = `render${current}`;
  //     this[render] = new SafeRenderUtil({
  //       arrName: current == 1 ? 'collectList' : 'praiseList',
  //       setData: this.setData.bind(this)
  //     });
  //     this.pullUpLoadData();
  //   }
  // },
  existData(current) {
    var list = current == 0 ? 'allList' : current == 1 ? 'collectList' : 'praiseList';
    if (this.data[list].length)
      // 如果当前分类存在数据
      return true;
    else
      return false;
  },
  /**
   * 获取下一页更多数据
   */
  loadMoreData(e) {
    var index = this.data.currentNavbar;
    var params = this.data.params;
    var data = params[index], flag = this.data.flag;
    // console.log(flag);
    /**
     * 通过 flag 变量让加载下一页只执行一次
     */
    if (data.hasMore && flag) {
      data.page = data.page + 1;
      this.setData({
        params: params,
        flag: false
      });
      this.pullUpLoadData();
    }
  },
  // 获取全部、收藏、点赞的数据
  pullUpLoadData() {
    var that = this;
    var params = that.data.params;
    var current = that.data.currentNavbar, size = 10;
    /**
     * 此处还需要通过currentNavbar 
     * 来向后端请求不同种类的数据
     */
    //todo
    var postData = {
      data: {
        page: params[current].page,
        size: size,
        current: current
      }
    };
    foot.getUserViewHistory(postData, data => {
      if (data.status) {
        if (params[current].page + 1 > Math.ceil(data.total / size)) {
          params[current].hasMore = false;
        }
        var render = `render${current}`;
        let list = data.data;
        list.forEach(item => {
          item.goodsPic += Config.processImage;
        });
        this[render].addList(list);
      }
      that.setData({
        flag: true,
        loadingHidden: true,
        params: params
      });
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '叮店'
    }
  },
  detailTap(e) {
    var id = foot.getDataSet(e, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    });
  },
  goHome() {
    app.aldstat.sendEvent('我的足迹-逛一逛');
    wx.switchTab({
      url: '../home/home',
    })
  },
  makeAppoint(e) {
    var id = foot.getDataSet(e, 'id');
    var mapList = ['allList', 'collectList', 'praiseList'];
    var current = this.data.currentNavbar;
    var list = this.data[mapList[current]];
    var product = list.find(item => {
      return item.goodsId == id; 
    });
    var userInfo = app.globalData.userInfo;
    var mobile = wx.getStorageSync('mobile');
    app.globalData.appoint = { ...product, bookerName: userInfo.nickName, mobile };
    wx.navigateTo({
      url: '../appointment/appointment',
    })
  }
})