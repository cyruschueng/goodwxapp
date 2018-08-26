const app = getApp();
Page({

  data: {
    bannerUrl: '../../resources/makemotto.png',
    qrcodeUrl: '/img/qrcode.jpg',
    iconQuotesUrl: '../../resources/icon_quotes.png',

    motto: '【美文共享】别再最美的年华，辜负最好的自己',
    mottoSource: '美文共享',
    creTime: '2018-02-27',

    bannerTarget: 'bannerPath',
    qrcodeTarget: 'qrcodePath',

    canvasWidth: 665,
    canvasHeight: 1072
  },

  onLoad(options) {
  
  },

  onShow(){
    let bannerTarget = app.globalData[this.data.bannerTarget];
    let qrcodeTarget = app.globalData[this.data.qrcodeTarget];
    if (bannerTarget) { //如果有裁切的图片，则修改掉
      this.setData({
        bannerUrl: bannerTarget
      });
      app.globalData[this.data.bannerTarget] = null;
    }
    if (qrcodeTarget) { //如果有裁切的图片，则修改掉
      this.setData({
        qrcodeUrl: qrcodeTarget
      });
      app.globalData[this.data.qrcodeTarget] = null;
    }
  },

  onTapBanner(){  //更换banner
    let { bannerTarget }  = this.data;
    let self = this;
    wx.showModal({
      content: '是否替换banner图？',
      success(res){
        if(res.confirm){
          self.chooseImage(tempFilePath => {
            wx.navigateTo({
              url: `/plugins/wecropper/index?targetName=${bannerTarget}&oriImgUrl=${tempFilePath}`,
            })
          });
        }
      }
    });
    
  },

  onTapQrcode(){  //更换二维码
    let { qrcodeTarget } = this.data;
    let self = this;
    wx.showModal({
      content: '是否替换二维码？',
      success(res) {
        if (res.confirm) {
          self.chooseImage(tempFilePath => {
            wx.navigateTo({
              url: `/plugins/wecropper/index?targetName=${qrcodeTarget}&oriImgUrl=${tempFilePath}`,
            })
          });
        }
      }
    });
    
  },

  creImage(){  //生成图片
    this.draw();
  },

  draw(){  //canvas画图
    let {
      bannerUrl,
      qrcodeUrl,
      iconQuotesUrl,
      motto,
      mottoSource,
      creTime,
      canvasWidth,
      canvasHeight
    }  = this.data;

    let ctx = wx.createCanvasContext('canvas');

    // 初始化canvas画布
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);


    //画banner图
    ctx.drawImage(bannerUrl, 8, 8, canvasWidth - 16, canvasWidth - 16);

    ctx.draw();
  },

  chooseImage(fn){
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        typeof fn === 'function' && fn(res.tempFilePaths[0]);
      },
    })
  },

  onShareAppMessage() {
    return{
      title: '一起制作美图佳句吧'
    }
  }
})