import WeCropper from '../../common/js/we-cropper.min.js';
import { Upload } from './upload-model.js';
const upload = new Upload();

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  onLoad(option) {
    const { cropperOpt } = this.data;
    this.setData({
      mobile: option.mobile
    });
    if (option.src) {
      cropperOpt.src = option.src
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
    var that = this;
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        var params = {
          wxUid: wx.getStorageSync('wxUid'),
          wxSid: wx.getStorageSync('wxSid'),
          file: avatar
        };
        wx.showLoading({
          title: '图片上传中...',
        })
        upload.uploadToServer(params, res => {
          wx.hideLoading();
          if (res.status) {
            // 获取到裁剪后的图片
            wx.redirectTo({
              url: `../index/index?avatar=${res.data.imgurl}&mobile=${that.data.mobile}`
            });
          } else {
            that.showReminder('请上传人脸正面照片', null);
          }
        })
      } else {
        console.log('获取图片失败，请稍后重试');
        that.showTip('获取图片失败');
      }
    })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.limitImageSize(src, status => {
          if (!status) {
            self.showReminder('图片超过3MB,请选择较小的图片', () => {

            });
          } else {
            self.wecropper.pushOrign(src)
          }
        });
      }
    })
  },
  limitImageSize(filePath, cb) {
    wx.getFileInfo({
      filePath: filePath,
      success(res) {
        if (res.size > 3000000)
          cb && cb(false);
        else
          cb && cb(true);
      },
      fail(err) {
        cb && cb(false);
      }
    })
  },
  showTip(title) {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 3000
    })
  },
  showReminder(content, cb) {
    wx.showModal({
      content: content,
      showCancel: false,
      confirmColor: '#1196ee',
      success: res => {
        if (res.confirm)
          cb && cb();
      }
    })
  }
})
