import weCropper from '../../we-cropper-master/weCropper.js'
var common = require('../../common/common.js');
var app = getApp()

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
    },
    //avatarInfo:'',
    tokenstorage:'',
    swapstorage:'',
    accessid:'',
    host: '',
    policy: '',
    signature: '',
    expire: '',
    upload_dir: '',
    filename: '',
    id:''
  },
  onLoad(option) {
    // do something
    const { cropperOpt } = this.data
    const { src } = option
    var id = option.id;
    this.setData({
      id: id
    })
    if (id == 1) {
      setTimeout(function () {
        this.logoSignature('users/avatar/sign')
      }.bind(this), 500);
    }


    if (src) {
      Object.assign(cropperOpt, { src })
      new weCropper(cropperOpt)
        .on('ready', function (ctx) {
          console.log('wecropper is ready for work!')
        })
        .on('beforeImageLoad', (ctx) => {
          console.log('before picture loaded, i can do something')
          console.log('current canvas context:', ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log('picture loaded')
          console.log('current canvas context:', ctx)
          wx.hideToast()
        })
    }
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
      }
    })
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data,
        })
      }
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
    this.wecropper.getCropperImage((avatar) => {
      console.log(avatar+'---------------------')
      if (avatar) {
       //wx.setStorageSync('avatarInfo', avatar)
        var fileExtension = avatar.substring(avatar.lastIndexOf('.') + 1);
        var _this = this;
        wx.uploadFile({
          url: _this.data.host,
          filePath: avatar,
          name: 'file',
          header: {
            'token': _this.data.tokenstorage
          },
          formData: {
            name: avatar,
            key: _this.data.upload_dir + _this.data.filename + '.' + fileExtension,
            policy: _this.data.policy,
            OSSAccessKeyId: _this.data.accessid,
            success_action_status: '200',
            signature: _this.data.signature
          },
          success: function (res) {
            console.log(res.statusCode)
            if (res.statusCode=='200' && _this.data.id=='1'){
              wx.request({
                url: common.getRequestUrl + '/dtk/users/avatar',
                method: 'PUT',
                data:{
                  'filename': _this.data.filename + '.' + fileExtension
                },
                header: {
                  'content-type': 'application/json',
                  'token': _this.data.tokenstorage
                },
                success: function (res) {
                  if (res.data.code == 'OK') {
                    wx.showToast({
                      title: '上传成功',
                      icon: 'success',
                      duration: 2000
                    })
                    //  获取到裁剪后的图片
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../user/user'
                      })
                    }.bind(this), 1000);
                  } else if (res.data.code == 'TOKEN_INVLID') {
                    this.exchangeToken()
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'success',
                      duration: 2000
                    })
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index'
                      })
                    }.bind(this), 500);
                  }
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            }else{
              wx.showToast({
                title: '上传成功',
                icon: 'cancel',
                duration: 2000
              })
            }
          },
          fail: function (err) {
            console.log(err)
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
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.wecropper.pushOrign(src)
      }
    })
  },
  //取得logo上传签名
  logoSignature: function (e) {
    console.log("---------- 一直请求我"+ e)
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/'+e,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        console.log(res.data.sign)
        if (res.data.code == 'OK') {
          _this.setData({
            accessid: res.data.sign.accessid,
            host: res.data.sign.host,
            policy: res.data.sign.policy,
            signature: res.data.sign.signature,
            expire: res.data.sign.expire,
            upload_dir: res.data.sign.upload_dir,
            filename: res.data.sign.filename
          })
          
        } else if (res.data.code == 'TOKEN_INVLID') {
          this.exchangeToken()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //换取 token
  exchangeToken: function () {
    var _this = this;
    _this.setData({
      loadingHidden: false
    });
    wx.request({
      url: common.getRequestUrl + '/dtk/users/token',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'swap': this.data.swapstorage
      },
      success: function (res) {
        if (res.data.code !== 'OK') {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
        } else {
          wx.setStorageSync('tokenstorage', res.data.token)
          _this.setData({
            tokenstorage: res.data.token
          })

        }
      },
      fail: function (err) {
        console.log(err)
      }
    })

  }
})
