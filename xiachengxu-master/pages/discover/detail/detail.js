import { Discover } from '../discover-model.js.js';
import { Config } from '../../../utils/config.js';
import { diffTime } from '../../../utils/util.js';


var discover = new Discover();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    userInfo: null, // 用户信息
    detail: {}, // 详情信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.id = options.id;
    if (options.storeNo) {
      wx.setStorageSync('storeNo', options.storeNo);
    }
    this.data.storeNo = options.storeNo || wx.getStorageSync('storeNo');
    var userInfo = this.data.userInfo;
    app.getUserSetting(data => {
      that.setData({
        userInfo: data.userInfo
      });
      that._loadData();
    })
  },

  _loadData() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    var params = {
      data: {
        postId: parseInt(this.data.id)
      }
    };
    discover.getDetail(params, res => {
      if (res.status) {
        let detail = res.data;
        detail.postPics.forEach(item => {
          item.postPic += Config.processImage;
        });
        detail.createTime = diffTime(new Date(detail.createTime), new Date());
        detail.viewCount = discover.processCount(detail.viewCount);
        that.setData({
          detail
        });
      } else {
        wx.showModal({
          content: '获取详情错误，请稍后再试',
          showCancel: false,
          success: d => {
            if (d.confirm) {
              wx.navigateBack({

              })
            }
          }
        })
      }
      that.setData({
        loadingHidden: true
      });
      wx.hideLoading();
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '叮店严选',
      path: `/pages/discover/detail/detail?id=${this.data.id}&streNo=${this.data.storeNo}`,
      imageUrl: this.data.detail.postPics[0].postPic
    }
  },

  tapProductHandle(e) {
    var goodsId = discover.getDataSet(e, 'id');
    var storeNo = this.data.storeNo;
    wx.navigateTo({
      url: `/pages/product/product?id=${goodsId}&storeNo=${storeNo}&templateId=default`,
    })
  },

  clickStoreHandle(e) {
    var storeNo = discover.getDataSet(e, 'storeno');
    wx.redirectTo({
      url: `/pages/poster/poster?storeNo=${storeNo}`
    })
  },

  redirectHome(e) {
    var storeNo = discover.getDataSet(e, 'storeno');
    wx.setStorageSync('storeNo', storeNo);
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  makePhone(e) {
    var phone = discover.getDataSet(e, 'phone');
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  // 预约商品
  appointProducts(e) {
    var that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo && !userInfo.gender) {
      app.getUserSetting(res => {
        that.setData({
          userInfo
        });
      });
    } else {
      var detail = this.data.detail;
      let products = detail.postPics.filter((item, index, self) => {
        return self.findIndex(i => { return i.goodsId == item.goodsId }) === index;
      });
      wx.setStorageSync('appointProducts', products);
      app.globalData.appoint = {
        bookerName: userInfo.nickName,
        mobile: wx.getStorageSync('mobile')
      }
      wx.navigateTo({
        url: '/pages/appointment/appointment?type=multiple&storeNo=' + this.data.storeNo
      })
    }
  },

  likeTapHandle(e) {
    var postId = discover.getDataSet(e, 'id');
    var detail = this.data.detail;
    detail.likeCount = detail.likeStatus ? detail.likeCount - 1 : detail.likeCount + 1;
    detail.likeStatus = detail.likeStatus ? 0 : 1;
    this.setData({
      detail
    });
    var params = {
      status: detail.likeStatus,
      data: {
        storeNo: this.data.storeNo,
        postId
      }
    };
    discover.likeTap(params, res => {
      if (!res && !res.status) {
        detail.likeStatus = detail.likeStatus ? 0 : 1;
        that.setData({
          detail
        });
      } else {
        // 此处的操作是点赞后返回之前的页面修改列表数据
        wx.setStorageSync('postItem', { postId, likeStatus: detail.likeStatus });
      }
    });

  }

})