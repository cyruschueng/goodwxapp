const app = getApp()
Page({
  data: {
    mark: '',
    fr: '',
    to: '',
    mark: '',
    pic: '',
    userInfo: '',
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (option) {
    const self = this
    wx.showShareMenu({
      withShareTicket: true
    })
    self.setData({
      userInfo: app.globalData.userInfo,
      //mark: option.mark,
      //fr: option.fr,
      //to: option.to,
      //content: option.content,
      pic: option.pic,
    })
    wx.setNavigationBarTitle({
      title: '明信片'
    })
  },
  screenImg: function (e) {
    var imgUrl = e.currentTarget.dataset.imgurl;
    var imgs = [];
    imgs.push(imgUrl);
    wx.previewImage({
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  savetolocal: function() {
    wx.downloadFile({
      url: this.data.pic,
      success:function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(res) {
            wx.showToast({
              title: '保存成功',
            })
          },
        })
      } 
    })
  },
  backtohome: function() {
    wx.switchTab({
      url: '../experience/experience',
    })
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
  onUnload: function (option) {

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
    return {
      title: '来自'+this.data.userInfo.nickName+'的明信片',
      path: '/pages/postcard/postcardShare?fr=' + this.data.fr + '&to='+this.data.to+'&content='+this.data.content + '&pic='+this.data.pic+'&mark='+this.data.mark,
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})