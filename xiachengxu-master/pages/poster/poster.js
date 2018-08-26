import { Poster } from './poster-model.js';
var poster = new Poster();

Page({
  /**
   * 页面的初始数据
   **/
  data: {
    time: 3,
    poster: ''
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var that = this;
    var storeNo = options.storeNo || decodeURIComponent(options.scene);
    wx.setStorageSync('storeNo', storeNo);
    // 获取当前门店海报图片
    var params={
      data:{
        type:1,
        category:1,
        storeNo:wx.getStorageSync('storeNo'),
        page:'1',
        size:'2'
      }
    };
    wx.showLoading({
      title: '加载中'
    })
    poster.getPosterData(params, res =>{
      if (res.status){
        that.setData({
          poster: res.data[0].imgUrl,
          loadingHidden: true
        });
        console.log('--params----', params);
        console.log('--res----',res);
        console.log('--poster----',that.data.poster);
      }
      that.countDown(that.data.time);
      wx.hideLoading();
    });
  },

  // 倒计时
  countDown(time){
    var that = this;
    if (time > 1) {
      this.timeOut = setTimeout(() => {
        that.countDown(time - 1);
      }, 1000);
    } else {
      this.skipHandle();
    }
  },

  skipHandle() {
    clearTimeout(this.timeOut);
    this.setData({
      time: 0
    });
    wx.switchTab({
      url: '/pages/home/home',
    })
  }

})