//index.js
//获取应用实例
import qiniuUploader from '../../common/js/qiniuUploader.js';
import { Config } from '../../../utils/config.js';
import { Base } from '../../../utils/base.js';
var base = new Base();
var app = getApp()
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
    hidden: true,
    nocancel: false,
    goodsName: '',
    goodsPrice: 0
  },
  onShow: function (options) {
    var self = this;
    wx.getStorage({
      key: "files",
      success: function (res) {
        if (res.data != undefined) {
          if (res.data.length > 0) {
            self.setData({
              files: res.data,
              showView: false,
              swiper: true
            })
          } else {
            self.setData({
              showView: true,
              swiper: false
            })
          }
        }
      }
    })
  },
  //拉取数据
  onLoad: function (options) {
    var that = this;
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    var storeNo = wx.getStorageSync('storeNo');
    var that = this;
    that.setData({
      id: options.id,
      wxUid,
      wxSid,
      storeNo
    });
    wx.request({
      url: Config.restUrl + "/wxserver/home/getGoodsDetails",
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        data: {
          goodsId: that.data.id,
          wxUid,
          wxSid,
          storeNo
        }
      },
      success: function (res) {
        var len = res.data.data.goodsPics.length;
        var files = [];
        for (var i = 0; i < len; i++) {
          files.push(res.data.data.goodsPics[i].imageUrl);
        }
        wx.setStorageSync('files', files);
        that.setData({
          goodsPrice: res.data.data.goodsPrice,
          list: res.data.data,
          swiper: true,
          files
        })

      }
    })
  },

  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  //修改图片跳转到选图片模块
  chooseimage: function () {
    var self = this;
    wx.navigateTo({
      url: '/pages/shopping/branch1/drag/drag',
      success: function () {
        console.log("返回");
        wx.getStorage({
          key: 'files',
          success: function (res) {
            console.log(1)
            console.log(res.files)
          },
        })
      }
    })
  },
  detailsClick: function () {
    wx.navigateTo({
      url: '/pages/shopping/branch1/details/details'
    })
  },
  dragclick: function () {
    wx.navigateTo({
      url: '/pages/shopping/branch1/drag/drag',
    })
  },
  // completeTap(e) {
  //   var that = this;
  //   var wxUid = wx.getStorageSync('wxUid');
  //   var wxSid = wx.getStorageSync('wxSid');
  //   var imageArray = wx.getStorageSync('files');
  //   var goodsUrl = [];
  //   for (var i = 0; i < imageArray.length; i++) {
  //     var filePath = imageArray[i];
  //     var imgName = filePath.substr(30, 50) + '.png';
  //     qiniuUploader.upload(filePath, (res) => {
  //       //上传成功，上传成功一张图片，进入一次这个方法，也就是返回一次
  //       goodsUrl.push(res.imageURL);
  //       console.log(goodsUrl);
  //     },
  //       (error) => {
  //         //图片上传失败，可以在七牛的js里面自己加了一个err错误的返回值
  //         console.log('error: ' + error)
  //       },
  //       {
  //         region: 'NCN',
  //         domain: 'p1az9gcpw.bkt.clouddn.com', // bucket 域名
  //         uptokenURL: Config.restUrl + '/wxserver/imgUpload/upload?wxUid=25714b2d-40c8-4d86-b8e8-c0954dc75982',
  //         uploadURL: 'https://up-z1.qbox.me',//华东
  //         key: imgName, // 自定义文件 key
  //       });
  //   }
  // },
  onUnload(e) {
  },
  //修改后提交
  formSubmit: function (e) {
    this.setData({
        goodsPrice: e.detail.value.money
    })
    var that = this;
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    var storeNo = wx.getStorageSync('storeNo');
    var money = e.detail.value.money; //获取表单所有input的值
    var tempName = e.detail.value.tempName; //获取表单所有input的值
    var imageArray = wx.getStorageSync('files');
    var goodsUrl = [];
    var imgUrls = '';


    // for (var i = 0; i < imageArray.length; i++) {
    //   var filePath = imageArray[i];
    //   var imgName = filePath.substr(30, 50) + '.png';
    //   qiniuUploader.upload(filePath, (res) => {
    //     //上传成功，上传成功一张图片，进入一次这个方法，也就是返回一次
    //     goodsUrl.push(res.imageURL);
    //     imgUrls += res.imageURL + ',';
    //   },
    //     (error) => {
    //       //图片上传失败，可以在七牛的js里面自己加了一个err错误的返回值
    //       console.log('error: ' + error)
    //     },
    //     {
    //       region: 'NCN',
    //       domain: 'p1az9gcpw.bkt.clouddn.com', // bucket 域名p1az9gcpw.bkt.clouddn.com
    //       uptokenURL: Config.restUrl + '/wxserver/imgUpload/upload?wxUid=' + wxUid + '&wxSid=' + wxSid,
    //       //uptokenURL: Config.restUrl + '/wxserver/imgUpload/upload?wxUid='+wxUid,
    //       uploadURL: 'https://up-z1.qbox.me',//华东
    //       key: imgName, // 自定义文件 key
    //     });
    // };
    if (e.detail.value.tempName == "" || e.detail.value.money == "") {
      wx.showModal({
        title: '商品描述或者价格不能为空'
      })
    } else {
      var imgUrles = imgUrls.substr(0, imgUrls.length - 1);
      // return;
      var that = this;
      var files = new Array(that.data.files);
      var urls = files.join(',');
      wx.request({
        url: 'https://dingdian.parllay.cn/wxserver/goods/updateGoodsBysSalesclerk',
        method: 'POST',
        data: {
          "data": {
            "wxUid": wxUid,
            "wxSid": wxSid,
            "storeNo": storeNo,
            "goodsId": that.data.id,
            "goodsName": e.detail.value.tempName,
            "goodsUrl": urls,
            "goodsDesc": imgUrles,
            "goodsPrice": e.detail.value.money
          }
        },
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          wx.removeStorageSync('files');

          wx.navigateBack();
        }
      })
    }

  },
  delete: function (e) {
    var goodsId = base.getDataSet(e, 'id');
    this.setData({
      id: goodsId,
      hidden: false
    });
    this.confirm();

  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm() {
    var that = this;
    that.setData({
      hidden: true
    });
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    var storeNo = wx.getStorageSync('storeNo');
    var params = {
      data: {
        wxUid,
        wxSid,
        storeNo,
        goodsId: this.data.id
      }
    };
    var param = {
      url: '/wxserver/goods/deleteGoodsBysSalesclerk',
      type: 'POST',
      data: params,
      sCallback: function (res) {
        if (res.status) {
          wx.showModal({
            title: '删除商品',
            content: '删除商品成功!',
            showCancel: false,
            success: d => {
              if (d.confirm) {
                wx.removeStorageSync('files');
                wx.navigateBack({

                })
              }
            }
          })
        }
      },
      eCallback: data => {

      }
    };
    base.request(param);
  },
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
    var discountPrice = this.data.goodsPrice * discount;
    this.setData({
      discountPrice
    });
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
  }
})