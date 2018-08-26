// pages/mine/theme/theme.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    title: '',
    evaContent: '',
    tempFilePaths: '',
    focus: true,
    isFile: true,
    loading: false,
    postid:0
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  textBlurTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  textBlur: function (e) {
    this.setData({
      evaContent: e.detail.value
    })
  },

  themePosts: function () {
    var userInfo = publicUrl.globalData.userInfo
    var that = this
    if (that.data.title == "") {
      wx.showToast({
        title: '请输入文字内容',
        icon: 'success',
        duration: 2000
      })
    } else {
      that.setData({
        loading: true,
      })
      console.log('userid = ' + userInfo.id + ',\n title = ' + that.data.title + ',\n xq_id = ' + userInfo.xqid + ',\n thirdkey = ' + userInfo.thirdkey)
        wx.request({
          url: url + '/posts',
          method: 'POST',
          data: {
            xq_id: userInfo.xqid,
            userid: userInfo.id,
            title: that.data.title,
            leixing: 'post'
          },
          header: {
            'Accept': "*/*",
            'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
          },
          success:function(res){
            console.log(res)
            that.setData({
              postid:res.data.id
            })
            console.log(that.data.postid)
            console.log('res------------>' + res + "this.data.tempFilePaths.length = " + that.data.tempFilePaths.length)
            if (that.data.tempFilePaths != null && that.data.tempFilePaths.length != 0) {
              that.uploadImg(that.data.tempFilePaths, res.data.id, 0, that.data.tempFilePaths.length)
            } else {
              wx.navigateTo({
                // url: 'themePosts/themePosts?title=' + that.data.title + '&body=' + that.data.evaContent + '&asset=' + that.data.tempFilePaths + '&xqid=' + userInfo.xqid,
                url: '/pages/home/topicDetail/topicDetail?id=' + that.data.postid + '&asset=' + that.data.tempFilePaths+'&path='+'fabu',
              });
            }
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
    console.log("=============choose image=======")

    var tempFiles = [];
    var _this = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        console.log("=============choose sucess=======")
        var temps = res.tempFilePaths;
        _this.data.isFile ? tempFiles = temps : tempFiles = _this.data.tempFilePaths.concat(temps)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        console.log(tempFiles)
        console.log(_this.data.isFile)
        _this.setData({
          tempFilePaths: tempFiles,
          isFile: false
        })
      }
    })
  },

  uploadImg: function (filePaths, postid,index, length) {
    var innerthis = this;
    var userInfo = publicUrl.globalData.userInfo
    console.log('filePaths[' + index + '] = ' + filePaths[index] + '----------------------')
    var ass = 'asset' + index
    console.log('ass = ' + ass)
    wx.uploadFile({
      url: url + '/posts/saveimgs',
      filePath: filePaths[index],
      name: ass,
      formData: {
        index:index,
        postid:postid
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        console.log(res)
        index++;
        console.log('index = = = = =' + index)  
        if (index == length) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          console.log('已上传完成！' + innerthis.data.tempFilePaths.length)
          var str = ""
          for (var i = 0; i < innerthis.data.tempFilePaths.length; i++) {
            console.log("for i = " + i)
            str += "&asset" + i + "=" + innerthis.data.tempFilePaths[i]
            console.log("for ====str ===" + str)
          }
          console.log("str = -----" + str)
          wx.navigateTo({
            // url: 'themePosts/themePosts?title=' + innerthis.data.title + '&body=' + innerthis.data.evaContent + '&asset=' + innerthis.data.tempFilePaths + '&xqid=' + userInfo.xqid,
            url: '/pages/home/topicDetail/topicDetail?id=' + innerthis.data.postid + '&asset=' + innerthis.data.tempFilePaths + '&path=' + 'fabu',
          });
        } else {
          console.log('-else------filepahths.length = ' + filePaths.length +',\n index = ' + index+',\n length = ' +length)
          innerthis.uploadImg(filePaths, postid,index, length);
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("=============onLoad=======")

    wx.setNavigationBarTitle({
      title: '邻里互助'
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
    console.log("=============on show====thmee===")

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
