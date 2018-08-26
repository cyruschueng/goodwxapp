/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../../packages/@we-cropper/we-cropper.js'
import api from '../../api/api_v1.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
const qiniuUploader = require("../../libs/qiniuUploader");


Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 5,
      cut: {
        x: (width - 320) / 2,
        y: (height - 240) / 2,
        width: 320,
        height: 240
      },
      uid: 0,
      activity_id: 0,
      disabled: true
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
    this.setData({ disabled: true });
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log(src)
        this.saveQiniu(src);
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  saveQiniu: function(src) {
    var that = this;
    // 先获取上传TOKEN
    api.getUploadToken({
      success: (res_token) => {
        if (res_token.data.res === 0) {
          console.log('token', res_token.data.data)
          // 上传到七牛
          qiniuUploader.upload(src, (res) => {
            // 插入images表
            api.saveImage({
              method: 'post',
              data: {
                url: res.imageURL
              },
              success: (res2) => {
                console.log('saveImage', res2);
                if (res2.data.res === 0) {
                  // console.log('image_id', res.data.data)
                  // 直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                  var pages = getCurrentPages();
                  var currPage = pages[pages.length - 1];   //当前页面
                  var prevPage = pages[pages.length - 2];  //上一个页面
                  if (that.data.activity_id) {                    
                    api.saveActivityImage({
                      method: 'post',
                      data: {
                        image_id: res2.data.data,
                        user_id: that.data.uid,
                        activity_id: that.data.activity_id
                      },
                      success: (save_res) => {
                        console.log('save_res', save_res.data.data);
                        prevPage.setData({
                          activity_info: save_res.data.data,
                          is_uploading: save_res.data.data._is_uploading
                        })
                      }
                    })
                  } else {
                    prevPage.setData({
                      image_id: res2.data.data,
                      files: [{ url: src }],
                      has_image: true
                    })
                  }
                  wx.navigateBack({ delta: 1 }) // 返回上一页
                }
              }
            })
          }, (error) => {
            console.log('error: ' + error);
          }, {
            region: 'SCN',
            domain: 'qiniu.juhuibei.com', // bucket 域名，下载资源时用到。
            // key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
            uptoken: res_token.data.data,
          });

        }
      }
    })
  },
  uploadTap: function () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        self.setData({ disabled: false })
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad: function (options) {
    console.log('options', options);
    this.setData({ disabled: true })
    if (options.activity_id) this.setData({ activity_id: options.activity_id })
    if (options.user_id) {
      this.setData({  uid: options.user_id });
      this.uploadTap();
    }
    const { cropperOpt } = this.data

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
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
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()
  },
  onShow: function () {
    
  }
})
