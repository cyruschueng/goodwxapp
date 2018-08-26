//length给指定的字节数，是否以其他字符强制分割， 最后返回分割后的数组
String.prototype.getBytes = function () {
  let str = this;
  let len = str.length, bytes = len, charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode > 255)
      bytes++
  }
  return bytes;
}



String.prototype._split = function (length, separator) {
  let str = this;
  let arr = null;

  if (str.getBytes() <= length && separator) {   //如果本身长度就不够，则返回本身的数组
    arr = str.split(separator);
    return arr;
  } else if (str.getBytes() <= length && !separator) {
    return [str];
  }

  //以下都是字符的长度，大于指定的长度

  if (separator) {   //如果指定了分隔符
    arr = str.split(separator);
  } else { //没有指定，则把回车替换为空格
    str = str.replace(/\n/g, ' ');
    arr = [str];
  }


  let resArr = [];  // 结果分割数组
  arr.forEach((v, i) => {
    if (v.getBytes() <= length) {
      resArr.push(v);
    } else {
      let charCode = -1, value, curLen = 0, len = v.length, startIndex = 0;
      for (let i = 0; i < len; i++) {
        charCode = v.charCodeAt(i);
        if (charCode >= 0 && charCode <= 255)
          curLen++;
        else
          curLen += 2;

        if (curLen > length) {
          value = v.slice(startIndex, i);
          resArr.push(value);
          startIndex = i;
          charCode > 255 ? (curLen = 2) : (curLen = 1);
        }

        if (i == len - 1 && curLen <= length) {   //循环到最后一个了, 并且没有超过最大的长度时
          value = v.slice(startIndex, i + 1);
          resArr.push(value);
        }
      }
    }
  });

  return resArr;



}

//具体逻辑
//初始化的data
const imgDir = '../../resources';
let { saveFormId } = require('../../../../utils/util.js');

const data = {
  canvasId: 'myCanvas',
  canvasHeight: 1050,
  canvasMinHeight: 1050,
  disabled: false,
  creBtnTxt: '生成图片',
  bgList: [{
    id: 0,
    src: '',
    bgColor: '#ffffff',
    topBanner: null,
    bottomBanner: null,
    active: true   //是否被选中
  }, {
    id: 1,
    src: `${imgDir}/let_thumb_bike.jpg`,
    bgColor: '#ffffff',
    topBanner: null,
    bottomBanner: {
      path: `${imgDir}/let_bg_bike.jpg`,
      width: 750,
      height: 290
    },
    active: false
  }, {
    id: 2,
    src: `${imgDir}/let_thumb_book.jpg`,
    bgColor: '#ffffff',
    topBanner: null,
    bottomBanner: {
      path: `${imgDir}/let_bg_book.jpg`,
      width: 750,
      height: 377
    },
    active: false
  }, {
    id: 3,
    src: `${imgDir}/let_thumb_grand.jpg`,
    bgColor: '#f5e6bf',
    topBanner: {
      path: `${imgDir}/let_bg_grand.jpg`,
      width: 750,
      height: 377
    },
    bottomBanner: null,
    active: false
  }, {
    id: 4,
    src: `${imgDir}/let_thumb_libai.jpg`,
    bgColor: '#ffffff',
    topBanner: null,
    bottomBanner: {
      path: `${imgDir}/let_bg_libai.jpg`,
      width: 750,
      height: 470
    },
    active: false
  }, {
    id: 5,
    src: `${imgDir}/let_thumb_shuijin.jpg`,
    bgColor: '#ffffff',
    topBanner: {
      path: `${imgDir}/let_bg_shuijin.jpg`,
      width: 750,
      height: 470
    },
    bottomBanner: null,
    active: false
  }],

  scrollWidth: 375,
  itemW: 72,
  itemGap: 8
}


class MakeLetter{
  constructor(){
    let self = this;
    const pages = getCurrentPages(); 
    const pageCtx = pages[pages.length - 1];
    pageCtx.makeLetter = self;
    self.pageCtx = pageCtx;
    self.init();
  }

  init(){
    console.log('初始化');
    let self = this;
    self.bgColor = '#ffffff';
    self.topBanner = null;   //宽高url
    self.bottomBanner = null;  //宽高url
    self.bgCache = {}  //背景下载到本地的图片的缓存
    self.isSetImage = false;   //是否正在设置图片缓存
    self.ctx = wx.createCanvasContext('myCanvas');
  }


  setText({title, content}){
    let self = this;
    if (!title || !content) return console.log('标题或文本未填！');
    self.title  = title;
    self.contArr = content._split(42, '\n');  //把content转为数组


    let topBannerHeight = self.topBanner ? self.topBanner.height: 200;
    let bottomBannerHeight = self.bottomBanner ? self.bottomBanner.height : 200;
    let canvasHeight = topBannerHeight + bottomBannerHeight + 100 + 50 * self.contArr.length;
    canvasHeight < 1050 && (canvasHeight = 1050);
    self.pageCtx.setData({
      canvasHeight
    });
    self.canvasHeight = canvasHeight;
    setTimeout(()=>{
      self.draw();
    }, 500);
    

  }

