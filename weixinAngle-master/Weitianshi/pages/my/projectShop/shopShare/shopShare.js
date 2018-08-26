// pages/my/projectShop/shopShare/shopShare.js
let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../../utils/model/shareModel';
Page({
  data:{
    nonet: true
  },
  onLoad: function (options) {
    let that = this;
    let user_id = options.user_id;
    let share_id = wx.getStorageSync('user_id');
    this.setData({
      user_id: user_id,
      share_id: share_id
    });
    app.netWorkChange(that);
  },
  onShow: function () {
    let user_id = this.data.user_id;
    let  share_id = this.data.share_id;
    let  that = this;
    this.getUserInfo();
    wx.request({
      url: url + '/api/wx/getCardQr',
      data: {
        'user_id': user_id,
        'path': '/pages/my/projectShop/projectShop/projectShop?followed_user_id=' + user_id + "&&share_id=" + share_id,
        'width': 430,
        "type" : 2
      },
      method: 'POST',
      success: function (res) {
        let net = res.data;
        let access_token = net.qrcode;
        that.setData({
          access_token: access_token
        });
        let filPath = wx.setStorageSync('access_token', access_token);
      },
      fail: function (res) {
      }
    });
  },
  //保存小程序码
  savePic: function () {
    let that=this;
    let filePath = wx.getStorageSync('access_token');
    wx.getImageInfo({
      src: filePath,
      success: function (res) {
        let picPath = res.path;
        wx.getSetting({
          success(res) {
            if (!res['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  wx.saveImageToPhotosAlbum({
                    filePath: picPath,
                    success: function (res) {
                      wx.showToast({
                        title: '保存图片成功',
                        icon: 'success'
                      });
                    },
                    fail: function (res) {
                      app.log(that,"filePath",filePath);
                    }
                  });
                }
              });
            }
          }
        });
      },
    });
  },

  //分享页面
  onShareAppMessage: function () {
    let that = this;
    return ShareModel.projectShopShare(that);
  },
  //取消分享
  cancelShare: function () {
    this.setData({
      modal: 0
    });
  },
  //获取用户详情 
  getUserInfo() {
    let that = this;
    wx.request({
      url: url_common + '/api/user/getUserBasicInfo',
      data: {
        user_id: this.data.user_id
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        let userInfo = res.data.user_info;
        let user_name = userInfo.user_real_name;
        let shop_name = userInfo.shop_name;
        if (userInfo.user_intro) {
          let user_intro = userInfo.user_intro;
          if (user_intro.length >= 55) {
            that.setData({
              contentMore: true
            });
          }
        }
        that.setData({
          userInfo: userInfo
        });
        if (!shop_name) {
          wx.setNavigationBarTitle({
            title: user_name + '的店铺的二维码'
          });
        } else {
          wx.setNavigationBarTitle({
            title: shop_name + '的二维码'
          });
        }
      }
    });
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }

});