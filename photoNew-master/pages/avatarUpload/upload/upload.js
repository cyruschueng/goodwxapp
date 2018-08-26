import weCropper from '../../../dist/weCropper.js'
import tips from '../../../utils/tips.js';
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';



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
    },
    tapss:true
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
  getCropperImage(e) {
    let form_id = e.detail.formId;
    wx.showToast({
      title: '上传中',
      icon: 'loading'
    })
    let pw_id = wx.getStorageSync('pw_id');
    let photosLength = wx.getStorageSync('photosLength');
    console.log("pw_id", pw_id);
    console.log("photosLength:", photosLength);
    let position = wx.getStorageSync('position');
    this.wecropper.getCropperImage((avatar) => {
      console.log("avatar：",avatar);
      if (avatar) {
        var that = this;
        wx.request({
          url: app.data.apiurl1 + "api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
          data: {
            form_id: form_id
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
          }
        })
        that.setData({
          tapss: false
        })
        let sign = wx.getStorageSync('sign');
        console.log(apiurl + "api/upload-image?sign=" + sign + ' & operator_id=' + app.data.kid);
        wx.uploadFile({
          url: apiurl + "api/upload-image?sign=" + sign + ' & operator_id=' + app.data.kid,
          filePath: avatar,
          name: 'image',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            let data = JSON.parse(res.data);
            let picture = data.data;
            if (data.status == 1) {
              that.setData({
                picture: data.data
              })
              console.log(app.data.apiurl3 + "photo/append-photo?sign=" + sign + '&operator_id=' + app.data.kid);
              wx.request({
                  url: app.data.apiurl3 + "photo/append-photo?sign=" + sign + '&operator_id=' + app.data.kid,
                  data: {
                    pw_id: pw_id,
                    picture: that.data.picture,
                    temp_id: wx.getStorageSync('temp_id'),
                    form_id: that.data.form_id
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    console.log('上传pw_id：', pw_id);
                    console.log("添加照片:", res);
                    let status = res.data.status;
                    if (status == 1) {
                      console.log('上传成功！')
                      //  获取到裁剪后的图片
                      wx.redirectTo({
                        url: '../../templateInform/templateInform?temp_id=' + wx.getStorageSync('temp_id')+'&pw_id='+ wx.getStorageSync('pw_id'),
                      })

                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'loading'
                      })
                    }

                  }
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'loading'
              })
            }
          }
        })

      } else {
        console.log('获取图片失败，请稍后重试'),
        setTimeout(function(){
          wx.redirectTo({
            url: '../../templateInform/templateInform?temp_id=' + wx.getStorageSync('temp_id'),
          })
        },1000)
          
      }
      that.setData({
        tapss: true
      })
    })
    console.log('nonononoo')
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    // do something
    const { cropperOpt } = this.data
    const { src } = option
    if (src) {
      Object.assign(cropperOpt, { src })

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
    }
  }
})