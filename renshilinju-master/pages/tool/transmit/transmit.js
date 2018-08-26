// pages/tool/transmit/transmit.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    body: '',
    tempFilePaths: '',
    focus: true,
    loading: false,
  },
  bindTextAreaBlur: function (e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
  },
  textBlurTitle: function (e) {
    console.log(e);
    this.setData({
      body: e.detail.value
    })
  },

  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        console.log("=============chooseImage====success===")
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },

  transmitPosts: function () {
    console.log("=============post=======")
    var that = this
    var userInfo = publicUrl.globalData.userInfo
    if (that.data.title == "" || that.data.tempFilePaths=='') {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'success',
        duration: 2000
      })
    } else {
      that.setData({
        loading: true,
      })
      var userInfo = wx.getStorageSync('userInfo');

      wx.uploadFile({
        url: url + '/passes', //仅为示例，非真实的接口地址
        filePath: that.data.tempFilePaths[0],
        name: 'asset',
        header:{
          'Accept': "*/*",
          'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
        },
        formData: {
          xiaoquid: userInfo.xqid,
          userid: userInfo.id,
          title: that.data.title,
          desc: that.data.body,
          leixing: 'book'
        },
        success: function (res) {
          console.log(res)
          var obj = JSON.parse(res.data); //由JSON字符串转换为JSON对象
          console.log(obj)
          //do something
          wx.navigateTo({
            // url: 'transmitPosts/transmitPosts?title=' + that.data.title + '&body=' + that.data.body + '&asset=' + that.data.tempFilePaths + '&xqid=' + userInfo.xqid,
            url: '/pages/home/chuandiDetail/chuandiDetail?id=' + obj.id + '&path=' + 'fabu'
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    var xqname = userInfo.xqname;
    this.setData({
      xqname:xqname
    })
    wx.setNavigationBarTitle({
      title: '图书传递'
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
    var userInfo = publicUrl.globalData.userInfo
    this.setData({
      xqname: userInfo.xqname
    })
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
  
  }
})