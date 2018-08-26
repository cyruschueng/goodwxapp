import weCropper from '../../../dist/weCropper.js'
import tips from '../../../utils/tips.js';
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
console.log("width：", width, height);
let width1='';
let height1 = '';
const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';
let w = width / wx.getStorageSync('width');
let h = height / wx.getStorageSync('height');
if (w < 1 || h < 1) {
  if (w < h) {
    width1 = width;
    height1 = wx.getStorageSync('height') * w;
  } else {
    height1 = height;
    width1 = wx.getStorageSync('width') * h;
  }
}else {
  width1 = wx.getStorageSync('width')
  height1 = wx.getStorageSync('height')
}
/*if (wx.getStorageSync('width') > width){
  width1 = width;// * (width / wx.getStorageSync('width') ) * 0.8; 
  height1 = wx.getStorageSync('height') * (width / wx.getStorageSync('width'))
}else if (wx.getStorageSync('height') > height){
  width1 = wx.getStorageSync('width') * (wx.getStorageSync('height') / height) * 0.8
  height1 = wx.getStorageSync('height') * (wx.getStorageSync('height') / height) * 0.8 
}*/
// console.log(width1)
// console.log(height1)

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - width1)/2,
        y: (height - height1)/2,
        width: width1,
        height: height1
      }
    },
    tapss:true
  },
  onshow(){
    let that = this;
   
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
    //console.log("getCropperImage2",e)
    let form_id = e.detail.formId;
    console.log("form_id:", form_id);
    wx.showToast({
      title: '上传中',
      icon: 'loading'
    })
    
    let pw_id = wx.getStorageSync('pw_id');
    let position = wx.getStorageSync('position');
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        var that = this;
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
            console.log('上传图片成功', res);
            console.log('上传pw_id：', pw_id);
            let data = JSON.parse(res.data);
            let picture = data.data;
            if (data.status == 1) {
              that.setData({
                picture: data.data
              })
              console.log('上传pw_id：',pw_id);
              wx.request({
                  url: app.data.apiurl3 + "photo/append-photo?sign=" + sign + '&operator_id=' + app.data.kid,
                  data: {
                    pw_id: pw_id,
                    position: wx.getStorageSync('position'),
                    picture: picture
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
                      // 保存formid
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
                      console.log('上传成功！')
                      // 获取照片墙pwid
                      wx.setStorageSync('temp_id', wx.getStorageSync('temp_id'));
                      wx.removeStorageSync('width');
                      wx.removeStorageSync('height');
                      wx.removeStorageSync('weizhi');
                      wx.redirectTo({
                        url: '../../templateInform/templateInform?temp_id=' + wx.getStorageSync('temp_id') + '&pw_id=' + wx.getStorageSync('pw_id'),
                      })

                    } else {
                      console.log(res.data.msg);
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'loading'
                      })
                      wx.setStorageSync('temp_id', wx.getStorageSync('temp_id'))
                      setTimeout(function(){
                        wx.removeStorageSync('width');
                        wx.removeStorageSync('height');
                        wx.removeStorageSync('weizhi');
                        wx.redirectTo({
                          url: '../../templateInform/templateInform?temp_id=' + wx.getStorageSync('temp_id') + '&pw_id=' + wx.getStorageSync('pw_id'),
                        })
                      },2000)
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
          wx.removeStorageSync('width');
          wx.removeStorageSync('height')
          wx.redirectTo({
            url: '../../templateInform/templateInform?temp_id=' + wx.getStorageSync('temp_id') + '&pw_id=' + wx.getStorageSync('pw_id'),
          })
        },1000)
          
      }
      that.setData({
        tapss: true
      })
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
    const device = wx.getSystemInfoSync()
    const width = device.windowWidth
    const height = device.windowHeight - 50;
    console.log('option:', option);
    console.log("width:", option.width);
    let w = width / option.width;
    let h = height / option.height;
    let width1 = '';
    let height1 = '';
    if (w < 1 || h < 1) {
      if (w < h) {
        width1 = width;
        height1 = parseInt(option.height * w);
      } else {
        height1 = height;
        width1 = parseInt(option.width * h);
      }
    }else{
      width1 = wx.getStorageSync('width')
      height1 = wx.getStorageSync('height')
    }
    const { cropperOpt } = this.data;
    const src  = option.src;
    this.setData({
        cropperOpt: {
            id: 'cropper',
            width,
            height,
            scale: 2,
            zoom: 8,
            cut: {
             x: parseInt((width - width1*.8)/2),
              y: parseInt((height - height1 * .8) / 2),
              width: parseInt(width1 * .8),
              height: parseInt(height1 * .8)
            }, 
            src: option.src
       }
    })
    
    
    if (src) {
      // Object.assign(cropperOpt, { src })
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
    }
  }
})