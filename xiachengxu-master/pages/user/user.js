// pages/user/user.js
import { Base } from '../../utils/base.js';
import { User } from './user-model.js';
import { Config } from '../../utils/config.js';
import SafeRenderUtil from '../../utils/saveRender.js';
var app = getApp();
var base = new Base();
var user = new User();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    options: [
      {
        type: 'order',
        name: '预约列表',
        icon: '/images/icon/list.png'
      },
      {
        type: 'foot',
        name: '我的足迹',
        icon: '/images/icon/foot.png'
      },
      // {
      //   type: 'wallet',
      //   name: '我的钱包',
      //   icon: '/images/icon/card.png'
      // },
      // {
      //   type: 'settings',
      //   name: '设置',
      //   icon: '/images/icon/setting.png'
      // },
      {
        type: 'about',
        name: '关于',
        icon: '/images/icon/about.png'
      }
    ],
    info: {}, // 信息完整度
    storeList: [], // 关注的店铺列表
    guideList: [], // 专属导购
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  onShow() {
    var that = this;
    var { info } = this.data;
    var params = {
      data: {}
    };
    user.getUserInfo(params, res => {
      that.setData({
        info: res.data
      });
    })
    // 重新获取关注的门店列表
    this.getAttentionStores();

  },
  _loadData() {
    var that = this, userInfo = app.globalData.userInfo;
    var options = this.data.options;
    if (userInfo && userInfo.gender) {
      if (userInfo.roleId && userInfo.roleId != '0') {
        // 普通顾客
        options.push({
          type: 'console',
          name: '控制台',
          icon: '/images/icon/console.png'
        });
      }
      this.setData({
        options: options,
        userInfo: userInfo,
        loadingHidden: true
      });
      this.getData();
    } else {
      app.getUserSetting(res => {
        if (res.userInfo.roleId && res.userInfo.roleId != '0') {
          options.push({
            type: 'console',
            name: '控制台',
            icon: '/images/icon/console.png'
          });
        }
        that.setData({
          options: options,
          userInfo: res.userInfo,
          loadingHidden: true
        });
        this.getData();
      });
    }

  },

  getData() {
    this.getAttentionStores();
    this.getMyGuides();
  },
  getAttentionStores() {
    var that = this;
    var params = {
      data: {
        page: 1,
        size: 2
      }
    };
    user.getAttentionStores(params, res => {
      if (res && res.status) {
        that.setData({
          storeList: res.data
        });
      }
    })
  },

  getMyGuides() {
    var that = this;
    var params = {
      data: {
        page: 1,
        size: 2
      }
    };
    user.getMyGuides(params, res => {
      if (res && res.status) {
        that.setData({
          guideList: res.data
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  enter(e) {
    base.dealFormIds(e.detail.formId);
    // 如果未授权则再次要求授权
    if (this.data.userInfo.gender) {
      var type = e.currentTarget.dataset.type;
      var mapList = {
        order: '../order-list/order',
        foot: '../foot/foot',
        about: '../about/about',
        console: '../news/news',
        wallet: '../wallet/wallet',
        settings: '../settings/settings'
      };
      var nameList = ['预约列表', '', '我的足迹', '关于', '控制台'];
      app.aldstat.sendEvent(nameList[type]);
      var url = mapList[type];
      wx.navigateTo({
        url: url,
      })
    } else {
      this._loadData();
    }
  },
  showUserInfo() {
    app.aldstat.sendEvent('个人中心-信息完善度');
    wx.navigateTo({
      url: '../information/index/index',
    });
  },
  selectStore(e) {
    var storeNo = user.getDataSet(e, 'id');
    wx.setStorageSync('storeNo', storeNo);
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
})