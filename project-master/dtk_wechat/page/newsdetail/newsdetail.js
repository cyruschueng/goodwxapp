var common = require('../../common/common.js');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    listBox: true,
    id: '',
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    var _this = this;
    _this.newsdetail()
  },
  newsdetail: function () {
    var that = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/news/' + that.data.id,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          var dataList = res.data.data[0];
          that.setData({
            dataList: dataList,
            loadingHidden: true,
            listBox: false
          });
          var detail = res.data.data[0].detail;
          /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
          
          WxParse.wxParse('detail', 'html', detail, that, 5);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
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

  onPullDownRefresh: function () {

  },
   */
  /**
   * 页面上拉触底事件的处理函数

  onReachBottom: function () {

  },
   */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})