// pages/testDraw/td.js

var wxDraw = require("../../utils/wxdraw.js").wxDraw;
var Shape = require("../../utils/wxdraw.js").Shape;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxCanvas: null //    需要创建一个对象来接受wxDraw对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var context = wx.createCanvasContext('first');
    this.wxCanvas = new wxDraw(context, 0, 0, 400, 500);
    var rect = new Shape('rect', { x: 60, y: 60, w: 40, h: 40, fillStyle: "#2FB8AC", rotate: Math.PI / 2 }, 'mix', true);
    this.wxCanvas.add(rect);//添加到canvas上面
    rect.animate({ "x": "+=100", "y": "+=100" }, { duration: 1000 }).animate("rotate", Math.PI * 5, { duration: 1000 }).start(1);

    let polygon = new Shape('polygon', {
      x: 200, y: 200, r: 10, sides: 5, //9边形
      fillStyle: "#FC354C", rotate: Math.PI / 4
    }, 'mix', true)
    setTimeout(()=>{
      this.wxCanvas.add(polygon);//添加到canvas上面
      polygon.animate({ r: "+=40", rotate: "+=80"}, { duration:3000}).start(1)
    },700);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindtouchstart: function (e) {
    // 检测手指点击开始事件
    this.wxCanvas.touchstartDetect(e);

  },
  bindtouchmove: function (e) {
    // 检测手指点击 之后的移动事件
    this.wxCanvas.touchmoveDetect(e);
  },
  bindtouchend: function () {
    //检测手指点击 移出事件
    this.wxCanvas.touchendDetect();
  },
  bindtap: function (e) {
    // 检测tap事件
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress: function (e) {
    // 检测longpress事件
    this.wxCanvas.longpressDetect(e);
  },
})