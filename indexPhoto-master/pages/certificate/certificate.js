// pages/certificate/certificate.js
var app = getApp();
var tunji = require('../../utils/tunji.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: wx.getStorageSync('background'),
    backgroundColor: wx.getStorageSync('bgColor'),
    border: wx.getStorageSync('border'),
    myself:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('bgColor'),
    })
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    
    var that = this;
    var answerer_uid = options.answerer_uid;
    var set_number = options.set_number;
    var sign = wx.getStorageSync("sign");
    if (options.outin){
      that.setData({
        myself: true,
        imgUrl: options.imgUrl
      })
    }else{
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.data.apiurl + 'api/create-diploma' + '?operator_id=' + wx.getStorageSync("operator_id"),
        data: {
          sign: wx.getStorageSync("sign"),
          anotherUserId: answerer_uid,
          set_number: set_number,
          type: 1
        },
        success: function (res) {
          console.log("制作证书", res);
          var imgUrl = res.data.data.url;
          that.setData({
            imgUrl: imgUrl
          })
          wx.hideLoading();
        }
      })
    }
    
    
   
  },
  onShow: function (options){
    let that = this;
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('bgColor'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      sex: wx.getStorageSync('sex'),//"sex":1,//1 男 2女
    })
  },
  prewImg: function () {
    var that = this;
    var imgUrl = that.data.imgUrl;
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: [imgUrl] // 需要预览的图片http链接列表
    })
  },
  downLoad: function () {
    var that = this;
    var imgUrl = that.data.imgUrl;
    if(imgUrl){
      wx.downloadFile({
        url: imgUrl, //仅为示例，并非真实的资源
        success: function (res) {   

          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '证书下载成功，请去相册查看',
                icon: 'success',
                duration: 800
              })
            }
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function () {
    return {
      title: '' + wx.getStorageSync("nickName") + '邀请你参加默契检测，不服来战！',
      path: "pages/certificate/certificate?outin=1" + '&imgUrl=' + this.data.imgUrl
    }
  },
  backHome: function () {
    wx.switchTab({
      url: '../before/before'
    })
  }
})