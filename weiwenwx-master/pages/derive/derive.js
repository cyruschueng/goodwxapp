let utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    num:100,
    url:'',
    url2: '',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    this.setData({
      id: options.id,
      time: utils.formatTime(new Date())
    });
    var result = getApp().wxRQ(getApp().appApi.downloadAPI, {
      question_id: options.id,
      uid: wx.getStorageSync('uid')
    }, 'POST', success);
    function success(e) {
      console.log(e.data.result.download.excel);
      that.setData({
        url: e.data.result.download.excel,
        url2: e.data.result.download.txt
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
  copy:function(){
    var that = this;
    if (!this.data.url) {
      wx.showModal({
        title: '温馨提示',
        content: '地址不存在',
        showCancel: false
      });
    } else {
      wx.setClipboardData({
        data: that.data.url,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功！',
                icon: 'success'
              })
            }
          })
        }
      })
    }
  },
  copy2: function () {
    var that = this;
    if (!this.data.url2) {
      wx.showModal({
        title: '温馨提示',
        content: '地址不存在',
        showCancel: false
      });
    } else {
      wx.setClipboardData({
        data: that.data.url2,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功！',
                icon: 'success'
              })
            }
          })
        }
      })
    }
  },
  open:function(){
    var that = this;
    if (!this.data.url){
      wx.showModal({
        title: '温馨提示',
        content: '地址不存在',
        showCancel:false
      });
    }else{
      console.log(this.data.url);
      wx.downloadFile({
        url: that.data.url,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  },
  open2: function () {
    console.log(this.data.url2);
    var that = this;
    if (!this.data.url2) {
      wx.showModal({
        title: '温馨提示',
        content: '地址不存在',
        showCancel: false
      });
    }else{
      wx.downloadFile({
        url: that.data.url2,
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  },
  refesh:function(){
    var that = this;
    wx.redirectTo({
      url: '/pages/derive/derive?id='+that.data.id,
    })
  }
})