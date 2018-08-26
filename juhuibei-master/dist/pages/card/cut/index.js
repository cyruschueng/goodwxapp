/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../../../packages/@we-cropper/we-cropper.js'
import api from '../../../api/api_v1.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
const qiniuUploader = require("../../../libs/qiniuUploader");


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
        y: (height - 160) / 2,
        width: 320,
        height: 160
      },
      disabled: true,
      name: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ disabled: true });
    console.log('options', options);
    if (options.name) {
      this.setData({ name: options.name });
      // 初始化宽高 
      let o_width = +options.width;
      let o_height = +options.height;
      if (o_width > 300) {
        o_height = o_height * 300 / o_width;
        o_width = 300;
      }
      let cropperOpt = this.data.cropperOpt;
      cropperOpt.cut = {
        x: (width - o_width) / 2,
        y: (height - o_height) / 2,
        width: o_width,
        height: o_height,
      }
      this.setData({ cropperOpt: cropperOpt });
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
    } else {
      wx.navigateBack({ delta: 1 });
    }
  },

  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
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

  /**
   * 将图片保存到七牛
   */
  saveQiniu: function (src) {
    let that = this;
    // 先获取上传TOKEN
    api.getUploadToken({
      success: (res_token) => {
        if (res_token.data.res === 0) {
          console.log('token', res_token.data.data)
          // 上传到七牛
          qiniuUploader.upload(src, (res) => {
            console.log('qiniuUploader', res.imageURL);
            let url = res.imageURL;
            if (url) { // 直接调用上一个页面的setData()方法
              url = 'http://' + url;
              let pages = getCurrentPages();
              let currPage = pages[pages.length - 1];   //当前页面
              let prevPage = pages[pages.length - 2];  //上一个页面
              // 将上传的地址根据name值，对应存放于上一个页面
              let name = this.data.name;
              if (name == 'cover') { // 加载页小图
                let form = prevPage.data.form;
                form.cover.url = url;
                prevPage.setData({ form: form });
              } else if (name == 'wedding_video_cover') { // 视频截图
                let form = prevPage.data.form;
                form.wedding_video_cover.url = url;
                prevPage.setData({ form: form });
              } else { // 页面照片
                let tag = prevPage.data.tag;
                for (let i = 0, len = tag.length; i < len; ++i) {
                  if (tag[i].tag_id === +name) {
                    tag[i].value = url;
                    tag[i].img.url = url;
                  }
                }
                prevPage.setData({ tag: tag, tag_change: 1 });
              }
              wx.navigateBack({ delta: 1 }) // 返回上一页
            }

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

  /**
   * 选择照片
   */
  uploadTap: function () {
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        self.setData({ disabled: false })
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.wecropper.pushOrign(src)
      }
    })
  },


  onShow: function () {

  }
})
