var common = require('../../common/common.js');
var app = getApp();
var page_no = 0;
var page_size = 10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    loadingHidden: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page_no = 0;
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
    page_no = 0;
    var _this = this;
    _this.setData({
      msgList: [],
      loadingHidden: false
    });
    _this.spread()
    
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
    page_no = 0;
    var _this = this;
    _this.setData({
      msgList: [],
      loadingHidden: false
    });
    _this.spread()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    _this.setData({
      loadingHidden: false
    });
    _this.spread()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  spread: function () {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/advertisements/open',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'page_size': page_size,
        'page_no': page_no
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
            //loading----------
            _this.setData({
              loadingHidden: true
            });
          } else if (dataLength > 0) {
            //msgList 作为不断增加的list---------
            var msgList = _this.data.msgList;
            for (var i = 0; i < dataLength; i++) {
              msgList.push(res.data.data[i]);
            }
            //添加和修改msgList数据----------
            for (var j = 0; j < msgList.length; j++) {
              var spread = msgList[j].ad_comment;
              var update_datetime = msgList[j].update_datetime
              //msgList[j].spread = spread.substring(1, 40);
              msgList[j].spread = spread;
              msgList[j].spreadfirst = spread;
              msgList[j].spreadLength = spread.length
              msgList[j].update_datetime = update_datetime.substring(5, 10);
            }
            _this.setData({
              msgList: msgList,
              loadingHidden: true
            });
            page_no++;

          }

        } else {
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
      },
      fail: function (err) {
        console.log(err)
      }
    })





  },
  listClick: function (event) {
    var id = event.currentTarget.id;
    setTimeout(function () {
      wx.navigateTo({ url: '../carddetail/carddetail?id=' + id })
    }, 400);
  }
})