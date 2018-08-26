// pages/tool/wine/wine.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winename: '',
    winenumber: '',
    desc:'',
    tempFilePaths: '',
    isFile: true,
    loading: false,
    weixinid:0
  },
  textBlurnum:function(e){
    console.log(e);
    this.setData({
      winenumber: e.detail.value
    })
  },
  textBlur: function (e) {
    console.log(e);
    this.setData({
      winename: e.detail.value
    })
  },
  textBlurjieshao: function (e) {
    console.log(e);
    this.setData({
      desc: e.detail.value
    })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  goWine: function () {
    console.log("=============post=======")
    var userInfo = publicUrl.globalData.userInfo
    var that = this
    if (that.data.winename == "" || that.data.winenumber=="") {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'success',
        duration: 2000
      })
    } else {
        that.setData({
          loading: true,
        })
        wx.request({
          url: url + '/weixins',
          method: 'POST',
          data: {
            xq_id: userInfo.xqid,
            userid: userInfo.id,
            name: that.data.winename,
            wenum: that.data.winenumber,
            desc: that.data.desc
          },
          header: {
            'Accept': "*/*",
            'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
          },
          success: function (res) {
            console.log(res)
            that.setData({
              weixinid:res.data.id
            })
            console.log(that.data.weixinid)
            if (that.data.tempFilePaths != null && that.data.tempFilePaths.length != 0) {
              console.log("------------------" + that.data.tempFilePaths.length)
              that.uploadImg(that.data.tempFilePaths, 0, that.data.tempFilePaths.length)
            } else {
              wx.navigateTo({
                url: '/pages/home/weixindetail/weixindetail?id=' + that.data.weixinid + '&path=' + 'fabu'
              });
            }
          },
          fail: function (res) {
            console.log("添加微信群失败")
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

  uploadImg: function (filePaths,index, length) {
    console.log('  index  = ' +index+'----------------'+length+'------')
    var that = this;
    var userInfo = publicUrl.globalData.userInfo
    console.log('filePaths[' + index + '] = ' + filePaths[index] + '----------------------')
    var ass = 'asset' + index
    console.log('ass = ' + ass)
    wx.uploadFile({
      url: url + '/weixins/saveimgs',
      filePath: filePaths[index],
      name: ass,
      formData: {
        index: index,
        weixinid:that.data.weixinid
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        console.log(res)
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
            // url: '../winepost/winepost?winename=' + that.data.winename + '&winenumber=' + that.data.winenumber + '&desc=' + that.data.desc + '&asset=' + that.data.tempFilePaths,
            url: '/pages/home/weixindetail/weixindetail?id=' + that.data.weixinid + '&path=' + 'fabu'
          });
        } else {
          that.uploadImg(filePaths, index, length);
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
    var userInfo = wx.getStorageSync('userInfo');

    this.setData({
      xqname: userInfo.xqname
    })
    wx.setNavigationBarTitle({
      title: '发布社群'
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