import Api from '../../../utils/config/config.js';
import { GLOBAL_API_DOMAIN } from '../../../utils/config/config.js';
var app = getApp();
Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    posts_key: [],
    page: 1,
    reFresh: true
  },
  onLoad: function (options) {
    
  },
  onShow: function() {
    this.getShareList();
  },
  onHide: function() {
    this.setData({
      posts_key: [],
      page: 1,
      reFresh: true
    })
  },
  getShareList: function() {
    let that = this;
    wx.request({
      url: that.data._build_url + 'fvs/list?userId=' + app.globalData.userInfo.userId + '&page=' + that.data.page + '&rows=10',
      success: function(res) {
        let data = res.data;
        if (data.code == 0 && data.data.list != null && data.data.list != "" && data.data.list != []) {
          let posts_key = that.data.posts_key;
          for (let i = 0; i < data.data.list.length; i++) {
            posts_key.push(data.data.list[i]);
          }
          that.setData({
            posts_key: posts_key,
            reFresh: true
          });
        } else {
          that.setData({
            reFresh: false
          });
        }
        if (that.data.page == 1) {
          wx.stopPullDownRefresh();
        } else {
          wx.hideLoading();
        }
      }
    });
  },
  enshrineXim:function(event){
    wx.navigateTo({
      url: '../../index/merchant-particulars/merchant-particulars?shopid=' + event.currentTarget.id,
    })
  },
  //用户上拉触底
  onReachBottom: function () {
    if (this.data.reFresh) {
      wx.showLoading({
        title: '加载中..'
      })
      this.setData({
        page: this.data.page + 1
      });
      this.getShareList();
    }
  },
  //用户下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      posts_key: [],
      page: 1,
      reFresh: true
    });
    this.getShareList();
  }
})