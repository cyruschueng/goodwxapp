
/*
    author:  Wangyuda
    data: 2017/11/8
    api:


 */



class Map{
  constructor(params){
    let self = this;
    
    const pages = getCurrentPages();
    // 获取当前页面栈
    const pageCtx = pages[pages.length - 1];
    // 把this依附在page上下文的map属性上，以便在page钩子函数上访问
    pageCtx.map = self;
    self.init();
  }

  getDevice(){
    let self = this;
    !self.device && (self.device = wx.getSystemInfoSync());
    return self.device;
  }

  init(){

  }

  tapMap(){
    
  }
}


module.exports = Map;