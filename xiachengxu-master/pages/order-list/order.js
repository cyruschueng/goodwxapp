// pages/order-list/order.js
import { Order } from './order-model.js';
import SafeRenderUtil from '../../utils/saveRender.js';
import { getDateByMill, getTimeByMill } from '../../utils/util.js';
import { Config } from '../../utils/config.js';
var app = getApp();
var order = new Order();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['预约', '已赴约/过期'],
    flag: true, // 去除抖动
    currentNavbar: 0,
    orderList: [], // 全部浏览历史记录
    expiredList: [], // 收藏的商品列表
    params: [
      {
        hasMore: true,
        page: 1,
      },
      {
        hasMore: true,
        page: 1,
      }
    ],
    loadingHidden: false,
    winHeight: '', // 内容高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      from: options.from || ''
    });
    this._loadData();
  },
  onShow: function () {
    var data = app.globalData.appoint;
    var list = this.data.orderList;
    var expiredList = this.data.expiredList;
    /*
    如果是修改的预约则修改缓存数据里的数据
    是新增预约则不更改
    */
    if (data && data.id != undefined) {
      var index = list.findIndex(item => { return item.bookingId == data.id });
      if (index != -1) {
        list[index].bookerName = data.name;
        list[index].mobile = data.phone;
        list[index].bookingDate = data.createTime;
      } else {
        var newAppoint = {
          bookingId: data.id,
          bookerName: data.name,
          bookingCount: data.bookingCount,
          mobile: data.phone,
          bookingDate: data.createTime,
          goodsId: data.goodsId,
          goodsName: data.goodsName,
          goodsPic: data.goodsPic,
          goodsPrice: data.goodsPrice
        }
        list.unshift(newAppoint);
        list.forEach(item => {
          if (item.goodsId == data.goodsId) {
            item.bookingCount = data.bookingCount;
          }
        });
      }
      this.setData({
        orderList: list
      });
    }
    if (data && data.bookingStatus != null) {
      var index = list.findIndex(item => { return item.bookingId == data.bookingId });
      var appoint = list[index];
      appoint.status = data.status;
      if (expiredList.length) {
        expiredList.splice(0, 1, appoint);
      }
      list.splice(index, 1);
      this.setData({
        orderList: list,
        expiredList: expiredList
      });
    }
    app.globalData.appoint = {};
  },
  _loadData() {
    var that = this;
    this.render0 = new SafeRenderUtil({
      arrName: 'orderList',
      setData: this.setData.bind(this)
    });
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
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
  switchTab(e) {
    var current = e.detail.current;
    this.setData({
      currentNavbar: current
    });
    // 如果当前类别没有数据则提示加载中并且从后端获取第一页数据
    if (!this.existData(current)) {
      // 获取当前数据（全部、收藏、点赞）
      this.setData({
        loadingHidden: false
      });
      var render = `render${current}`;
      this[render] = new SafeRenderUtil({
        arrName: current == 1 ? 'expiredList' : 'orderList',
        setData: this.setData.bind(this)
      });
      this.pullUpLoadData();
    }
  },
  existData(current) {
    var list = current == 0 ? 'orderList' : 'expiredList';
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
    var from = that.data.from;
    var current = that.data.currentNavbar, size = 10;
    var storeNo = wx.getStorageSync('storeNo');

    /**
     * 此处还需要通过currentNavbar 
     * 来向后端请求不同种类的数据
     */
    //todo
    var postData;
    if (from) {
      postData = {
        from: from,
        data: {
          page: params[current].page,
          size: size,
          current: current,
          storeNo
        }
      };
    } else {
      postData = {
        from: from,
        data: {
          page: params[current].page,
          size: size,
          current: current
        }
      };
    }
    order.getUserOrder(postData, data => {
      if (data.status) {
        if (params[current].page + 1 > Math.ceil(data.total / size)) {
          params[current].hasMore = false;
        }
        var d = data.data;
        d.forEach(item => {
          item.bookingDate = getDateByMill(item.bookingDate) + ' ' + getTimeByMill(item.bookingDate);
          item.goodsPic += Config.processImage;
        })
        var render = `render${current}`;
        this[render].addList(d);
      }
      that.setData({
        flag: true,
        loadingHidden: true,
        params: params
      });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '叮店'
    }
  },
  getCurrentProduct(array, key, value) {
    var result;
    array.map(item => {
      if (item[key] == value) {
        result = item;
      }
    });
    return result;
  },
  detailTap(e) {
    // 商品详情页跳转
    var id = order.getDataSet(e, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
  showDetail(e) {
    // 预约详情页
    var bookingId = order.getDataSet(e, 'id');
    var storeNo = order.getDataSet(e, 'storeno');
    var current = this.data.currentNavbar;
    var mapList = ['orderList', 'expiredList'];
    var list = this.data[mapList[current]];
    var bookingItem = list.find(item => { return item.bookingId == bookingId });
    app.globalData.appoint = bookingItem;
    var url = this.data.from ? '../appointment/appointment?from=' + this.data.from + '&id=' + bookingId : '../appointment/appointment?id=' + bookingId + '&storeNo=' + storeNo;
    wx.navigateTo({
      url: url
    })
  },
  goHome() {
    app.aldstat.sendEvent('预约列表-逛一逛');
    wx.switchTab({
      url: '../home/home',
    })
  },
  /**
   * 小程序管理端赴约操作
   */
  appointOperation(e) {
    var that = this;
    var bookingStatus = parseInt(order.getDataSet(e, 'status'));
    var content = bookingStatus == 3 ? '确认此用户未赴约' : '确认此用户已赴约';
    this.showConfirm(content, true, res => {
      if (res.confirm) {
        var bookingId = order.getDataSet(e, 'id');
        var postData = {
          data: {
            bookingId,
            bookingStatus
          }
        }
        order.appointOperate(postData, res => {
          if (res.status) {
            var list = that.data.orderList;
            var expiredList = that.data.expiredList;
            var index = list.findIndex(item => { return item.bookingId == bookingId });
            var booker = list[index];
            booker.status = bookingStatus;
            if (expiredList.length)
              expiredList.unshift(booker);
            list.splice(index, 1);
            that.setData({
              orderList: list,
              expiredList: expiredList
            });
          }
        })
      }
    });
  },
  /**
   * 弹出确认用户操作
   */
  showConfirm(content, isShowCancel, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      confirmColor: '#1196ee',
      showCancel: isShowCancel,
      success: res => {
        callback && callback(res);
      }
    })
  },
  /**
   * 弹出提示信息
   */
  showTips: function (title) {
    wx.showToast({
      title: title,
      duration: 1000,
      icon: 'success'
    })
  },
})