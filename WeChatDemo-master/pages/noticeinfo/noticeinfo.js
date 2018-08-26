// pages/noticeinfo/noticeinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: '',
    ismanager: false,
    noticeid: '',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(options.id){
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: app.globalData.url + 'getNotice',
        method: 'POST',
        data: { id: options.id },
        success: function (res) {
          if (app.globalData.openid) {
            if (app.globalData.openid == res.data.creater) {
              _this.setData({
                ismanager: true,
                noticeid: options.id
              })
            }
          }
          if (res.data.images != '' && res.data.images != null) {
            var images = new Array();
            var fileImages = new Array();
            images = res.data.images.split(",");
            for (var i = 0; i < images.length; i++) {
              fileImages.push(app.globalData.acimg + images[i]);
            }
            _this.setData({
              images: fileImages
            })
          }
          wx.hideLoading();
          _this.setData({
            notice: res.data
          })
        }
      })
    }
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
    var _this = this;
    if (_this.data.noticeid != '') {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: app.globalData.url + 'getNotice',
        method: 'POST',
        data: { id: _this.data.noticeid },
        success: function (res) {
          if (app.globalData.openid) {
            if (app.globalData.openid == res.data.creater) {
              _this.setData({
                ismanager: true
              })
            }
          }
          if (res.data.images != '' && res.data.images != null) {
            var images = new Array();
            var fileImages = new Array();
            images = res.data.images.split(",");
            for (var i = 0; i < images.length; i++) {
              fileImages.push(app.globalData.acimg + images[i]);
            }
            _this.setData({
              images: fileImages
            })
          }
          wx.hideLoading();
          _this.setData({
            notice: res.data
          })
        }
      })
    }
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
  edit: function(){
    var _this = this;
    wx.navigateTo({
      url: '../createnotice/createnotice?xiaoyouid=' + _this.data.notice.xiaoyouid + '&id=' + _this.data.notice.id,
    })
  },
  deleted: function(){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + 'deleteNotice',
            method: 'POST',
            data: { id: _this.data.notice.id },
            success: function (res) {
              wx.showModal({
                title: '提示',
                content: '删除成功!',
                showCancel: false,
                confirmText: '知道了',
                success: function(res){
                  wx.switchTab({
                    url: '../alumnilist/alumnilist',
                  })
                }
              })
            }
          })
        }
      }
    })
  }
})