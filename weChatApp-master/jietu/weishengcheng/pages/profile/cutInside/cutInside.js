/**
 * Created by sail on 2017/6/1.
 */
var weCropper = require('../../../utils/weCropper')
var api = require('../../../api.js')
var util = require('../../../utils/util.js')
var Zan = require('../../../zanui/index');
var upload = require('../../../utils/upload.js')

const device = wx.getSystemInfoSync()

Page(Object.assign({}, Zan.Toast, {
  data: {
    cropperOpt: {
      id: 'cropper',
      width: device.windowWidth,
      height: device.windowWidth,
      scale: 2.5,
      zoom: 8
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
	getCropperImage () {
  	var that = this;
		this.wecropper.getCropperImage((src) => {
			if (src) {
        var that = this;
        wx.showNavigationBarLoading();
        wx.showToast({
          title: '上传中……',
          duration:20000,
          icon: 'loading'
        })
        upload.uploadSingleB({path: src, state: 1}, function (pic) {
        	console.log(pic)
          if(pic){
            wx.hideNavigationBarLoading();
            wx.hideToast();
            wx.setStorageSync("avatar_cat_url", pic.url);
            wx.navigateBack();
          }else{
            wx.hideNavigationBarLoading();
            wx.hideToast();
            that.showZanToast('上传失败，请稍后再试呢');
          }
        });
			} else {
				console.log('获取图片失败，请稍后重试')
			}
		})
	},
	onLoad (option) {
		var src =  option.src
    const { cropperOpt } = this.data

    new weCropper(cropperOpt)
      .on('ready', function (ctx) {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
      console.log(`before picture loaded, i can do something`)
    console.log(`current canvas context:`, ctx)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    })
  })
  .on('imageLoad', (ctx) => {
      console.log(`picture loaded`)
    console.log(`current canvas context:`, ctx)
    wx.hideToast()
  })
    this.wecropper.pushOrign(src)
	}
}));
