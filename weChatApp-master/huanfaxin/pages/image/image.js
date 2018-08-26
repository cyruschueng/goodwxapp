// pages/image/image.js
var api = require('../../api.js');
var util = require('../../utils/util.js');
var upload = require('../../utils/upload.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fontSize: '',
    url:'',
    isShow:true,
    canvasHidden:false,
    remoteUrl:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.remoteImage){
       console.log(2222222222)
     

      this.setData({
          url:options.remoteImage,
         canvasHidden:true,
         isShow:false,
      })
    } else if(!options.remoteImage){
      console.log(12312312)
       const device = wx.getSystemInfoSync() // 获取设备信息
    const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
    const height = device.windowHeight

    wx.showLoading({
        title: '图片生成中',
    })

    if (options.imageUrl !== undefined) {
      const ctx = wx.createCanvasContext('demo');
      ctx.drawImage(options.imageUrl, 0,0,width, height);
      ctx.drawImage(options.tapImage, 0,0,width, height);
      ctx.draw('',res => {
        wx.canvasToTempFilePath({
          destWidth:1125,
          destHeight:2436,
          canvasId: 'demo',
          success: function(res) {
            console.log("tempFilePath",res.tempFilePath)

            that.setData({
              url: res.tempFilePath,
              canvasHidden:true,
            })
            setTimeout(()=>{
              that.setData({
                isShow:false,
              });
              wx.hideLoading();
              
            },500)
              
             // upload.uploadSingleB(res.tempFilePath, function (pic) {
             //    if(pic){
             //      console.log(pic)
             //      that.setData({
             //        imageUrl: pic.url+"?watermark/1/image/"+util.encode(options.tapImage)+"/dissolve/100/gravity/North/dx/0/dy/0",
             //        remoteUrl:pic.url,
             //      });
             //    }else{
             //      that.showZanToast('上传失败，请稍后再试呢');
             //    }
             //  });
          
          },
          error: function (res) {
            console.log(res)
          }
        })
      });
      // wx.getImageInfo({
      //   src: '../../styles/4hTfDF8NTNTdSSd4KMiEbC4RfnA5Zp2N.png',
      //   success: function (res) {
      //     console.log(res.width)
      //     console.log(res.height)

      //   },
      //   complete: res => {
      //     console.log(res);
      //   }
      // })



      
      // upload.uploadSingleB(options.imageUrl, function (pic) {
      //   if(pic){
      //     that.setData({
      //       imageUrl: pic.url+"?watermark/1/image/"+util.encode(options.tapImage)+"/dissolve/100/gravity/North/dx/0/dy/0"
      //     });
      //     setTimeout(function () {
      //       wx.hideLoading();
      //     },5000);
      //   }else{
      //     that.showZanToast('上传失败，请稍后再试呢');
      //   }
      // });
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          console.log(res.model);
          if (res.model === 'iPhone X') {
            that.setData({
              fontSize: '40'
            })
          } else {
            that.setData({
              fontSize: (res.windowHeight - 100) / 1454 * 100
            })
          }
        }
      })
    } else {
      wx.showLoading({
        title: '图片选择有误',
      })
      setTimeout(function () {
        wx.hideLoading();
        wx.navigateTo({
          url: '../index/index'
        })
      },1000);

    }
    }
   
  },
  previewImage: function (e) {
    util.previewSingalPic(e.currentTarget.dataset.url)
  },
  showIndex: function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  saveImgToPhotosAlbumTap:function(){
    var that = this;
    if (wx.saveImageToPhotosAlbum) {
      wx.saveImageToPhotosAlbum({
        filePath: that.data.url,
        success: function (res) {
          wx.showToast({
            title: '保存到相册啦',
            icon: 'success',
            duration: 2000
          })
          //that.showZanToast('保存到相册啦');
        },

        fail: function(err) {
          // console.log(err);
          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // console.log("用户一开始拒绝了，我们想再次发起授权")
              // console.log('打开设置窗口')

              wx.openSetting({
                      success(settingdata) {
                          // console.log(settingdata)
                          if (settingdata.authSetting['scope.writePhotosAlbum']) {
                              // console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                          } else {
                              // console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                          }
                      }
                  })
              }
          }
      })
    } else {
      util.previewSingalPic(that.data.url)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareAppMessage: function () {
    var remoteImage = this.data.remoteUrl
    return {
      title: '给你的手机换个发型吧',
      path:"pages/index/index",
    }
  },
  tapShare:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})