//user.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var isLoading = false;
Page({
  data: {
    otherUserCode: null,
    userInfo: null,
    expProgress: 0,
    signed: false,
    blogs: [],
    honors: [
      '',
      '/img/honor/bronze.png',
      '/img/honor/silver.png',
      '/img/honor/gold.png'
    ],
    hidePost: true,
    showComment: false,
    floatCommentContent: '',
    formTop: '0rpx',
    selectedBlogIndex: null
  },

  //事件处理函数
  bindSendBlogTap: function (e) {
    wx.redirectTo({
      url: '/pages/post/post'
    })
  },

  bindListTap: function (e) {
    //参数名会自动转小写
    wx.redirectTo({
      url: '/pages/view/view?blogid=' + e.currentTarget.dataset.blogid
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: e.target.dataset.list
    })
  },

  catchLikeTap: function (e) {
    console.log(e)
    var i = e.currentTarget.dataset.index
    var that = this
    app.like(that.data.blogs[i].blogId, that.data.blogs[i].hasLike == 1, function () {
      if (that.data.blogs[i].hasLike == 1) {
        that.data.blogs[i].blogLikes = Number(that.data.blogs[i].blogLikes) - 1
        that.data.blogs[i].hasLike = -1
      } else {
        that.data.blogs[i].blogLikes = Number(that.data.blogs[i].blogLikes) + 1
        that.data.blogs[i].hasLike = 1
      }
      //更新数据
      that.setData({
        blogs: that.data.blogs
      })
    })
  },

  catchFollowTap: function (e) {
    console.log(e)
    var that = this
    app.follow(that.data.userInfo.userCode, that.data.userInfo.hasFollow == 1, function () {
      if (that.data.userInfo.hasFollow == 1) {
        that.data.userInfo.hasFollow = 0
      } else {
        that.data.userInfo.hasFollow = 1
      }
      //更新数据
      that.setData({
        userInfo: that.data.userInfo
      })
    })
  },

  catchCommentTap: function (e) {
    console.log(e)
    this.data.selectedBlogIndex = e.currentTarget.dataset.index
    this.setData({
      showComment: true,
      formTop: (e.touches["0"].clientY - 90) + 'px'
    })
  },

  catchUserTap: function (e) {
    // do nothing
  },

  init: function (userInfo) {
    var that = this
    if (app.globalData.loginInfo && app.globalData.loginInfo.inReview && app.globalData.loginInfo.inReview == 'N') {
      that.setData({
        hidePost: false
      })
    }

    if (userInfo) {
      var expProgress = (userInfo.nextLevelExpPoints && userInfo.expPoints) ? userInfo.expPoints / userInfo.nextLevelExpPoints : 0;
      //更新数据
      that.setData({
        userInfo: userInfo,
        expProgress: expProgress * 100
      })

      that.getPageData(1)
    }
  },

  getPageData: function (page) {
    app.showLoading()
    isLoading = true

    var that = this
    wx.request({
      url: app.globalData.baseURL + 'blog/listUserBlog.action',
      data: {
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
        blogUserCode: that.data.otherUserCode || '',
        rows: 6,
        page: page || 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1 && res.data.content) {
          for (var i in res.data.content) {
            res.data.content[i].insertTime_fmt = util.formatTimeStamp(res.data.content[i].insertTime)
          }
          if (page > 1) {
            that.setData({
              blogs: that.data.blogs.concat(res.data.content || [])
            })
          } else {
            that.setData({
              blogs: res.data.content || []
            })
          }
        }
      },
      complete: function (res) {
        app.hideLoading()
        isLoading = false
        wx.stopPullDownRefresh()
      }
    })
  },

  formReset: function (e) {
    this.setData({
      showComment: false,
      floatCommentContent: ''
    })
  },

  formSubmit: function (e) {
    console.log('form submit：' + e.detail.value)
    var that = this
    var blog = that.data.blogs[that.data.selectedBlogIndex]
    app.comment(blog.blogId, e.detail.value.content, null, function () {
      blog.blogComments = Number(blog.blogComments) + 1
      that.setData({
        showComment: false,
        blogs: that.data.blogs,
        floatCommentContent: ''
      })
      app.hideLoading()
      // goto blog detail page
      wx.redirectTo({
        url: '/pages/view/view?blogid=' + blog.blogId
      })
    })
  },

  onLoad: function (options) {
    console.log("onLoad options:" + options)
    this.setData({
      otherUserCode: options.otherusercode
    })
    app.getUserInfo(options.otherusercode, this.init)
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
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    if (!isLoading) {
      if (this.data.blogs && (this.data.blogs.length % 6) == 0) {
        this.getPageData(1 + Number(this.data.blogs.length / 6))
      }
    }
  },

  /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh:' + this.route)
    if (!isLoading) {
      this.init()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
