var common = require('../../common/common.js');
var app = getApp();
var page_no = 0;
var page_size = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    listBox: true,
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page_no = 0;
    this.setData({
      dataList: []
    })
    var _this = this;
    _this.newsList()
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
  newsList: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/news',
      data: {
        'page_size': page_size,
        'page_no': page_no
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.stopPullDownRefresh()
          var dataLength = res.data.data.length;
          if (dataLength <= '0') {
            wx.showToast({
              title: '没有数据了',
              duration: 2000
            })
            _this.setData({
              loadingHidden: true
            });
          } else if (dataLength > 0) {
            var dataList = _this.data.dataList;
            for (var i = 0; i < dataLength; i++) {
              dataList.push(res.data.data[i]);
            }

            for (var j = 0; j < dataList.length; j++) {
              var create_datetime = dataList[j].create_datetime
              dataList[j].create_datetime = create_datetime.substring(0, 10);
            }
            _this.setData({
              dataList: dataList,
              loadingHidden: true
            });
            page_no++;
          }
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
        if (_this.data.dataList.length <= 0) {
          _this.setData({
            listBox: true
          });
        } else {
          _this.setData({
            listBox: false
          });
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  listClick: function (event) {
    var id = event.currentTarget.id;
    setTimeout(function () {
      wx.navigateTo({ url: '../newsdetail/newsdetail?id=' + id })
    }, 200);

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
    var _this = this;
    _this.setData({
      loadingHidden: false
    });
    _this.newsList()
  },

  /**
   * 用户点击右上角分享

  onShareAppMessage: function () {
  
  }   */
})