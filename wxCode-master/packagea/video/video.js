// pages/pagestructure/pagestructure.js
function getRandomColor () {
  var color = []
  for ( let i = 0; i < 3; ++i ) {
    let rgb = Math.floor((Math.random() * 256).toString(16))
    rgb = rgb.length == 1 ? '0' + rgb : rgb
    color.push(rgb)
  }
  return "#" + color.join['']
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: ''
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
    this.videoContext = wx.createVideoContext(this)
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
  chooseVideo() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  removeVideo() {
    this.setData({
      src: ''
    })
  },
  saveVideo() {
    var that = this
    wx.saveVideoToPhotosAlbum({
      filePath: that.data.src,
      success() {
        console.log('s')
      },
      fail: function () {
        console.log('f')
      }
    })
  },
  inputValue: '',
  bindInputBluer: function (e) {
    console.log(e)
    // this.inputValue = e.datail.value
    console.log(e.detail)
    console.log(e.detail.value)
    this.inputValue = e.detail.value
    console.log(this.inputValue)
  },
  sendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  }










})