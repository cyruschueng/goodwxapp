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
    tapss: true
  },
  onLoad(options){
    console.log("options:", options);
    let pw_id = options.pw_id;
    that.setData({
      pw_id
    })
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
    console.log('getCropperImage11');
    this.setData({
      tapss: false
    })
    this.cropperOpt
    wx.showToast({
      title: '上传中',
      icon: 'loading'
    })
    let pw_id = wx.getStorageSync('pw_id');
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        var that = this;
        
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
            console.log('上传图片成功', res);
            let data = JSON.parse(res.data);
            let picture = data.data;
            that.setData({
              picture
            })
            //new获取照片墙信息
            wx.request({
              url: apiurl + "photo/photo-wall-detail?sign=" + sign + '&operator_id=' + app.data.kid,
              data: {
                pw_id: pw_id
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                console.log("照片墙信息:", res);
                var status = res.data.status;
                if (status == 1) {
                  let photos = res.data.data.photos;
                  console.log(photos);
                  let datas = [];
                  for (let i = 0; i < 27; i++) {
                    if (photos[i]) {
                      datas.push(photos[i]);
                    } else {
                      datas.push({ 'photo_url': 'https://gcdn.playonwechat.com/photo/bg.jpg', 'position': i + 1 })
                    }
                  }
                  that.setData({
                    photos: datas
                  })
                  let length = that.data.photos.length;
                  let arr = [];//当前上传的位置
                  // 背景音乐
                  //console.log("photos:", that.data.photos);
                 // console.log("length:", length);
                  for (let i = 0; i < length; i++) {
                    //console.log(photos[i].photo_url);
                    if (that.data.photos[i].photo_url == 'https://gcdn.playonwechat.com/photo/bg.jpg') {
                      arr.push(that.data.photos[i].position);
                      //console.log('position:', photos[i].position);
                      wx.setStorageSync('position', arr[0]);
                      that.setData({
                        position: arr[0]
                      })
                    }
                  }
                  console.log("传：", that.data.position);
                  if (data.status == 1) {
                    wx.request({
                      url: app.data.apiurl3 + "photo/append-photo?sign=" + sign + '&operator_id=' + app.data.kid,
                      data: {
                        pw_id: pw_id,
                        picture: that.data.picture,
                        position: that.data.position
                      },
                      header: {
                        'content-type': 'application/json'
                      },
                      method: "GET",
                      success: function (res) {
                        console.log("添加照片:", res);
                        let status = res.data.status;
                        if (status == 1) {
                          that.setData({
                            tapss: true
                          })
                          console.log('上传成功！')
                          //  获取到裁剪后的图片
                          wx.reLaunch({
                            url: `../../share/share?avatar=${picture}&pw_id=${wx.getStorageSync('pw_id')}`
                          })

                        } else {
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'loading'
                          })
                          that.setData({
                            tapss: true
                          })
                          setTimeout(function () {
                            wx.reLaunch({
                              url: `../../share/share?avatar=${picture}&pw_id=${wx.getStorageSync('pw_id')}`
                            })
                          }, 1000)
                        }

                      }
                    })
                    // 添加照片
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'loading'
                    })
                    that.setData({
                      tapss: true
                    })
                    setTimeout(function () {
                      wx.redirectTo({
                        url: `../../share/share?avatar=${picture}&pw_id=${wx.getStorageSync('pw_id')}`
                      })
                    }, 1000)
                  }
                  //console.log(that.data.photos);
                  wx.hideLoading()
                } else {
                  that.setData({
                    tapss: true
                  })
                  tips.alert(res.data.msg);
                  setTimeout(function () {
                    wx.redirectTo({
                      url: `../../share/share?avatar=${picture}&pw_id=${wx.getStorageSync('pw_id')}`
                    })
                  }, 1000)
                }

              }
            })
            
          }
        })

      } else {
        console.log('获取图片失败，请稍后重试')
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
