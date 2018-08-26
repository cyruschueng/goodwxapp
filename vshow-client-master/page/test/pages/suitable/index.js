let { imgDirUrl } = require('../../../../config.js');
const app = getApp();
Page({
  data: {
    canvasLeft: 0,
    canvasTop: 0,
    canvasWidth: 300,
    canvasHeight: 300,
    maxCanvasWidth: 300,
    maxCanvasHeight: 300,
    avatarUrl: '/img/test_bg.png',
    qrcodeUrl: `${imgDirUrl}/test_qrcode.png`,
    tipsText: '这个头像合适么',
    targetName: 'suitable',
    cutHeight: 400,

    tipsTextList: ['这个头像合适么', '这件衣服合适么', '这个发型合适么', '你觉得我合适么'],
    themeList: ['换个文字', '换个图片(1:1)', '换个图片(4:3)'],

    sliderInfo: { //滑块的信息
      right: 0,
      bottom: 0,
      sliderWidth: 237,
      sliderHeight: 59,
      textGapX: 8,
      textGapY: 38,
      qrcodeGapX: 181,
      qrcodeGapY: 6,
      qrcodeWidth: 50,
      qrcodeHeight: 50

    },
    
  },

  onLoad(){
    this.setCanvasProps();
  },

  getDevice(){
    !this.data.device && (this.setData({
      device: wx.getSystemInfoSync()
    }));

    return this.data.device;
  },

  setCanvasProps(){
    let { cutHeight } = this.data;
    let { windowWidth } = this.getDevice();

    switch (cutHeight) {
      case 300: {
        return this.setData({
          canvasWidth: windowWidth - 20,
          canvasHeight: windowWidth - 20
        });
      }

      case 400: {
        return this.setData({
          canvasWidth: windowWidth - 20,
          canvasHeight: (windowWidth - 20) * 4 / 3
        });
      }
    }
  },

  onSelectImage(){
    let self = this,
      { targetName, cutHeight} = this.data;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function(res) {
        let tempFilePath = res.tempFilePaths[0];
        //裁切图片
        wx.navigateTo({
          url: `/page/common/wecropper/index?targetName=${targetName}&cutHeight=${cutHeight}&oriImgUrl=${tempFilePath}`,
        });return;
        wx.getImageInfo({
          src: tempFilePath,
          success(res){
            //console.log(res);
            let { width, height } = res,
                resultWidth, resultHeight;
            let { maxCanvasWidth, maxCanvasHeight } = self.data;

            /*
              目标： 使其长和宽均不能超过300
              1. 比较长和宽，选出较长的一边，以它为参照
              2. 计算出缩放后的另一边
            */
            if (width > height){ //宽大于高
              if (width > maxCanvasWidth) {
                resultWidth = maxCanvasWidth;
              } else {
                resultWidth = width;
              }
              resultHeight = Number.parseInt(resultWidth * height / width);
              
            } else if (width < height) { //宽小于高
              if (height > maxCanvasHeight) {
                resultHeight = maxCanvasHeight;
              } else {
                resultHeight = height;
              }
              resultWidth = Number.parseInt(resultHeight * width / height);
            } else { //宽等于高
              resultWidth = maxCanvasWidth;
              resultHeight = maxCanvasHeight;
            }
            


            self.setData({
              avatarUrl: tempFilePath,
              canvasWidth: resultWidth,
              canvasHeight: resultHeight
            });
          }
        })
        
        
        
      }
    })
  },

  queryMultipleNodes: function (selector, callback) {
    var query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect(res => {
      //console.log(res);
      typeof callback === 'function' && callback(res);
    }).exec()
  },

  onShow(){
    let avatarUrl = app.globalData[this.data.targetName];
    if (avatarUrl){ //如果有裁切的图片，则修改掉
      this.setData({
        avatarUrl: avatarUrl
      });
      this.setCanvasProps();
      app.globalData[this.data.targetName] = null;
    }
  },

  onReplace(){  //更换主题时
    let self = this;
    let { tipsTextList, themeList, tipsText } = self.data;
    wx.showActionSheet({
      itemList: themeList,
      success(res){
        switch(res.tapIndex){
          case 0: //更改文字
            let nextIndex = (tipsTextList.indexOf(tipsText) + 1) % tipsTextList.length;
            let resultText = tipsTextList[nextIndex];
            self.setData({
              tipsText: resultText
            });
          break;

          case 1: //更换图片 1:1
            self.setData({
              cutHeight: 300
            });
            self.onSelectImage();
          break;

          case 2: //更换图片 4:3
            self.setData({
              cutHeight: 400
            });
            self.onSelectImage();
          break;


        }
      }
    })
  },

  onPreview(){
    this.draw();
  },

  draw(){ //canvas画图
    let self = this,
      movableViewX,
      movableViewY;
      wx.showLoading({
        title: '生成中...',
      })
    let { 
      avatarUrl,
      qrcodeUrl,
      canvasWidth,
      canvasHeight,
      tipsText,
      sliderInfo: {
        sliderWidth,
        sliderHeight,
        textGapX,
        textGapY,
        qrcodeGapX,
        qrcodeGapY,
        qrcodeWidth,
        qrcodeHeight
      }
            
    } = self.data;
      
    /**
     * 计算出外围card的top and left值
     * 计算出滑块的top and left值
     * 算出滑块的x，y坐标
     */
    

    self.queryMultipleNodes('.movable-area', nodeInfo => {
      let movableAreaTop = nodeInfo.top;
      let movableAreaLeft = nodeInfo.left;

      self.queryMultipleNodes('.movable-view', extNodeInfo => {
        let movableViewTop = extNodeInfo.top;
        let movableViewLeft = extNodeInfo.left;

        movableViewY = movableViewTop - movableAreaTop;
        movableViewX = movableViewLeft - movableAreaLeft;
        if (/http/.test(qrcodeUrl)) {
          wx.downloadFile({
            url: qrcodeUrl,
            success(res) {
              qrcodeUrl = res.tempFilePath;
              self.setData({
                qrcodeUrl: qrcodeUrl
              });
              draw();
            },
            fail() {
              draw();
            }
          })
        } else {
          draw();
        }
      });

    });
    
    

    function draw(){
      let ctx = wx.createCanvasContext('canvas');

      //先清空画布

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      //画背景图片
      ctx.drawImage(avatarUrl, 0, 0, canvasWidth, canvasHeight );

      //画半透明方块
      ctx.setFillStyle('rgba(0, 0, 0, .46)');
      ctx.fillRect(movableViewX, movableViewY, sliderWidth, sliderHeight);
      
      //画文字
      ctx.setFontSize(23);
      ctx.setFillStyle('#ffffff');
      ctx.fillText(tipsText, movableViewX + textGapX, movableViewY + textGapY);

      //画二维码

      ctx.drawImage(qrcodeUrl, movableViewX + qrcodeGapX, movableViewY + qrcodeGapY, qrcodeWidth, qrcodeHeight);

      ctx.draw();

      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success(res) {
            let imgUrl = res.tempFilePath;
            wx.navigateTo({
              url: '/page/common/previewimage/index?url=' + imgUrl,
            })
            /*wx.previewImage({
              urls: [imgUrl],
            })*/
          },
          complete(){
            wx.hideLoading();
          }
        })
      }, 300);

      
    }
    
  }

})