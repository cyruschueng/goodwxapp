var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/mymsg.do',
      data: {
        userid: app.globalData.ID
      },
      success: function (res) {
        that.setData({ user: res.data })
      }
    });
    this.log(0)
  },
  log: function (start) {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/mybelllog.do',
      data: {
        userid: app.globalData.ID,
        start: start
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].time = res.data[i].time.substring(0, res.data[i].time.length - 2)
        }
        that.setData({
          list: res.data
        })
        wx.hideLoading()
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
   */
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/mymsg.do',
      data: {
        userid: app.globalData.ID
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({ user: res.data })
      }
    });
    that.log(0);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var list = that.data.list;
    var start = that.data.list.length;
    wx.request({
      url: app.globalData.IP + 'wx/mybelllog.do',
      data: {
        userid: app.globalData.ID,
        start: start
      },
      success: function (res) {
        wx.hideToast();
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].time = res.data[i].time.substring(0, res.data[i].time.length - 2);
          list.push(res.data[i]);
        }
        that.setData({
          list: list
        })
      }
    })
  },
})