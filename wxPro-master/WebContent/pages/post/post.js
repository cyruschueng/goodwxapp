// pages/post/post.js
var app = getApp()
Page({
  data: {
    imageList: [],
    fileIds: [],
    blogType: ['请选择', '小吃快餐', '西餐', '火锅冒菜麻辣烫', '川菜', '农家菜、农家乐', '烧烤烤肉', '甜点饮品',
      '云贵菜', '海鲜河鲜粤菜', '咖啡茶饮酒吧', '自助餐', '日韩料理', '东南亚美食', '素食粥类', '其他特色美食'],
    index: 0,
    location: null
  },

  //事件处理函数
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },

  catchMap: function () {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.chooseLocation()
            },
            fail() {
              that.changeSetting()
            }
          })
        } else {
          that.chooseLocation()
        }
      }
    })
  },

  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          location: res
        })
      }
    })
  },

  changeSetting: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '请授权您的地理位置，通过地图定位商家位置',
      showCancel: false,
      success: function (res) {
        console.log(res)
        wx.openSetting({
          success: function (res) {
            console.log(res)
            if (res.authSetting && res.authSetting['scope.userLocation']) {
              that.chooseLocation()
            } else {
              that.changeSetting()
            }
          },
          fail: function (res) {
            that.changeSetting()
          }
        })
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    console.log('form submit：', e.detail.value)
    var that = this

    if (!e.detail.value.title) {
      wx.showModal({
        title: '提示',
        content: '来个醒目的标题吧',
        showCancel: false
      })
      return
    }

    if (!e.detail.value.content) {
      wx.showModal({
        title: '提示',
        content: '说点啥吧',
        showCancel: false
      })
      return
    }

    if (that.data.index < 1) {
      wx.showModal({
        title: '提示',
        content: '请选择一个标签',
        showCancel: false
      })
      return
    }

    // if (!e.detail.value.shopName) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请输入您纷享的店铺名称',
    //     showCancel: false
    //   })
    //   return
    // }

    if (!that.data.location || !that.data.location.longitude || !that.data.location.latitude) {
      wx.showModal({
        title: '提示',
        content: '请使用地图为您的纷享定位',
        showCancel: false
      })
      return
    }

    that.data.fileIds = []
    var title = e.detail.value.title
    var content = e.detail.value.content
    var shopName = e.detail.value.shopName

    app.showLoading()
    if (that.data.imageList.length > 0) {
      that.data.imageList.forEach(function (value, index, array) {
        wx.uploadFile({
          url: app.globalData.baseURL + 'common/asyncUploadFile.action',
          filePath: value,
          name: 'file',
          formData: {
            tokenCode: app.globalData.loginInfo.tokenCode,
            'refType': 'blog',
            'attSort': index
          },
          success: function (res) {
            console.log(res)
            if (res.data) {
              var retData = JSON.parse(res.data)
              if (retData.status != 1) {
                return
              }

              that.data.fileIds.push(retData.content.fileId)
              console.log('fileIds.length:' + that.data.fileIds.length)
              if (that.data.fileIds.length == that.data.imageList.length) {
                app.hideLoading()
                that.postBlog(title, content, shopName, that.data.fileIds.join())
              }
            }
          },
          complete: function (res) {
            console.log(res)
          }
        })
      });
    } else {
      that.postBlog(title, content, shopName, null)
    }
  },

  postBlog: function (title, content, shopName, attIdList) {
    console.log('do post')
    app.showLoading()

    var that = this
    wx.request({
      url: app.globalData.baseURL + 'blog/post.action',
      data: {
        tokenCode: app.globalData.loginInfo.tokenCode,
        title: title,
        content: content,
        attIdList: attIdList || '',
        blogType: that.data.blogType[that.data.index],
        shopName: shopName || '',
        addr: that.data.location ? that.data.location.name : '',
        longitude: that.data.location ? that.data.location.longitude : '',
        latitude: that.data.location ? that.data.location.latitude : ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          // goto blog detail page
          wx.redirectTo({
            url: '/pages/view/view?blogid=' + res.data.content
          })
        } else {
          wx.showModal({
            title: '出错啦',
            content: '网络不给力啊',
            showCancel: false
          })
        }
      },
      complete: function (res) {
        app.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.fxLogin()
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
    // todo save post paras
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
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