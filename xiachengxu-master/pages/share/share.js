// pages/share/share.js
import { savePicToAlbum } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  _loadData() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        });
      }
    });
    this.createNewImage();
  },
  createNewImage() {
    let that = this;
    let ctx = wx.createCanvasContext('myCanvas');
    var refWidth = this.data.windowWidth - 30;
    var refHeight = this.data.windowHeight - 150;
    wx.getImageInfo({
      src: '../../images/mock/0001.jpg',
      success: res => {
        var width = refWidth;
        var height = res.height * width / res.width;
        // 如果计算出的等比例高度大于设定的高度，则取比例为设定高度
        if (height > refHeight) {
          height = refHeight;
          width = res.width * height / res.height;
        }
        that.setData({
          canvasHeight: height + 100 + 'px'
        });
        this.drawSquare(ctx, height + 100);
        ctx.drawImage('../../images/mock/0001.jpg', 15, 15, width, height);
        ctx.setFontSize(16);
        ctx.setFillStyle('#ffffff');
        ctx.fillText('叮当小店', 15, height + 70);
        ctx.drawImage('../../images/icon/wechat.jpg', this.data.windowWidth - 65, height + 45, 50, 50);


        /**
         * 将绘图画到canvas中
         */
        ctx.draw();
      }
    })

  },
  drawSquare(ctx, height) {
    ctx.rect(0, 0, this.data.windowWidth, height);
    ctx.setFillStyle("#212121");
    ctx.fill();
  },
  savePicture() {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth - 30,
      height: that.data.canvasHeight,
      canvasId: 'myCanvas',
      success: function (res) {
        savePicToAlbum(res.tempFilePath)
      }
    })
  }

})