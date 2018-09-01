import Api from '../../../utils/config/api.js';
var app = getApp();
Page({
  data: {
    order_list: [],
    page: 1,
    reFresh: true,
    completed: true,
    currentTab: ''
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getOrderList();
  },
  onHide: function () {
    this.setData({
      order_list: [],
      page: 1,
      reFresh: true,
      completed: true,
      currentTab: ''
    })
  },
  swichNav: function (event) {
    this.setData({
      order_list: [],
      page: 1,
      reFresh: true,
      completed: true,
      currentTab: event.currentTarget.dataset.current
    })
    this.getOrderList();
  },
  getOrderList: function () {       //获取订单列表
    let that = this;
    let _parms = {
      userId: app.globalData.userInfo.userId,
      page: this.data.page,
      rows: 8,
      soStatus: this.data.currentTab
    };
    Api.somyorder(_parms).then((res) => {
      let data = res.data;
      if (data.code == 0 && data.data != null && data.data != "" && data.data != []) {
        let order_list = that.data.order_list;
        for (let i = 0; i < data.data.length; i++) {
          order_list.push(data.data[i]);
        }
        that.setData({
          order_list: order_list,
          reFresh: true
        });
      } else {
        that.setData({
          reFresh: false
        });
      }
    });
    if (this.data.currentTab == 2) {
      let _parms = {
        userId: app.globalData.userInfo.userId,
        page: this.data.page,
        rows: 5,
        soStatus: 3
      };
      Api.somyorder(_parms).then((res) => {
        let data = res.data;
        wx.hideLoading();
        if (data.code == 0 && data.data != null && data.data != "" && data.data != []) {
          let order_list = that.data.order_list;
          for (let i = 0; i < data.data.length; i++) {
            order_list.push(data.data[i]);
          }
          that.setData({
            order_list: order_list,
            completed: true
          });
        } else {
          that.setData({
            completed: false
          });
        }
      });
    }
    if (that.data.page == 1) {
      wx.stopPullDownRefresh();
    } else {
      wx.hideLoading();
    }
  },
  lowerLevel: function (e) {
    let id = e.currentTarget.id,
      skuid = e.currentTarget.dataset.skuid,
      sostatus = e.currentTarget.dataset.sostatus,
      listArr = this.data.order_list,
      sell = "", inp = "", rule = "", num = "", soId = "";
    if (sostatus == 1) {
      for (let i = 0; i < listArr.length; i++) {
        if (id == listArr[i].id) {
          sell = listArr[i].unitPrice;
          rule = listArr[i].ruleDesc;
          inp = parseInt(listArr[i].skuName);
          num = listArr[i].skuNum;
          soId = listArr[i].soId;
        }
      }
      wx.navigateTo({
        // url: '/pages/index/voucher-details/voucher-details'
        url: '/pages/index/voucher-details/voucher-details?id=' + id + '&soid=' + soId+ '&sell=' + sell + '&inp=' + inp + '&rule=' + rule + '&num=' + num + '&sostatus=1'
      })
    } else if (sostatus == 2 || sostatus == 3) {
      wx.navigateTo({
        url: '../lelectronic-coupons/lectronic-coupons?id=' + id
      })
    }
  },
  //用户上拉触底
  onReachBottom: function () {
    if (this.data.currentTab != 2 && this.data.reFresh) {
      wx.showLoading({
        title: '加载中..'
      })
      this.setData({
        page: this.data.page + 1
      });
      this.getOrderList();
    }
    if (this.data.currentTab == 2 && (this.data.reFresh || this.data.completed)) {
      wx.showLoading({
        title: '加载中..'
      })
      this.setData({
        page: this.data.page + 1
      });
      this.getOrderList();
    }
  },
  //用户下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      order_list: [],
      page: 1,
      reFresh: true,
    });
    this.getOrderList();
  }
})