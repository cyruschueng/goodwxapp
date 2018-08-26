// pages/main/index.js
// QRCode.js 是一个用于生成二维码的 JavaScript 库。
// 主要是通过获取 DOM 的标签,再通过 HTML5 Canvas 绘制而成,不依赖任何库。
var QR = require("../../utils/qrcode.js");
Page({
    //页面的初始数据
    data:{
      canvasHidden:false,
      maskHidden:true,
      imagePath:'',
      placeholder:'请输入网址或文字，然后点击下面按钮生成对应二维码'//默认二维码生成文本
    },

    //生命周期函数--监听页面加载
    onLoad:function(options){
      // 页面初始化 options为页面跳转所带来的参数
      var size = this.setCanvasSize();//动态设置画布大小
      var initUrl = this.data.placeholder;
      this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    },

    //生命周期函数--监听页面初次渲染完成
    onReady:function(){

    },

    //生命周期函数--监听页面显示
    onShow:function(){


    },

    //生命周期函数--监听页面隐藏
    onHide:function(){

    },

    //生命周期函数--监听页面卸载
    onUnload:function(){

    },

    //适配不同屏幕大小的canvas
    setCanvasSize:function(){
      var size={};
      try {
          var res = wx.getSystemInfoSync(); //获取系统信息同步接口
          var scale = 750/686;  //不同屏幕下canvas的适配比例；规定屏幕宽为750rpx
          var width = res.windowWidth/scale;    //windowWidth,可使用窗口宽度
          var height = width;//canvas画布为正方形
          size.w = width;
          size.h = height;
        } catch (e) {
          // Do something when catch error
          console.log("获取设备信息失败"+e);
        }
      return size;
    } ,

    createQrCode:function(url,canvasId,cavW,cavH){
      //调用插件中的draw方法，绘制二维码图片
      QR.api.draw(url,canvasId,cavW,cavH);
      setTimeout(() => { this.canvasToTempImage();},1000);
    },

    //获取临时缓存照片路径，存入data中
    canvasToTempImage:function(){
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
                imagePath:tempFilePath,
            });
        },
        fail: function (res) {
            console.log(res);
        }
      });
    },

    //点击图片进行预览，长按保存分享图片
    previewImg:function(e){
      var img = this.data.imagePath;
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      })
    },

    //生成二维码
    formSubmit: function(e) {
      var that = this;
      var url = e.detail.value.url;
      that.setData({
        maskHidden:false,
      });
      wx.showToast({
        title: '生成中...',
        icon: 'loading',
        duration:2000
      });
      var st = setTimeout(function(){
        wx.hideToast()
        var size = that.setCanvasSize();
        //绘制二维码
        that.createQrCode(url,"mycanvas",size.w,size.h);
        that.setData({
          maskHidden:true
        });
        clearTimeout(st);
      },2000)
    }
})