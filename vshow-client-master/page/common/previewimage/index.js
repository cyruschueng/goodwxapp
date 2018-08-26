// pages/common/previewimage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onLoad: function (options) {
    let { url } = options;
    if (!url) return wx.showToast({
      title: '路径不能为空!',
      image: '/img/prompt.png'
    });
    this.setData({
      imgUrl: url
    });
  },

  onReady(){
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {  //保存到相册权限失败, 发起授权请求
          wx.authorize({
            scope: 'scope.writePhotosAlbum'
          })
        }
      }
    })
  },

  onClick(){
    if (!this.data.imgUrl) return;
    let device = wx.getSystemInfoSync();
    if (/android/.test(device.system.toLocaleLowerCase())) return; //安卓多次点击调用微信预览接口，图片无法正常保存，故先隐藏
    
    wx.previewImage({
      urls: [this.data.imgUrl],
    })
  },

  getDevice(){
    !this.data.device && (this);
  },

  saveImage(){
    let self = this;
    let { imgUrl } = self.data;
    if (!imgUrl.trim()) return wx.showToast({
      title: '路径不能为空!',
      image: '/img/prompt.png'
    });
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.writePhotosAlbum']) {  //获取保存到相册权限成功
          self.saveImageToPhotosAlbum(imgUrl);
        } else {  //获取保存到相册权限失败
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.writePhotosAlbum']) {
                self.saveImageToPhotosAlbum(imgUrl);
              }
            }
          })
        }
      }
    })
  },

  saveImageToPhotosAlbum(url) {
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success() {
        wx.showModal({
          title: '保存成功',
          showCancel: false
        })

      }

    })
  },

  onShareAppMessage() {
    return {
      title: '一起来玩转微V秀吧',
      path: '/page/tabBar/photo/index'
    }
  }
})