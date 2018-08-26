//index.js
//获取应用实例
import qiniuUploader from '../../common/js/qiniuUploader.js';
var app = getApp();
import { Config } from '../../../utils/config.js';
Page({
  data: {
    tempFilePaths: '',
    files: [],
    showView: true,
    swiper: false,
    lise: [{
      count: '价格'
    }],
    showModalStatus: false,
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    circular: true,
    showView: true,
    discountChecked: false,
    recommendtChecked: false,
    discount: false,
    goodsPrice: 0,
    discountPrice: 0
  },
  onLoad: function () {
    var that = this;
    this.setData({
      goodsUrl: wx.getStorageSync('goodsUrl')
    });
  },
  onShow: function (options) {
    var that = this;
    wx.getStorage({
      key: "files",
      success: function (res) {
        if (res.data != undefined) {
          if (res.data.length > 0) {
            that.setData({
              files: res.data,
              showView: false,
              swiper: true
            })
          } else {
            that.setData({
              showView: true,
              swiper: false
            })
          }
        }
      }
    })
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  chooseimage: function () {
    // var _this = this;
    // wx.chooseImage({
    //   count: 9, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     _this.setData({
    //       tempFilePaths: res.tempFilePaths
    //     })
    //   }
    // })
    wx.navigateTo({
      url: './drag/drag',
    })
  },
  detailsClick: function () {
    wx.navigateTo({
      url: '/pages/shopping/branch1/details/details',
    })
  },
  dragclick: function () {
    wx.navigateTo({
      url: '/pages/shopping/branch1/drag/drag',
    })
  },
  onUnload() {
    var files = wx.getStorageSync('files');
    if (files.length) {
      wx.showModal({
        title: '完成编辑',
        content: '选择确认添加列表',
        cancelText: '确认',
        confirmText: '继续',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: './branch1/branch1',
            })
          } else {
            wx.removeStorage({
              key: 'files',
              success: function (res) {
                console.log(res.data)
              }
            })
          }
        }
      })
    }
  },
  //折扣
  discountChange: function (e) {
    var self = this;
    var value = e.detail.value;
    this.setData({
      discount: value
    });
  },
  enterPrice(e) {
    var goodsPrice = e.detail.value;
    this.setData({
      goodsPrice
    });
  },
  calculateDiscountPrice(e) {
    var discount = e.detail.value;
    var discountPrice = this.data.goodsPrice * discount * 0.1;
    this.setData({
      discountPrice
    });
  },
  //推荐
  recommendChange: function () {
    var self = this;
    this.setData({ recommendPrice: !self.data.recommendPrice })
    console.log(self.data.recommendPrice)
  },

  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表单所有input的值
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    var storeNo = wx.getStorageSync('storeNo');
    if (e.detail.value.goodsName == "" || e.detail.value.money == "") {
      wx.showModal({
        title: '商品描述或者价格不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      var imgUrles = that.data.files;
      var goodsUrl = wx.getStorageSync('goodsUrl');
      goodsUrl.map((item, index) => {
        return goodsUrl[index] = 'http://' + item;
      })
      var qw = goodsUrl.join(",");
      wx.request({
        url: 'https://dingdian.parllay.cn/wxserver/goods/addGoodsBysSalesclerk',
        method: 'POST',
        data: {
          "data": {
            "wxUid": wxUid,
            "wxSid": wxSid,
            "goodsName": e.detail.value.goodsName,
            "goodsUrl": qw,
            "goodsDesc": qw,
            "goodsPrice": e.detail.value.goodsPrice,
            "discountPrice": e.detail.value.discountPrice,
            "discountRate": e.detail.value.discountRate,
            storeNo: wx.getStorageSync('storeNo')
          }
        },
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res);
          wx.removeStorageSync('files');
          wx.navigateBack();
        }
      })
    }
  }
})