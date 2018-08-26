// pages/test/test.js
const app = getApp();
const common = require('../../js/common.js');
var that = '';
var winH = app.globalData.phoneInfo.windowHeight;
var winW = app.globalData.phoneInfo.windowWidth;
var imgW = winW;
var imgH = winH;
var qrCodeW = 150;
var headW = 54;
Page({
  data: {
    avatar: '',
    qrCode: '',    // 二维码
    aid: '',
    imgDir: "",
    canvasId:"myCanvas",
    bgImg:"../../image/bg_red.png",
    shareImg:"",
    headW:54
  },
  onLoad: function (options) {
    that = this;
    that.setData({
      imgDir: app.globalData.imgDir,
      aid: options.aid ? options.aid : 2,
      qrCode: options.poster
    })
    console.log(options);
  },
  onReady: function () {

  },
  onShow: function () {
    that.setData({ avatar: app.globalData.userInfo ? app.globalData.userInfo.avatarUrl : '' })
    let _DATA = {
      path: "pages/share/share?aid=" + that.data.aid
    }
    let params = {
      _C: 'Code2d',
      _A: 'get',
      _DATA: JSON.stringify(_DATA)
    }
    wx.showLoading({
      title: '加载中...',
    })
    common.request("getqrCode", that, "form", params);
    wx.showShareMenu({
      withShareTicket: true
    })
    
  },
  onShareAppMessage: function (ret) {
    return {
      title: "share海报拼图",
      path: "/pages/beginPuzzles/beginPuzzles?aid=" + that.data.aid,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {       // 将encryptedData、iv传给后台解密=>获取群id
            console.log("share界面转发成功：");
            console.log(res);
          },
          fail: function (res) {
            console.log("share界面转发失败：");
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log("share转发失败，来自：" + ret.from);
        console.log(res);
      }
    }
  },
  urlTarget: function (e) {
    const name = e.currentTarget.dataset.url;
    common.urlTarget(name, "", "?aid=" + that.data.aid);
  },
  onSuccess: function (methodName, res) {
    console.log(methodName);
    if (res.statusCode == 200) {
      let ret = res.data;
      if (ret.code == 200) {
        let data = ret.data;
        switch (methodName) {
          case 'getqrCode':   // 获取二维码
            let qrCodeSrc = that.data.imgDir + data.info.pic;
            that.setData({ qrCode: qrCodeSrc });
            wx.hideLoading();
            that.canvasOne("bgred", that.data.bgImg);
            break;
        }

      } else {
        common.showErrorTip(ret.msg);
      }
    } else {
      console.log("接口有问题：" + methodName);
    }
  },
  onFail: function (methodName) {
    wx.hideLoading();
    console.log("接口调用失败：" + methodName);
  },
  onComplete: function (methodName) {

  },
  generateShareImg: function () {
    that.previewImg();
  },
  previewImg: function () {
    var arrUrl = [];
    arrUrl[0] = that.data.shareImg; // qrCode
    wx.previewImage({
      current: that.data.shareImg,
      urls: arrUrl,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  canvasOne:function(imgName,imgSrc){       // 得到红包背景宽高
    wx.getImageInfo({
      src: imgSrc,
      success:function(res){
        console.log(imgName);
        console.log(res);
        switch (imgName){
          case "bgred":
            let ratio = res.width / winW;    
            imgH = res.height / ratio;
            that.canvasOne("qrCode",that.data.qrCode);
            break;
          case "qrCode":
            that.canvasOne("avatar", that.data.avatar);
            that.setData({ qrCode: res.path});  
            console.log("原头像：" + that.data.avatar);
            break;  
          case "avatar":
            that.setData({ avatar: res.path });
            that.canvasTwo();
            break;    
        }

      }
    })   

  },
  canvasTwo00: function () {    // 原来的画图片和文字
    console.log("imgW:" + imgW + ",imgH:" + imgH);
    const ctx = wx.createCanvasContext(that.data.canvasId, this);
    ctx.drawImage(that.data.bgImg, 0, 0, imgW, imgH);
    ctx.drawImage(that.data.qrCode, imgW / 2 - qrCodeW/2, imgH / 2 - qrCodeW/2, qrCodeW, qrCodeW); 
    ctx.drawImage(that.data.avatar, imgW / 2 - headW / 2, 10, headW, headW); 
    ctx.setFontSize(14);
    ctx.setFillStyle("white");
    ctx.setTextAlign("center");
    ctx.fillText(app.globalData.userInfo.nickName + "发了一个海报拼图", winW/2, headW+40);
    ctx.save();

    // ctx.restore();
    // Draw arc
    // ctx.beginPath()
    // ctx.arc(imgW / 2, imgH / 2, qrCodeW / 2, 0, 2 * Math.PI)
    // ctx.setStrokeStyle('#fff000')
    // ctx.stroke()

    ctx.draw();
    setTimeout(function(){
      that.canvasThree();
    },500)    
  },
  canvasTwo: function () {    // 画图片和文字
    console.log("imgW:" + imgW + ",imgH:" + imgH);
    const ctx = wx.createCanvasContext(that.data.canvasId, this);
    ctx.drawImage(that.data.bgImg, 0, 0, imgW, imgH);
    //ctx.drawImage(that.data.qrCode, imgW / 2 - qrCodeW / 2, imgH / 2 - qrCodeW / 2, qrCodeW, qrCodeW);
    ctx.drawImage(that.data.avatar, imgW / 2 - headW / 2, 10, headW, headW);
    ctx.setFontSize(14);
    ctx.setFillStyle("white");
    ctx.setTextAlign("center");
    ctx.fillText(app.globalData.userInfo.nickName + "发了一个海报拼图", winW / 2, headW + 40);
    ctx.save();   // 保存原有画布

    ctx.beginPath()
    ctx.arc(imgW / 2, imgH / 2, qrCodeW / 2, 0, 2 * Math.PI)
    ctx.clip();   // 裁剪画布区域（二维码大小）
    ctx.drawImage(that.data.qrCode, imgW / 2 - qrCodeW / 2, imgH / 2 - qrCodeW / 2, qrCodeW, qrCodeW);

    ctx.restore();  // 恢复原有画布
    ctx.save();
    ctx.beginPath();
    ctx.arc(imgW / 2, headW / 2 + 10, headW / 2, 0, 2 * Math.PI)    // 黄色圆圈
    ctx.clip();
    ctx.drawImage(that.data.avatar, imgW / 2 - headW / 2, 10, headW, headW);
    // ctx.setStrokeStyle('#fff000')
    // ctx.stroke()
    ctx.restore();

    ctx.draw();
    setTimeout(function () {
      that.canvasThree();
    }, 500)
  },
  canvasThree: function () {     // 导出最终二维码分享图
    wx.canvasToTempFilePath({
      canvasId: that.data.canvasId,
      x:0,
      y:0,
      w:winW,
      h:imgH,
      success:function(res){
        console.log("分享图导出成功：" + res);
        // console.log(res);
        that.setData({ shareImg: res.tempFilePath});
      },
      fail:function(res){
        console.log("分享图导出失败：" + res);
        // console.log(res);
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  }
})