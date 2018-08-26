// pages/whinfo/whinfo.js
const URL = "https://xcx.toupaiyule.com";
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    whname: '',
    avatarSrc: '',
    sex: 'female',
    genders: [
      { sex: "男", value: 'male', checked: 'true'},
      { sex: "女", value: 'female', checked: 'false'}
      ],
    weibo: '',
    baike: '',
    workLinks: [],
    works: [],
    workIndex: 0,
  },
  // formSubmit: function (e) {
  //   sendercode = e.detil.formId;
  // },

  addLink: function (e) {
    var wl = this.data.workLinks;
    wl.push(this.data.workLinks.length);
    var index = this.data.workLinks.length + 1;
    this.setData({
      workLinks: wl,
      workIndex: index
    });
  },
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      // success: function (res) {
      //   var tempFilePaths = res.tempFilePaths
      //   wx.uploadFile({
      //     url: URL + '/wanghong/upload',
      //     filePath: tempFilePaths[0],
      //     name: 'file',
      //     formData: {
      //       'user': 'test'
      //     },
      //     success: function (res) {
      //       var data = res.data;
      //       console.log(res);
      //     },
      //     fail: function (e) {
      //       console.log(e);
      //       wx.showModal({
      //         title: '提示',
      //         content: '上传失败',
      //         showCancel: false
      //       })
      //     },
      //     complete: function () {
      //       wx.hideToast();  //隐藏Toast
      //     }
        // })
          success: function (res) {
          var tempFilePaths = res.tempFilePaths;
          that.uploadToServer(that, tempFilePaths);
      }
    })
  },

  uploadToServer: function (page, path) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
      wx.uploadFile({
        url: URL + "/wanghong/upload",
        filePath: path[0],
        name: 'file',
        header: { "Content-Type": "multipart/form-data" },
        formData: {
          //和服务器约定的token, 一般也可以放在header中
          'session_token': wx.getStorageSync('session_token')
        },
        success: function (res) {
          console.log(res);
          var data = res.data;
          // if (data.statusCode != '200') {
          //   wx.showModal({
          //     title: '提示',
          //     content: '上传失败',
          //     showCancel: false
          //   })
          //   return;
          // }
          page.setData({  //上传成功修改显示头像
            avatarSrc: path[0]
          })
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();  //隐藏Toast
        }
      })
  },

  sexChange: function (e) {
    this.setData({
      sex: e.detail.value
    });
  },

  inputName: function (e) {
    this.setData({
      whname: e.detail.value
    });
  },
  inputWeibo: function (e) {
    this.setData({
      weibo: e.detail.value
    });
  },
  inputBaike: function (e) {
    this.setData({
      baike: e.detail.value
    });
  },
  inputWork: function (e) {
    var wl = this.data.works;
    wl.push(e.detail.value);
    this.setData({
      works: wl
    });
  },

  submit: function(e){
    var that = this;
    if (this.data.whname.length == 0) {
      wx.showToast({
        title: '请先输入网红名',
        icon: 'success',
        duration: 2000
      });
    } else {
    wx.request({
      url: URL + '/wanghong/createWH',
      data: {
        openid: app.globalData.openid,
        whname: this.data.whname,
        sex: this.data.sex,
        avatar: this.data.avatarSrc,
        weibo: this.data.weibo,
        baike: this.data.baike,
        works: JSON.stringify(this.data.works)
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // wx.showToast({
        //   title: res.data.msg,
        //   icon: 'success',
        //   duration: 1000
        // });
        wx.navigateTo({
          url: '../logs/logs'
        });
      }
    });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})