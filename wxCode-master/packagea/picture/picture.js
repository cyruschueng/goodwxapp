// pages/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesPath: [],
    imageInfo: ''
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

  //
  chooseImage() {
    var that = this
    wx.chooseImage({
      success(res) {
        that.setData({
          imagesPath: res.tempFilePaths// []
        })
      }
    })
  },
  previewImage() {
    var that = this
    wx.previewImage({
      urls: that.data.imagesPath,
      current: this.urls[1]
    })
  },
  getImgInfo() {
    var that = this
    wx.getImageInfo({
      src: that.data.imagesPath[0],
      success: function (res) {
        that.setData({
          imageInfo: res
        })
        console.log(that.data.imageInfo)
      }
    })
  },
  previewImageAbst() {
    wx.previewImage({
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519801010884&di=08928b0755eadbf27041cd69ffc6eb24&imgtype=0&src=http%3A%2F%2Fwww.cbdio.com%2Fimage%2Fattachement%2Fjpg%2Fsite2%2F20151113%2Fa41f728525c817afa3f708.jpg'],
    })
  },
  saveimage() {
    wx.saveImageToPhotosAlbum({
      // filePath: 'wxfile',
      success: function () {
        console.log('s')
      },
      fail() {
        console.log('f')
      },
      complete() {
        console.log('c')
      }
    })
  }



})