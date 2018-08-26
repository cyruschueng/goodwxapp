// pages/photo/page/make/make.js
let { showTips, saveFormId } = require('../../../../utils/util');
const imgRootPath = '/page/photo/resources';
let canvas = {
  data: {
    iconAddPath: imgRootPath + '/icon_add_green.png',
    iconRemovePath: imgRootPath + '/icon_remove_green.png',
    iconRefreshPath: imgRootPath + '/icon_refresh_green.png',
    ctx: null,     //canvas上下文
    curPage: null,     //Page
    curBarrageIndex: 0,   //当前字幕的索引
    oImg: { path: '../../resources/upload_pic.png', width: 32, height: 32},     //背景图片等信息： 宽高，临时路径
    lightColors: [{ index: 2, color: '#000000' }, { index: 22, color: '#000000' }, { index: 22, color: '#000000' }],
    barrages: ['']   //字幕数组， 最大十个
  },

  init(that){
    let self = this;
    const ctx = wx.createCanvasContext('myCanvas');
    Object.assign(self.data, { ctx, curPage: that});
    self.changeBarrage();
  },

  setData(oImg, barrage){
    let self = this;
    let {curBarrageIndex, barrages} = self.data;
    oImg && (self.data.oImg = oImg);
    barrage !== undefined && (self.data.barrages[curBarrageIndex] = barrage);

    self.begin();
  },

  begin(){
    let self = this;
    let {ctx, oImg, barrages, yCoords, rowItemNum, randoms, lightColors} = self.data;
    let resWidth, resHeight;
    ctx.clearRect(0, 0, 375, 250);  //重置画布内容
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 375, 250);
    let {width, height, path} = oImg;
    let prop = width / height; //宽/高比例， 1.5显示
    //开始画背景图
    if (!/upload_pic/.test(path)){   //图片存在才进行画图
      
      //console.log(prop);
      if (prop < 1.5) {   //竖屏的照片
        console.log('情况一');
        resWidth = Number.parseInt(250 * prop);
        resHeight = 250;
        let x = (375 - resWidth) / 2;
        ctx.drawImage(path, x, 0, resWidth, resHeight);
      } else if (prop > 1.5) {//接近于宽屏
        console.log('情况二');
        resWidth = 375;
        resHeight = Number.parseInt(375 / prop);
        ctx.drawImage(path, 0, (250 - resHeight) / 2, resWidth, resHeight);
        
      } else {   //正好
        console.log('情况三');

        ctx.drawImage(path, 0, 0, 375, 250);
      }
    } else{
      ctx.drawImage(path, 171, 109, width, height);
    }

    //开始画文字

    if (barrages[0]){
      let bLen = barrages.length;  //4
      let bTexts = [];
      let xCoords = [];
      for (let i = 0; i < 30; i++) {
        let _i = i % bLen;
        bTexts.push(barrages[_i]);
      }
      ctx.setFontSize(12);
      ctx.setFillStyle('#ffffff');

      //计算x轴
      let nextTextX = 0;
      let preY = 0; //上一个的y轴坐标，是否为同一行 

      yCoords.forEach((v, i)=>{
        let x;
        if (lightColors[0].index == i){
          ctx.setFillStyle(lightColors[0].color);
        } else if (lightColors[1].index == i){
          ctx.setFillStyle(lightColors[1].color);
        } else if (lightColors[2].index == i) {
          ctx.setFillStyle(lightColors[2].color);
        }
        if (i == 0) {
          x = Number.parseInt(randoms[i] * 100)-50;
          nextTextX = x + self.getLength(bTexts[i]) + Number.parseInt(randoms[i] * 40) + 10;
          
        } else {
          x = nextTextX;
          if (v === yCoords[i+1]) {
            nextTextX = x + self.getLength(bTexts[i]) + Number.parseInt(randoms[i] * 40) + 10;
            //console.log(nextTextX);
          }else{
            nextTextX = Number.parseInt(randoms[i] * 100) - 50;
          }
        }
        
        preY = v;
        ctx.fillText(bTexts[i], x, v);
        if (lightColors[0].index == i) {
          ctx.setFillStyle('#ffffff');
        } else if (lightColors[1].index == i) {
          ctx.setFillStyle('#ffffff');
        } else if (lightColors[2].index == i) {
          ctx.setFillStyle('#ffffff');
        }
      });
      
    }

    ctx.draw();
  },

  getLength(str){
    //console.log(str)
    let realLength = 0, len = str.length, charCode = -1;
    for (let i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128)
        realLength += 1;
      else
        realLength += 2;
    }
    return realLength*6;
  },

  fillText(ctx){
    let self = this;
    ctx.setFontSize(12);
    ctx.setFillStyle('#000000');
    ctx.setTextAlign('left');
    ctx.fillText('textAlign=center', 0, 80)
  },

  addBarrage() {
    let self = this;
    let {curPage, barrages, curBarrageIndex} = self.data;
    if (barrages.length>=30) return;
    self.data.curBarrageIndex++;
    curBarrageIndex++;
    barrages.push('');
    //console.log(barrages);
    curPage.setData({
      barrages, curBarrageIndex, isFocus: true
    });
  },

  delBarrage() {
    let self = this;
    let {curPage, barrages, curBarrageIndex} = self.data;
    let bLen = barrages.length;
    if (bLen<2) return;
    barrages.splice(curBarrageIndex,1);
    if (bLen - 1 == curBarrageIndex){
      self.data.curBarrageIndex--;
      curBarrageIndex--;
      curPage.setData({
        curBarrageIndex
      });
    }
    curPage.setData({
      barrages
    });
    self.begin();
  },

  preBarrage(){
    let self = this;
    let {curPage, barrages, curBarrageIndex} = self.data;
    if (curBarrageIndex <1) return;
    //console.log(curBarrageIndex);
    self.data.curBarrageIndex--;
    curBarrageIndex--;
    curPage.setData({
      curBarrageIndex, barrages
    });
  },

  nextBarrage() {
    let self = this;
    let {curPage, barrages, curBarrageIndex} = self.data;
    if (curBarrageIndex >= barrages.length-1) return;
    console.log(curBarrageIndex);
    self.data.curBarrageIndex++;
    curBarrageIndex++
    curPage.setData({
      curBarrageIndex, barrages
    });
  },

  changeBarrage() {
    let self = this;
    let {barrages} = self.data;
    let bLen = barrages.length;  //4
    let limitY = [];
    let yCoords = [];
    //计算每个的y轴坐标
    for(let i = 0; i< 11; i++){   //算每一行文字的y坐标
      
      if(i == 0){
        limitY.push(10);
      }else{
        let value = limitY[i-1] + 17;
        limitY.push(value);
      }
    }
    //每行的个数
    let rowItemNums = [2, 3, 4, 5];
    let rowItemNum = [];//数组和为30；
    for (let i = 0; i < 6; i++){
      let rowItemNumIndex = Math.floor(Math.random() * 4);
      rowItemNum.push(rowItemNums[rowItemNumIndex]);
    }
    let total = 0;
    rowItemNum.forEach(v=> {
      total += v;
    });
    let extNum = 30-total;
    let extInt = Number.parseInt(extNum / 4);
    let extF = extNum % 4;
    if (extNum > 0) {
      for (let j = 0; j < extInt; j++) {
        rowItemNum.push(4);
      }
      if (extF > 0) {
        rowItemNum.push(extF);
      }
    }
    
   // console.log(rowItemNum.length);   //[4, 5, 4, 2, 5, 2, 4, 4]   行数和每行的个数
    let ys = [];
    for (let i = 0; i < rowItemNum.length; i++) {  
      for (let j = 0; j < rowItemNum[i]; j++){
        ys.push(limitY[i]);
      }
    }
    let randoms = [];   //随机数
    let lightColors = [];
    let ran1 = Number.parseInt(Math.floor(Math.random()*31));
    let ran2= Number.parseInt(Math.floor(Math.random() * 31));
    let ran3 = Number.parseInt(Math.floor(Math.random() * 31));
    let colors = ['#ff0202', '#ff02bb', '#2002ff', '#02f0ff', '#14ff02', '#ffd202', '#ff029d'];
    ys.forEach((v, i)=> {
      ran1 == i && (lightColors.push({index: i, color: colors[Math.floor(Math.random()*8)]}));
      ran2 == i && (lightColors.push({ index: i, color: colors[Math.floor(Math.random() * 8)] }));
      ran3 == i && (lightColors.push({ index: i, color: colors[Math.floor(Math.random() * 8)] }));
      randoms.push(Math.random());
      yCoords[i]= v;
    });
    //计算每个的x轴的随机间隔


    //console.log(yCoords); 
    Object.assign(self.data, { yCoords, rowItemNum, randoms, lightColors});
    self.begin();
  }
}
Page({
  data: {
    curBarrageIndex: 0,
    barrages: [''],
    photoUrl: '',
    isFocus: false,
    disabled: false,
    creText: '生成图片'
  },
  addPhoto(){
    let self = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        let tempFilePath = res.tempFilePaths[0];
        self.setData({
          photoUrl: res.tempFilePaths[0]
        });
        wx.getImageInfo({
          src: tempFilePath,
          success(res){
            //console.log(res);
            canvas.setData(res);
          }
        })
      },
    });
  },

  editBarrage(e){
    let {value} = e.detail;
    //console.log(value);
    canvas.setData(false, value);
  },

  addBarrage(){
    canvas.addBarrage();
  },

  delBarrage() {
    canvas.delBarrage();
  },

  preBarrage() {
    canvas.preBarrage();
  },

  nextBarrage() {
    canvas.nextBarrage();
  },

  creImg(e){
    let self = this;
    let { photoUrl } = self.data;
    let { formId } = e.detail;
    //saveFormId(formId);  发送formId
    if(!photoUrl) return showTips('请先添加背景图片', false, 'loading');
    self.setData({
      disabled: true,
      creText: '生成中...'
    });
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      destWidth: 750,
      destHeight: 500,
      success(res) {
        let imgUrl = res.tempFilePath;
        wx.navigateTo({
          url: '../../../common/previewimage/index?url=' + imgUrl
        })
      },

      complete(){
        self.setData({
          disabled: false,
          creText: '生成图片'
        });
      }
    });
    
  },

  changeBarrage(){
    canvas.changeBarrage();
  },

  onLoad(params){
    let {title} = params;
    wx.setNavigationBarTitle({
      title,
    })
    canvas.init(this);   //canvas的初始化
  },

  onShareAppMessage() {
    return {
      title: '一起制作弹幕吧'
    }
  }
})