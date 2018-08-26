// pages/user/userCommend/userCommend.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    portrait_temp: null,
    scale: 1,
    windowWidth: 375,
    hidden: true,
    prurl: ''
  },
  share: function () {
    let _this = this;
    wx.downloadFile({
      url: app.globalData.userInfo.avatarUrl,
      success: function (res) {
        let portrait_temp = res.tempFilePath
        _this.drawImage(portrait_temp);
        wx.hideLoading();
        setTimeout(function () {
          _this.canvasToImage()
        }, 200)
      }
    })
  },
  drawImage: function (portrait_temp) {
    //绘制canvas图片
    var _this = this
    const ctx = wx.createCanvasContext('shareImg')
    var bgPath = '../../images/share_bg.png'
    var portraitPath = portrait_temp
    var hostNickname = app.globalData.userInfo.nickName

    var qrPath = '../../images/qrcode.jpg'
    var windowWidth = _this.data.windowWidth
    _this.setData({
      scale: 1.6
    })
    //绘制背景图片
    ctx.drawImage(bgPath, 0, 0, windowWidth, _this.data.scale * windowWidth)

    //绘制头像
    ctx.save()
    ctx.beginPath()
    ctx.arc(windowWidth / 2, 0.32 * windowWidth, 0.15 * windowWidth, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(portraitPath, 0.7 * windowWidth / 2, 0.17 * windowWidth, 0.3 * windowWidth, 0.3 * windowWidth)
    ctx.restore()
    //绘制第一段文本
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(0.037 * windowWidth)
    ctx.setTextAlign('center')
    ctx.fillText(hostNickname + ' 正在参加活动', windowWidth / 2, 0.52 * windowWidth)
    //绘制第二段文本
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(0.037 * windowWidth)
    ctx.setTextAlign('center')
    ctx.fillText('邀请你一起来参加活动啦~', windowWidth / 2, 0.57 * windowWidth)
    //绘制二维码
    ctx.drawImage(qrPath, 0.64 * windowWidth / 2, 0.75 * windowWidth, 0.36 * windowWidth, 0.36 * windowWidth)
    //绘制第三段文本
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(0.037 * windowWidth)
    ctx.setTextAlign('center')
    ctx.fillText('长按二维码识别', windowWidth / 2, 1.36 * windowWidth)
    ctx.draw()
  },
  canvasToImage: function () {
    var _this = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: _this.data.windowWidth,
      height: _this.data.windowWidth * _this.data.scale,
      destWidth: _this.data.windowWidth * 4,
      destHeight: _this.data.windowWidth * 4 * _this.data.scale,
      canvasId: 'shareImg',
      success: function (res) {
        console.log('朋友圈分享图生成成功:' + res.tempFilePath)
        _this.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        // wx.previewImage({
        //   current: res.tempFilePath, // 当前显示图片的http链接
        //   urls: [res.tempFilePath] // 需要预览的图片http链接列表
        // })
      },
      fail: function (err) {
        console.log('失败')
        console.log(err)
      }
    })
  },
  save: function () {
    let _this = this;
    wx.saveImageToPhotosAlbum({
      filePath: _this.data.prurl,
      success: function () {
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: function (e) {
        console.log("保存失败" + JSON.stringify(e))
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.share();
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + JSON.stringify(res))
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '用户推荐',
      path: '/pages/user/userCommend/userCommend?id=123',
      imageUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKgYuT4PMHzd9vO0OtworiaL13EfCdECyhtT5iaXtCAQKUgL3L7RhX2Kr9OSUgqdric4YdSJL4vKJ8Zg/0',
      success: function (res) {
        // 转发成功
        console.log(res);
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})