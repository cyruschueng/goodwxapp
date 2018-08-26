var util = require('../../utils/util.js')
var app = getApp()
var Zan = require('../../zanui/index');
var b_height=300;//按钮高度
var width;//图片宽度  rpx
var height;//图片高度  rpx
var pic;
var title;
var path;

Page(Object.assign({}, Zan.Toast, {
  data: {
  },
  save:function (e) {
    console.log("e",e);
    let formId = e.detail.formId;
    util.dealFormIds(formId);
    var that = this
    if (wx.saveImageToPhotosAlbum) {
      wx.saveImageToPhotosAlbum({
        filePath: pic,
        success: function (res) {
          wx.showToast({
            title: '保存到相册啦',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log(res)
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log(res)
            },
            error: function (res) {
              util.previewSingalPic(pic)
              console.log(res)
            },
            fail: function (res) {
              util.previewSingalPic(pic)
              console.log(res)
            }
          })
        }
      })
    }else{
      util.previewSingalPic(pic)
    }
  },
  preview:function (e) {
    util.previewSingalPic(pic);
  },
  onShareAppMessage: function () {
    return {
      title: title,
      path: path,
      imageUrl:pic
    }
  },
  dashang:function () {
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path:'pages/apps/largess/detail?accountId=3300'
    })
  },
  select:function (e) {
    console.log("e",e);
    let formId = e.detail.formId;
    util.dealFormIds(formId);
  },
  onLoad: function (options) {
    app.globalData.system_info = wx.getSystemInfoSync()
    var that = this;
    pic = decodeURIComponent(options.pic)
    title=options.title
    path = decodeURIComponent(options.path)

    var widow_height = app.globalData.system_info.windowHeight/app.globalData.system_info.windowWidth*750 //rpx
    wx.getImageInfo({
      src: pic,
      success: function (res) {
        console.log(res.width)
        console.log(res.height)
        console.log(widow_height)
        // if((widow_height-b_height)>res.height){
        //   width=res.width;
        //   height=res.height;
        // }else{
        // }
        height = widow_height-b_height;
        width = res.width/res.height*(height);

        that.setData({
          pic_url:pic,
          height:height,
          width:width,
        })
      }
    })
  }
}));
