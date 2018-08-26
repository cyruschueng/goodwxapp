var utiles = require('../../utils/util.js');
import { Config } from '../../utils/config.js';
var app = getApp();
console.log(app.goodsName);
// 当前页数
var pageNum = 1;
// 每页个数
var pageSize = 5;
Page({
  data: {
    currentTab: 0,
    list: [],
    wxUid: wx.getStorageSync('wxUid'),
    showModalStatus: false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 2000,
    circular: true,
  },
  /*加载页面，触发onLoad方法开始*/
  onLoad: function () {
    var self = this;
    var storeNo = wx.getStorageSync('storeNo');
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    //获取商品列表请求
    wx.request({
      url: Config.restUrl + "/wxserver/goods/selectGoodsListBysSalesclerk",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        "data": {
          "wxUid": wxUid,
          "wxSid": wxSid,
          "page": 1,
          "size": 30,
          "condition": "1",
          "orderby": "1",
          storeNo
        }
      },
      success: function (res) {
        self.setData({
          list: res.data.data,
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          storeNo
        });
      }
    });
  },
  onShow: function () {
    var self = this;
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    //获取商品列表请求
    wx.request({
      url: Config.restUrl + "/wxserver/goods/selectGoodsListBysSalesclerk",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        "data": {
          "wxUid": wxUid,
          "wxSid": wxSid,
          "page": 1,
          "size": 30,
          "condition": "1",
          "orderby": "1",
          storeNo: self.data.storeNo
        }
      },
      success: function (res) {
        self.setData({
          list: res.data.data,
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
    });
  },
  /*加载页面，触发onLoad方法结束*/
  modifyHandle: function (e) {
    wx.navigateTo({
      url: `modify/modify?id=${e.currentTarget.id}`
    })
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  time: function (e) {
    var that = this;
    wx.request({
      url: Config.restUrl + "/wxserver/goods/selectGoodsListBysSalesclerk",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        "data": {
          "wxUid": "25714b2d-40c8-4d86-b8e8-c0954dc75982",
          "wxSid": "wxSid",
          "page": 1,
          "size": 30,
          "condition": "1",
          "orderby": "1",
          storeNo: self.data.storeNo
        }
      },
      success: function (res) {
        that.setData({
          list: res.data.data,
          currentTab: e.currentTarget.dataset.current
        })
      }
    })
  },
  acura: function (e) {

    var that = this;
    wx.request({
      url: Config.restUrl + "/wxserver/goods/selectGoodsListBysSalesclerk",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        "data": {
          "wxUid": "25714b2d-40c8-4d86-b8e8-c0954dc75982",
          "wxSid": "wxSid",
          "page": 1,
          "size": 30,
          "condition": "2",
          "orderby": "1",
          storeNo: self.data.storeNo
        }
      },
      success: function (res) {
        that.setData({
          list: res.data.data,
          expertList: res.data.data,
          currentTab: e.currentTarget.dataset.current
        })
      }
    })
  },
  transactions: function (e) {
    var that = this;
    wx.request({
      url: Config.restUrl + "/wxserver/goods/selectGoodsListBysSalesclerk",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        "data": {
          "wxUid": "25714b2d-40c8-4d86-b8e8-c0954dc75982",
          "wxSid": "wxSid",
          "page": 1,
          "size": 30,
          "condition": "3",
          "orderby": "1",
          storeNo: self.data.storeNo
        }
      },
      success: function (res) {
        that.setData({
          list: res.data.data,
          currentTab: e.currentTarget.dataset.current
        })
      }
    })
  },
  supply: function (e) {
    var that = this;
    wx.request({
      url: Config.restUrl + "/wxserver/goods/selectGoodsListBysSalesclerk",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        "data": {
          "wxUid": "25714b2d-40c8-4d86-b8e8-c0954dc75982",
          "wxSid": "wxSid",
          "page": 1,
          "size": 30,
          "condition": "4",
          "orderby": "1",
          storeNo: self.data.storeNo
        }
      },
      success: function (res) {
        that.setData({
          list: res.data.data,
          currentTab: e.currentTarget.dataset.current
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
  },
  additionclick: function () {
    wx.navigateTo({
      url: '/pages/shopping/branch1/branch1?id=1',
    })
  },
  productclick: function (e) {
    var goodsId = e.currentTarget.dataset.id;
    console.info(goodsId);
    wx.navigateTo({
      url: '/pages/product/product?id=' + goodsId + "&from=manage"
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})