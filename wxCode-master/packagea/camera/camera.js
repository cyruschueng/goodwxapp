// pages/pagestructure/pagestructure.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoSrc: '',
    videoSrc: ''
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
    // this.videoContext = wx.createVideoContext('myVideo')
    this.camera = wx.createCameraContext()
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
  takePhoto() {
    var that = this
    this.camera.takePhoto({
      success(res) {
        console.log('s')
        that.setData({
          photoSrc: res.tempImagePath
        })
      },
      fail() {
        console.log('f')
      },
      complete() {
        console.log('c ')
      }
    })
  },
  startRecordVideo() {
    this.camera.startRecord({
      success(res) {
        console.log('s')
      },
      fail() {
        console.log('f')
      },
      complete() {
        console.log('c ')
      }
    })
  },
  stopRecordVideo() {
    var that = this
    this.camera.stopRecord({
      success(res) {
        console.log(res)
        that.setData({
          videoSrc: res.tempVideoPath
        })
      },
      fail() {
        console.log('f')
      },
      complete() {
        console.log('c ')
      }
    })
  }





})