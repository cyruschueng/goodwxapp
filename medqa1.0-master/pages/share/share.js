// pages/share/share.js
var imageUtil = require('../../utils/util.js'); 
var shareImageURL = 'https://wx2.sinaimg.cn/mw690/67e28d21gy1fnpbpvfj88j20fo0ru773.jpg'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    imagefirstsrc: '../../images/share_background_test.jpg',//图片链接 
    imagewidth: 0,//缩放后的宽 
    imageheight: 0,//缩放后的高 
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

  saveImgToPhotosAlbumTap: function () {
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.writePhotosAlbum']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          
          wx.downloadFile({
            url: shareImageURL,
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (res) {
                  console.log(res)
                  wx.showToast({
                    title: '海报已保存至相册',
                    icon: 'success',
                    duration: 1000
                  })
                },
                fail: function (res) {
                  console.log(res)
                  console.log('fail')
                }
              })
            },
            fail: function () {
              console.log('fail')
            }
          })
        }
        else{
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              console.log('保存图片授权成功')
            },
            fail() {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting['scope.writePhotosAlbum'])                  {
                    console.log('开启权限成功')
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  preview:function(){
    wx.previewImage({
      urls: [shareImageURL],
    })
  }  
})