// pages/photo/page/makeword/index.js
const colors = [
  '#000000', '#ffffff', '#888888', '#49bda8', '#ff0000', '#ff7d00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#f70487', '#fa4589'
];
let bgColors = colors.slice().reverse(), colorLumpNum = colors.length;

const canvas = {
  init(pageCtx){ 
    let self = this;
    let { windowWidth, windowHeight} = self.getDevice();
    pageCtx.setData({
      winW: windowWidth, winH: windowHeight
    });
    self.pageCtx = pageCtx;
    self.word = '下方输入展示文字';
    self.color = '#ffffff';
    self.bgColor = '#49bda8';
    self.fontSize = 20;
    self.start();
  },

  getDevice(){
    let self = this;
    !self.device && (self.device = wx.getSystemInfoSync());
    return self.device;
  },

  setParams(params){  //设置一些参数
    let self = this;
    if (typeof params !== 'object') return console.error('必须为对象形式');
    Object.assign(self, params);
    self.start();
  },

  start(){
    let self = this;
    let { word, color, bgColor, fontSize } = self;
    let { windowWidth, windowHeight } = self.getDevice();
    const ctx = wx.createCanvasContext('canvas');
    ctx.setFillStyle(bgColor);  //设置背景色
    ctx.fillRect(0, 0, windowWidth, windowWidth); //填充背景色

    ctx.setFillStyle(color);  //设置文字色
    ctx.setFontSize(fontSize);  //设置文字大小
    ctx.setTextAlign('center')  //设置文字中心对齐
    ctx.fillText(word, windowWidth / 2, (windowWidth + fontSize)/2)  //设置文字位置和内容
    ctx.draw();
  }
};
Page({
  data: {
    colors,
    bgColors,
    colorLumpNum,
    disabled: false,
    btnText: '生成图片'
  },

  onLoad(){
    let self = this;
    canvas.init(this);
    self.init();
  },

  init(){
    //做一些初始化动作
    let self = this;
    
  },

  bindinput(e){
    let { value } = e.detail;
    value = value.trim();
    let params = {
      word: value
    };
    canvas.setParams(params);
  },

  sliderChange(e){
    //console.log(e);
    let { value } = e.detail;
    let params = {
      fontSize: value
    };
    canvas.setParams(params);
  },

  creImg(){
    let self = this;
    self.setData({
      disabled: true,
      btnText: '生成中...'
    });
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success(res){
        let url = res.tempFilePath;
        wx.navigateTo({
          url: '../../../common/previewimage/index?url=' + url
        })
      },

      fail(){
        wx.showToast({
          title: '生成失败',
        })
      },

      complete(){
        self.setData({
          disabled: false,
          btnText: '生成图片'
        });
      }
    })
  },

  preImg(url){
    wx.previewImage({
      urls: [url],
    })
  },

  selColor(e){
    let self = this, params;
    let { name, index } = e.currentTarget.dataset;
    let { colors, bgColors } = self.data;
    switch(name){
      case 'color':   //设置文字颜色
        params = {
          color: colors[index]
        };
        canvas.setParams(params);
      break;

      case 'bgColor':  //设置背景颜色
        params = {
          bgColor: bgColors[index]
        };
        canvas.setParams(params);
      break;

      default:

      break;
    }
  },

  onShareAppMessage() {
    return {
      title: '一起制作文字转图吧'
    }
  }
})