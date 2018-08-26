const app = getApp()
Page({
  data: {
    qrUrl: '',
    packetTitle: '',

    avatarUrl: '',
    nickName: '',
    bgColor: '#c63629',
    txtColor: '#e7ba60',
    avatarImg: null,
    qrImg: null,
  },

  onLoad: function (option) {
    var dev = wx.getSystemInfoSync();
    var pixelRatio = 750 / dev.windowWidth;

    console.log(JSON.stringify(option));

    this.setData({
      width: 750 / pixelRatio,
      height: 981 / pixelRatio,
      pixelRatio: pixelRatio,
      qrUrl: option.qrUrl,
      avatarUrl: option.avatarUrl,
      nickName: option.nickName,
      packetTitle: option.packetTitle
    })
    this.saveScreen()

  },
  saveScreen: function () {

    wx.showLoading({
      title: '正在生成图片',
      mask: true
    })

    this.cacheImage('avatarImg', this.data.avatarUrl);
    this.cacheImage('qrImg', this.data.qrUrl);

    var reqCounter = 0;
    var intervalId = setInterval(func => {
      if (this.data.avatarImg && this.data.qrImg) {
        this.drawCanvas();
        clearInterval(intervalId);
      } else {
        if (reqCounter > 30) {
          reqCounter = 0;
          app.showMsg("图片生成出错");
          clearInterval(intervalId);
        }
      }
    }, 1000);
  },

  cacheImage: function (key, url, callback) {
    wx.getImageInfo({
      src: url,
      success: res => {
        console.log(url + "," + JSON.stringify(res));
        let obj = {};
        obj[key] = res;
        this.setData(obj);
        if (callback) {
          callback(obj[key])
        }
        console.log(this.data);
      },
      fail: res => {
      }
    })
  },


  drawCanvas: function () {
    console.log("before drawCanvas");
    const ctx = wx.createCanvasContext('myCanvas');
    var H1 = 36 * 2 / this.data.pixelRatio
    var avatarW = 66 * 2 / this.data.pixelRatio
    ctx.drawImage(this.data.avatarImg.path, (this.data.width - avatarW) / 2, H1, avatarW, avatarW);

    var H2 = 249 * 2 / this.data.pixelRatio
    var qrW = 143 * 2 / this.data.pixelRatio
    ctx.drawImage(this.data.qrImg.path, (this.data.width - qrW) / 2, H2, qrW, qrW);
    ctx.drawImage('/assets/praise_share.png', 0, 0, this.data.width, this.data.height);

    ctx.setFontSize(12)
    ctx.setFillStyle(this.data.txtColor)
    ctx.setTextAlign('center');
    var H3 = (113.5 + 9) * 2 / this.data.pixelRatio
    ctx.fillText(this.data.nickName, this.data.width / 2, H3)

    ctx.setFontSize(26)
    ctx.setFillStyle(this.data.txtColor)
    ctx.setTextAlign('center');
    var H4 = (195.5 + 9) * 2 / this.data.pixelRatio
    ctx.fillText(this.data.packetTitle, this.data.width / 2, H4)

    ctx.draw(true, func => {
      wx.hideLoading()
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        width: this.data.width,
        height: this.data.height,
        quality: 1,
        success: res => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              wx.showModal({
                content: "图片已经保存到相册了\r\n还不赶紧去发个朋友圈→",
                showCancel:false,
              })
            }
          })
        }
      })
    });
  },
})