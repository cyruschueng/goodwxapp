var api = require('../../../api.js')
var util = require('../../../utils/util.js')
var imgData = require('../../../utils/cosmetic.js')
var Zan = require('../../../zanui/index')
var app = getApp()
var item = {}
var content = []
var id

Page(Object.assign({}, Zan.Toast, {
  data: {
    lb: [
      "cur",
      "r1",
      "r2",
      "l1",
      "l2"
    ],
    disabled: true
  },

  onLoad: function (options) {
    console.log(imgData)
    app.globalData.system_info = wx.getSystemInfoSync();
    var that = this;
    wx.showNavigationBarLoading();
    wx.showToast({
      title: 'Loading……',
      duration: 1000,
      icon: 'loading'
    });
    item = imgData.data;
    console.log(item)
    that.commonPart();
    wx.hideNavigationBarLoading();
    wx.hideToast();
  },

  onShareAppMessage: function () {
    return {
      title:'日系妆、韩妆、裸妆、主题妆...您想要的都在这里！',
      path: "/pages/index/index"
    }
  },

  commonPart: function () {
    console.log("item",item);
    var that = this;
    console.log(item.content)
    if(typeof(item.content)=='string'){
      item.content = JSON.parse(util.decode(util.decode(util.decode(item.content))));
    }
    console.log(item.content);

    content = item.content.slice();
    var select = content[0].model;
    if (content[0].title) {
      wx.setNavigationBarTitle({
        title: content[0].title
      });
    }

    if (content.length < 5) {
      if (content.length == 2) {
        content = content.concat(content ,content);
      } else {
        content = content.concat(content);
      }
    }

    var lb = that.data.lb.slice(0, 4);
    for (let i = 0; i < content.length - 5; i++) {
      lb.push("l1");
    }
    lb.push("l2");

    var previewWidth = content[0].preview.width;
    var previewHeight = content[0].preview.height;
    var size = util.getSize(previewWidth,previewHeight,400,app.globalData.system_info)
    id=item.id;

    this.setData({
      content:content,
      size:size,
      lb: lb,
      select:select
    })
  },

  uploadOriginalImage: function () {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count:1,
      success: function (res) {
        console.log(res.tempFilePaths[0])
        that.afterAvatarChoose(res.tempFilePaths[0])
      }
    })
  },

  afterAvatarChoose: function (localPic) {
    wx.navigateTo({
      url: '/pages/cutInside/cutInside?src='+localPic+'&model='+this.data.select+'&source='+3
    })
  },

  touchstart: function (e) {
    var that = this;
    util.lunTouchstart(e , that);
  },

  touchmove: function (e) {
    var that = this;
    util.lunTouchmove(e , that);
  },

  touchend: function (e) {
    var that = this;
    util.lunTouchend(e , that);
  },

  scrollLeft: function () {
    var that = this;
    util.lunScrollLeft(content , that);
  },

  scrollRight: function () {
    var that = this;
    util.lunScrollRight(content , that);
  }
}));
