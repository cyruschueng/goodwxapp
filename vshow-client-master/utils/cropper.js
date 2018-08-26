class Cropper{
  constructor(){
    let self = this;
    let { windowWidth, windowHeight } = self.getDevice();//默认获取一次系统信息
    self.windowWidth = windowWidth;
    self.windowHeight = windowHeight;
  }

  init(scale, imgUrl){
    let self = this;
    self.scale = scale;
    self.imgUrl = imgUrl;
    let pages = getCurrentPages();
    self.pageCtx = pages[pages.length - 1];  //获得当前页面栈 
    //准备工作
    self.pageCtx.setData({
      windowWidth: self.windowWidth, windowHeight: self.windowHeight
    });

  }

  getDevice(){
    let self = this;
    !self.device && (self.device = wx.getSystemInfoSync());
    return self.device;
  }

  selectImg(){
    wx.chooseImage({
      count: 1,
      success(res) {
        self.imgUrl = res.tempFilePaths[0];
        self.beginDraw();
      }
    })
  }

  beginDraw(){
    
  }
}

module.exports = Cropper;