  setBg({ bgColor, topBanner, bottomBanner }){   //设置信的背景图片及背景色
    let self = this;
    self.bottomBanner = bottomBanner;
    self.topBanner = topBanner;
    self.bgColor = bgColor;
    
    console.log(self.topBanner, self.bottomBanner);
  }


  draw(){
    let self = this;
    //清空canvas
    let ctx = self.ctx;
    ctx.clearRect(0, 0, 750, self.canvasHeight);
    ctx.setFillStyle(self.bgColor);  //设置背景色
    //画背景图片等
    let contX, contY, mul;
    console.log(self.topBanner, self.bottomBanner);
    if (!self.topBanner && !self.bottomBanner){
      console.log('没有背景图');
      ctx.fillRect(0, 0, 750, self.canvasHeight);
      ctx.setFillStyle('#1b1d1a');
      ctx.setFontSize(28);

      //画标题

      ctx.setTextAlign('center');
      ctx.fillText(self.title, 375, 200);

      //画内容
      ctx.setTextAlign('left');

      contX = 80, contY = 265, mul = 50;

    } else if (self.topBanner && self.bottomBanner){
      console.log('都有背景图');
      ctx.drawImage(self.topBanner.path, 0, 0, 750, self.topBanner.height);
      ctx.drawImage(self.bottomBanner.path, 0, self.canvasHeight - self.bottomBanner.height, 750, self.bottomBanner.height);
      ctx.fillRect(0, self.canvasHeight - self.topBanner.height, 750, self.canvasHeight - self.bottomBanner.height - self.topBanner.height);

      ctx.setFillStyle('#1b1d1a');
      ctx.setFontSize(28);
      ctx.setTextAlign('center');
      ctx.fillText(self.title, 375, self.topBanner.height);
      ctx.setTextAlign('left');
      contX = 80, contY = self.topBanner.height + 100, mul = 50;


    } else if (self.topBanner){
      console.log('只有上面背景图');
      console.log(self.topBanner)
      ctx.drawImage(self.topBanner.path, 0, 0, 750, self.topBanner.height);
      ctx.fillRect(0, self.topBanner.height, 750, self.canvasHeight - self.topBanner.height); 
      
      ctx.setFillStyle('#1b1d1a');
      ctx.setFontSize(28);
      ctx.setTextAlign('center');
      ctx.fillText(self.title, 375, self.topBanner.height);
      ctx.setTextAlign('left');
      contX = 80, contY = self.topBanner.height + 100, mul = 50;

    } else if (self.bottomBanner){
      console.log('只有下面背景图');
      ctx.drawImage(self.bottomBanner.path, 0, self.canvasHeight - self.bottomBanner.height, 750, self.bottomBanner.height);
      ctx.fillRect(0, 0, 750, self.canvasHeight - self.bottomBanner.height);

      ctx.setFillStyle('#1b1d1a');
      ctx.setFontSize(28);
      ctx.setTextAlign('center');
      ctx.fillText(self.title, 375, 200);
      ctx.setTextAlign('left');
      contX = 80, contY = 265, mul = 50;
    }

    self.contArr.forEach((v, i) => {
      ctx.fillText(v, contX, contY + mul*i);
    });
    ctx.draw();
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success(res) {
          let imgUrl = res.tempFilePath;
          self.pageCtx.setData({
            disabled: false,
            creBtnTxt: '生成图片'
          });
          wx.navigateTo({
            url: '../../../common/previewimage/index?url=' + imgUrl
          })

        }
      })
    },300);
    



  }
  
}




Page({
  data,

  onLoad(){
    let self = this;

    let { bgList, itemW, itemGap } = self.data;
    let len = bgList.length;
    let scrollWidth = len*(itemW + itemGap)-itemGap;
    self.setData({
      scrollWidth
    });
    new MakeLetter();

  },

  creImg(e){
    let self = this;
    let { title, content } = e.detail.value;
    title = title.trim();
    content = content.trim();
    let { formId } = e.detail;
    //saveFormId(formId);
    //console.log(e.detail.value);
    if(!title) return wx.showToast({title: '请输入标题'});
    if(!content) return wx.showToast({ title: '请输入内容' });
    self.setData({
      disabled: true,
      creBtnTxt: '生成中...'
    });
    self.makeLetter.setText({title, content});




  },

  selectBg: function(){  //选择背景
    let preIndex = 0;  //第一个选中样式,初始化为第一个，要和data中设置同步， 用到了闭包
    return function (e){
      let { index } = e.currentTarget.dataset;
      let that = this;
      let { bgList } = that.data;
      bgList[preIndex].active = false;
      bgList[index].active = true;
      that.setData({
        bgList
      });

      that.makeLetter.setBg(bgList[index]);
      preIndex = index;  //执行完毕，更新索引上一个为这个
    }

  }(),

  onShareAppMessage() {
    return {
      title: '一起制作书信吧'
    }
  }
})
