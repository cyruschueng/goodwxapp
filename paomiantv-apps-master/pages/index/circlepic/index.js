const app = getApp()
Page({
  data: {
    videoImgUrl: '',
    qrUrl: '',
    packetTitle: '',
    avatarUrl: '',
    nickName: '',
    bgColor: '#c63629',
    txtColor: '#e7ba60',
    avatarImg: null,
    videoImg: null,
    qrImg: null,
    bgImage: null,

  },

  onLoad: function (option) {
    var dev = wx.getSystemInfoSync();
    var pixelRatio = 750 / dev.windowWidth;
    this.setData({
      width: 750 / pixelRatio,
      height: 1182 / pixelRatio,
      pixelRatio: pixelRatio,
      videoImgUrl: option.videoImgUrl,
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

    console.log("circle=" + this.data.width + "," + this.data.height);

    console.log(JSON.stringify(this.data));

    this.cacheImage('avatarImg', this.data.avatarUrl);
    this.cacheImage('videoImg', this.data.videoImgUrl);
    this.cacheImage('qrImg', this.data.qrUrl);

    var reqCounter = 0;
    var intervalId = setInterval(func => {
      if (this.data.avatarImg && this.data.videoImg && this.data.qrImg) {
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

  downloadImage: function (key, url) {
    console.log("开始下载downloadImage:" + key);
    wx.downloadFile({
      url: url,
      success: res => {
        console.log(key + "," + JSON.stringify(res));
        let obj = {};
        obj[key + ".path"] = res.tempFilePath;
        this.setData(obj);
      },
      fail: res => {
        console.log(key + ",失败：" + JSON.stringify(res));
      }
    })
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
    const ctx = wx.createCanvasContext('myCanvas');
    var H1 = 34.5 * 2 / this.data.pixelRatio;
    var avatarW = 47.6 * 2 / this.data.pixelRatio;

    ctx.drawImage(this.data.avatarImg.path, (this.data.width - avatarW) / 2, H1, avatarW, avatarW);

    var H2 = 356 * 2 / this.data.pixelRatio
    var qrW = 150 * 2 / this.data.pixelRatio
    ctx.drawImage(this.data.qrImg.path, (this.data.width - qrW) / 2, H2, qrW, qrW);

    var H3 = 134 * 2 / this.data.pixelRatio
    var coverW = 109 * 2 / this.data.pixelRatio
    var coverH = 109 * 16 * 2 / 9 / this.data.pixelRatio
    ctx.drawImage(this.data.videoImg.path, (this.data.width - coverW) / 2, H3, coverW, coverH);

    ctx.drawImage('/assets/video_share.png', 0, 0, this.data.width, this.data.height);

    ctx.setFontSize(12)
    ctx.setFillStyle(this.data.txtColor)
    ctx.setTextAlign('center');
    var H4 = (96 + 9) * 2 / this.data.pixelRatio
    ctx.fillText(this.data.nickName, this.data.width / 2, H4)

    ctx.setFontSize(26)
    ctx.setFillStyle(this.data.txtColor)
    ctx.setTextAlign('center');
    var H5 = (313 + 9) * 2 / this.data.pixelRatio
    ctx.fillText(this.data.packetTitle, this.data.width / 2, H5)

    ctx.draw(true, func => {
      wx.hideLoading()
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        width: this.data.width,
        height: this.data.height,
        success: res => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              wx.showModal({
                content: "图片已经保存到相册了\r\n还不赶紧去发个朋友圈→",
                showCancel: false,
              })
            }
          })
        }
      })
    });
  },
})