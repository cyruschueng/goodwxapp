const app = getApp();
Page({

  data: {
    qrcodeUrl: '/img/qrcode.jpg',
    qrcodeWidth: 73,
    qrcodeHeight: 73,
    qrcodeLeft: 7,
    qrcodeBottom: 6,
    bgUrl: '../../resources/see_sea.png',
    canvasWidth: 300,
    canvasHeight: 400,
    targetName: 'suitable',
    cutHeight: 400,

    appNameWidth: 80,
    appNameHeight: 17,
    appNameBg: 'rgba(0,0,0,.5)',
    appNameText: '微V秀',
    appNameTop: 9,
    appNameRight: 9,

    descText1: '没有你的地方',
    descText2: '去哪都是远方',
    descFontSize: 18,
    descText1Left: 172,
    descText1Bottom: 46,
    descText2Left: 172,
    descText2Bottom: 22,
    descWidth: 145,
    descHeight: 62,
    descLeft: 99,
    descBottom: 11,
    descBg: 'rgba(0,0,0,.26)'
  },

  onLoad: function (options) {
    app.getUserInfo(userInfo => {
      this.setData({
        appNameText: userInfo.nickName
      });
    });
  },

  onShow(){
    let bgUrl = app.globalData[this.data.targetName];
    if (bgUrl) { //如果有裁切的图片，则修改掉
      this.setData({
        bgUrl: bgUrl
      });
      app.globalData[this.data.targetName] = null;
    }
  },

  queryMultipleNodes: function (selector, callback) {
    var query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect(res => {
      //console.log(res);
      typeof callback === 'function' && callback(res);
    }).exec()
  },

  onRepalce(){
    let { targetName, cutHeight } = this.data;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        wx.navigateTo({
          url: `/page/common/wecropper/index?targetName=${targetName}&cutHeight=${cutHeight}&oriImgUrl=${res.tempFilePaths[0]}`,
        })
      }
    })
  },

  onPreview(){
    //获得canvas的宽高
    let self =this;
    wx.showLoading({
      title: '生成中...',
    });
    self.queryMultipleNodes('.preview', res => {
      let { width, height } = res;
      self.setData({
        canvasWidth: width,
        canvasHeight: height
      });
      self.draw();
    });
  },

  draw(){
    let {
      canvasWidth,
      canvasHeight,
      qrcodeUrl,
      qrcodeWidth,
      qrcodeHeight,
      qrcodeLeft,
      qrcodeBottom,
      bgUrl,
      
      appNameWidth,
      appNameHeight,
      appNameBg,
      appNameText,
      appNameTop,
      appNameRight,

      descText1,
      descText2,
      descFontSize,
      descText1Left,
      descText1Bottom,
      descText2Left,
      descText2Bottom,
      descWidth,
      descHeight,
      descLeft,
      descBottom,
      descBg
      
      
    } = this.data;
    let ctx = wx.createCanvasContext('canvas');

    //计算些必须变量
    let appNameLeft = canvasWidth - appNameWidth - appNameRight,
        qrcodeTop = canvasHeight - qrcodeHeight - qrcodeBottom,
        descTop = canvasHeight - descHeight - descBottom,
        descText1Top = canvasHeight - descText1Bottom,
        descText2Top = canvasHeight - descText2Bottom;

    //先清空画布

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    //画背景图片
    ctx.drawImage(bgUrl, 0, 0, canvasWidth, canvasHeight);

    //画标题及色块
    ctx.setFillStyle(appNameBg);
    ctx.setTextAlign('center');
    ctx.fillRect(appNameLeft, appNameTop, appNameWidth, appNameHeight);
    ctx.setFontSize(11);
    ctx.setFillStyle('#ffffff');
    ctx.fillText(appNameText, appNameLeft + appNameWidth/2, appNameTop + 13);

    //画二维码

    ctx.drawImage(qrcodeUrl, qrcodeLeft, qrcodeTop, qrcodeWidth, qrcodeHeight);

    //画描述文字
    ctx.setFillStyle(descBg);
    ctx.fillRect(descLeft, descTop, descWidth, descHeight);
    ctx.setFontSize(descFontSize);
    ctx.setFillStyle('#ffffff');
    ctx.fillText(descText1, descText1Left, descText1Top);
    ctx.fillText(descText2, descText2Left, descText2Top);

    ctx.setLineWidth(1);
    ctx.setStrokeStyle('#7d664f');
    ctx.strokeRect(descLeft-1, descTop-1, descWidth+2, descHeight+2)

    

    ctx.draw();

    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',

        success(res) {
          
          let imgUrl = res.tempFilePath;
          wx.navigateTo({
            url: '/page/common/previewimage/index?url=' + imgUrl
          });
        },

        complete(){
          wx.hideLoading();
        }
      })
    }, 300);

   
  },

  onShareAppMessage() {
    return {
      title: '一起来为微V秀代言吧'
    }
  }
})