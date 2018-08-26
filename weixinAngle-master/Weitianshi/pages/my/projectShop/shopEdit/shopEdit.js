var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;

Page({
  data: {
    nonet: true
  },
  onLoad: function (options) {
    let that = this;
    let user_id = options.user_id;
    this.setData({
      user_id: user_id
    });
    app.netWorkChange(that);
  },
  onShow: function () {
    let user_id = this.data.user_id;
    let that = this;
    //返回上一页时启动onShow;
    let pages = getCurrentPages();
    let pre = pages[pages.length - 2];
    pre.data.firstTime = false;
    wx.request({
      url: url_common + '/api/user/getUserBasicInfo',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        let userInfo = res.data.user_info;
        that.setData({
          userInfo: userInfo
        });
      }
    });
  },
  //上传图片
  upLoadPic: function () {
    let that = this;
    let user_id = this.data.user_id;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        let avatar = tempFilePaths[0];
        let size = res.tempFiles[0].size;
        if (size <= 2097152) {
          wx.showLoading({
            title: '上传中',
            mask: true,
          });
          wx.uploadFile({
            url: url_common + '/api/user/uploadImage', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              user_id: user_id,
            },
            success: function (res) {
              if (res.statusCode == 200) {
                wx.hideLoading();
                let data = JSON.parse(res.data);
                let image_id = data.image_id;
                that.setData({
                  image_id: image_id
                });
              }
              that.setData({
                filePath: tempFilePaths
              });
            }
          });
        } else {
          app.errorHide(that, "上传图片不能超过2M", 1500);
        }
      }
    });
  },
  //店铺名称
  shopNameEdit: function (e) {
    let shop_name = e.detail.value;
    let that = this;
    that.setData({
      shop_name: shop_name
    });
  },
  //店铺描述
  shopDescrible: function (e) {
    let user_intro = e.detail.value;
    let that = this;
    that.setData({
      user_intro: user_intro
    });
  },
  //保存
  save: function () {
    let that=this;
    let user_id = wx.getStorageSync('user_id');
    let shop_name = this.data.shop_name;
    let shop_banner = this.data.image_id;
    let user_intro = this.data.user_intro;
    let pages = getCurrentPages();
    let pre = pages[pages.length - 2];
    wx.request({
      url: url_common + '/api/user/updateUser',
      data: {
        user_id: user_id,
        shop_name: shop_name,
        shop_banner: shop_banner,
        user_intro: user_intro
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == 2000000) {
          wx.navigateBack({
            delta: 1
          });
        } else {
          app.errorHide(that, res.data.status_code, 1500);
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