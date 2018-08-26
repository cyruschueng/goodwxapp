/**
 * Created by sail on 2017/6/1.
 */
var weCropper = require('../../utils/weCropper')
var api = require('../../api.js')
var util = require('../../utils/util.js')
const { Toast, extend } = require('../../zanui-weapp/dist/index');
var upload = require('../../utils/upload.js')
var names = ['裁剪','生成换脸照','生成大头贴','生成美妆照','生成滤镜照','生成变妆照','生成头像'];
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = device.windowHeight
      var model;
var source;
var type;
Page(extend({}, Toast, {
  data: {
    name:'裁剪',
    cropperOpt: {
      id: 'cropper',
      width: 375,
      height: height - 50,
      scale: 3,
      zoom: 8,
      cut: {
        x: (width - 200) / 2, // 裁剪框x轴起点
        y: (width - 200) / 2, // 裁剪框y轴期起点
        width: 375/2, // 裁剪框宽度
        height: 812/2 // 裁剪框高度
      }
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
		  console.log(src)
      if (src) {
        wx.redirectTo({
          url: '/pages/index/index?url='+src
        })

        /*wx.showNavigationBarLoading();
        wx.showToast({
          title: '处理中……',
          duration:2000,
          icon: 'loading'
        })
        upload.uploadSingleB(src, function (pic) {
          console.log(pic)
          if(pic){
            console.log(pic);
            wx.redirectTo({
              url: '/pages/index/index?url='+pic.url
            })
          }else{
            that.showZanToast('上传失败，请稍后再试呢');
          }
        });*/
      } else {
        console.log('获取图片失败，请稍后重试')
      }
		})
	},
	onLoad (option) {
    if (option.url != undefined) {
      var src = option.url;
    }
    const { cropperOpt } = this.data

    new weCropper(cropperOpt)
      .on('ready', function (ctx) {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
      console.log(`before picture loaded, i can do something`)
    console.log(`current canvas context:`, ctx)
    wx.showToast({
      title: '上传中',
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
