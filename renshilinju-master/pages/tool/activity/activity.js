// pages/tool/activity/activity.js
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
    focus: true,
    num: 0,
    date: '2018-01-02',
    time: '12:01',
    tempFilePaths: '',
    isFile: true,
    loading: false,
    postid:0
  },
  click:function(){
    this.setData({
      num:''
    })
  },
  bindDateChange:function(e) {
    this.setData({
      date: e.detail.value
    })
    console.log(this.data.date)
  },
  bindTimeChange:function(e) {
    this.setData({
      time: e.detail.value
    })
    console.log(this.data.time)
  },
  textBlurTitle: function (e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
  },
  textBlurBody: function (e) {
    console.log(e);
    this.setData({
      body: e.detail.value
    })
  },
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  activityPosts: function () {
    var that = this
    console.log(that.data.tempFilePaths)
    console.log("=============post=======")
    var userInfo = publicUrl.globalData.userInfo
    if (that.data.title == "") {
      wx.showToast({
        title: '请输入活动标题',
        icon: 'success',
        duration: 2000
      })
    } else {
      that.setData({
        loading: true,
      })
      wx.request({
        url: url + '/events',
        method: 'POST',
        data: {
          title: that.data.title,
          body: that.data.body,
          num: that.data.num,
          userid: userInfo.id,
          deadline: that.data.date + '-' + that.data.time,
          xiaoquid: userInfo.xqid
        },
        header: {
          'Accept': "*/*",
          'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id

        },
        success:function(res) {
          console.log(res)
          that.setData({
            postid: res.data.post_id
          })
          console.log(that.data.postid)
          if (that.data.tempFilePaths != null && that.data.tempFilePaths.length != 0) {
            that.uploadImg(that.data.tempFilePaths, res.data.post_id, 0, that.data.tempFilePaths.length)
          }else{
            wx.navigateTo({
              // url: '../activitypost/activitypost?title=' + that.data.title + '&body=' + that.data.body + '&asset=' + that.data.tempFilePaths + '&xqid=' + userInfo.xqid,
              url: '/pages/home/topicDetail/topicDetail?id=' + that.data.postid + '&path=' + 'fabu',
            });
          }
        },
        fail:function() {

        }
      })
    
    }
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  chooseimage: function () {
    var tempFiles = [];
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var temps = res.tempFilePaths;
        _this.data.isFile ? tempFiles = temps : tempFiles = _this.data.tempFilePaths.concat(temps)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: tempFiles,
          isFile: false
        })
        
      }
      
    })
  },

  uploadImg: function (filePaths, postid,index, length) {
    var that = this;
    var userInfo = publicUrl.globalData.userInfo
    console.log('filePaths[' + index + '] = ' + filePaths[index] + '----------------------')
    var ass = 'asset' + index
    console.log('ass = ' + ass)
    wx.uploadFile({
      url: url + '/events/saveimgs',
      filePath: filePaths[index],
      name: ass,
      formData: {
        index: index,
        postid:postid
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        index++;
        if (index == length) {
          console.log('已上传完成！' + that.data.tempFilePaths.length)
          var str = ""
          for (var i = 0; i < that.data.tempFilePaths.length; i++) {
            console.log("for i = " + i)
            str += "&asset" + i + "=" + that.data.tempFilePaths[i]
            console.log("for ====str ===" + str)
          }
          console.log("str = -----" + str)
          wx.navigateTo({
            // url: '../activitypost/activitypost?title=' + that.data.title + '&body=' + that.data.body + '&asset=' + that.data.tempFilePaths + '&xqid=' + userInfo.xqid,
            url: '/pages/home/topicDetail/topicDetail?id=' + that.data.postid + '&path=' + 'fabu',
          });
        } else {
          that.uploadImg(filePaths,postid, index, length);
        }
      },
      fail: function (res) {
        console.log('上传失败：-->' + res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = publicUrl.globalData.userInfo;
    var xqname = userInfo.xqname
    this.setData({
      xqname: xqname
    })
    wx.setNavigationBarTitle({
      title: '活动报名'
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