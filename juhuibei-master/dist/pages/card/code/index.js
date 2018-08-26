import api from '../../../api/api_v1.js';
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
  },
  temp: [],
  width: '',
  path_bg: '',
  path_code: '',

  onLoad: function () {
    this.getSystemInfo();
  },

  setNavigationBarColor: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF6A7F',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },

  getSystemInfo: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.width = res.screenWidth;
        let height = Math.round(res.screenWidth * 1443 / 1080);
        that.setData({ height: height })
        that.wxCode();
      },
    })
  },

  wxCode: function () {
    var that = this;
    api.wxCode({
      data: {
        scene: 'a=2&b=3',
        page: 'pages/home/index',
        width: 200,
        auto_color: 1
      },
      success: (res) => {
        console.log('wxCode', res);
        if (res.data.res === 0) {
          that.getCodeImage(res.data.data);
        }
      }
    })
  },

  getCodeImage: function (code) {
    let that = this;
    wx.downloadFile({
      url: code,
      success: function (res) {
        if (res.statusCode === 200) {
          that.path_code = res.tempFilePath;
          that.getBgImage();
        }
      }
    });
  },

  getBgImage: function () {
    let that = this;
    wx.downloadFile({
      url: 'https://www.juhuibei.com/images/wx_code/wx_code_bg.jpg',
      success: function (res) {
        if (res.statusCode === 200) {
          that.path_code_bg = res.tempFilePath;
          that.setCanvas();
        }
      }
    });
  },

  setCanvas: function () {
    console.log('setCanvas', this.path_code_bg, this.path_code);
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage(this.path_code_bg, 0, 0, this.width, this.data.height)
    var c_width = (this.width - 60) / 2;
    var c_height = this.data.height - 60 - Math.round(this.data.height * 160 / 1443);
    ctx.drawImage(this.path_code, c_width, c_height, 60, 60);
    // ctx.setFontSize(20)
    // ctx.fillText('文字在这里！！！文字在这里！！！', 0, 300)
    // ctx.fillText('文字在这里！！！', 100, 400)
    ctx.draw();
  },

  generateImage: function () {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.width,
      height: this.data.height,
      destWidth: 1080,
      destHeight: 1443,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log('generateImage', res.tempFilePath)
        that.temp[0] = res.tempFilePath;
        wx.previewImage({
          current: '',
          urls: [res.tempFilePath]
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  preview: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: this.temp
    })
  },
})