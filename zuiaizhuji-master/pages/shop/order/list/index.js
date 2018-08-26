const _function = require('../../../../utils/functionData.js');
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
const app = getApp()
Page({
  data: {
    postlist: [],
    this_weiba_id: 0,
    hasMore: false,
    showLoading: false,
    isScrollY: true,
    this_page: 1,//当前页码
    pagesize: 10,//每页数量
    this_nav_name: 'index',
    this_is_jinghua: 0,
    this_finish_page: 0,
    glo_is_load: true,
    group_val: 'all',
    version:'2.2.1'
  },
  //订单详情
  user_orderinfo_bind: function (e) {
    var oid = e.currentTarget.id;
    wx.navigateTo({
      url: '../info/index?oid=' + oid
    })
  },
  group_show: function (e) {
    var that = this
    that.setData({
      group_val: e.target.dataset.val,
      this_page: 1
    })
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getUserOrderList.html',
      { pagesize: that.data.this_page, pagenum: that.data.group_val, version: that.data.version },
      (data) => {
        that.initUserOrderListData(data)
      }, this, { isShowLoading: false });
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  //删除订单
  delete_user_order: function (e) {
    var that = this
    var oid = e.currentTarget.id;
    wx.showModal({
      title: '提示',
      content: "确认要删除该订单吗?",
      success: function (res) {
        if (res.confirm == true) {
          requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/deleteUserOrder.html',
            { oid: oid },
            (data) => {
              that.initdeleteOrderInfoData(data)
            }, this, { isShowLoading: false });
        }
      }
    })
  },
  initdeleteOrderInfoData: function (data) {
    var that = this
    that.setData({
      this_page: 1
    })
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getUserOrderList.html',
      { pagesize: that.data.this_page, pagenum: that.data.group_val, version: that.data.version },
      (data) => {
        that.initUserOrderListData(data)
      }, this, { isShowLoading: false });
  },
  onShow: function () {
    var that = this
    that.setData({
      this_page: 1
    })
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getUserOrderList.html',
      { pagesize: that.data.this_page, pagenum: that.data.group_val, version: that.data.version },
      (data) => {
        that.initUserOrderListData(data)
      }, this, { isShowLoading: false });
  },
  initUserOrderListData: function (data) {
    var that = this
    that.setData({
      postlist: data,
      glo_is_load: false
    })
    if (data == null) {
      that.setData({
        isScrollY: false,
        showLoading: false
      })
    } else {
      if (data.length >= that.data.pagesize) {
        that.setData({
          isScrollY: true,
          showLoading: true
        })
      } else {
        that.setData({
          isScrollY: false,
          showLoading: false
        })
      }
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      this_page: 1
    })
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getUserOrderList.html',
      { pagesize: that.data.this_page, pagenum: that.data.group_val, version: that.data.version },
      (data) => {
        that.initUserOrderListData(data)
      }, this, { isShowLoading: false });
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  //滚动加载
  indexscrolltolower: function () {
    var that = this
    var this_target = this.data.this_items
    if (that.data.this_finish_page != that.data.this_page) {
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getUserOrderList.html',
        { pagesize: that.data.this_page + 1, pagenum: that.data.group_val, version: that.data.version },
        (data) => {
          that.initUserOrderListLoadData(data)
        }, this, { isShowLoading: false });
    }
  },
  initUserOrderListLoadData: function (data) {
    var that = this
    if (data == null) {
      that.setData({
        isScrollY: false,
        showLoading: false
      })
    } else {
      if (data.length >= that.data.pagesize) {
        that.setData({
          isScrollY: true,
          showLoading: true
        })
      } else {
        that.setData({
          isScrollY: false,
          showLoading: false
        })
      }
      that.setData({
        postlist: that.data.postlist.concat(data),
        this_page: that.data.this_page + 1
      })
    }
    that.setData({
      this_finish_page: that.this_finish_page + 1
    })
  },
  onReachBottom: function (e) {
    var that = this
    var this_target = this.data.this_items
    if (that.data.this_finish_page != that.data.this_page) {
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getUserOrderList.html',
        { pagesize: that.data.this_page + 1, pagenum: that.data.group_val, version: that.data.version },
        (data) => {
          that.initUserOrderListLoadData(data)
        }, this, { isShowLoading: false });
    }
  }
})