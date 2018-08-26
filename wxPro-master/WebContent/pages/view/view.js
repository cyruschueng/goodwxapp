// pages/view/view.js
var util = require('../../utils/util.js')

var app = getApp()
var isLoading = false;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    blogId: null,
    blog: [],
    comments: [],
    hidePost: true,
    selectComment: null,
    commentPlaceholder: '点评一下',
    commentContent: null,
    focusComment: false,
    honors: [
      '',
      '/img/honor/bronze.png',
      '/img/honor/silver.png',
      '/img/honor/gold.png'
    ]
  },

  //事件处理函数
  bindSendBlogTap: function (e) {
    wx.redirectTo({
      url: '/pages/post/post'
    })
  },

  nextPage: function () {
    if (!isLoading) {
      if (this.data.comments && (this.data.comments.length % 10) == 0) {
        this.getPageData(1 + Number(this.data.comments.length / 10))
      }
    }
  },

  catchMap: function () {
    var that = this
    if (that.data.blog.latitude && that.data.blog.longitude) {
      wx.openLocation({
        latitude: Number(that.data.blog.latitude),
        longitude: Number(that.data.blog.longitude),
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '地图打开失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.blog.imgUrlList
    })
  },

  getPageData: function (page) {
    app.showLoading()
    isLoading = true

    var that = this
    wx.request({
      url: app.globalData.baseURL + 'blog/listComment.action',
      data: {
        blogId: that.data.blogId,
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
        rows: 10,
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
              comments: that.data.comments.concat(res.data.content || [])
            })
          } else {
            that.setData({
              comments: res.data.content
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

  init: function () {
    if (!this.data.blogId) {
      console.log("init can not find blogId.")
      return
    }
    app.showLoading()

    var that = this
    if (app.globalData.loginInfo && app.globalData.loginInfo.inReview && app.globalData.loginInfo.inReview == 'N') {
      that.setData({
        hidePost: false
      })
    }

    wx.request({
      url: app.globalData.baseURL + 'blog/view.action',
      data: {
        blogId: that.data.blogId,
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1 && res.data.content) {
          if (res.data.content.insertTime) {
            res.data.content.insertTime_fmt = util.formatTimeStamp(res.data.content.insertTime)
          }
          //更新数据
          that.setData({
            blog: res.data.content
          })
        }
      },
      complete: function (res) {
        app.hideLoading()
        wx.stopPullDownRefresh()
      }
    })

    this.getPageData(1)
  },

  formSubmit: function (e) {
    console.log('form submit：' + e.detail.value)
    var that = this
    app.comment(that.data.blog.blogId, e.detail.value.content, that.data.selectComment, function () {
      // goto blog detail page
      wx.redirectTo({
        url: '/pages/view/view?blogid=' + that.data.blog.blogId
      })
    })
  },

  formReset: function (e) {
    console.log(e)
    this.setData({
      selectComment: null,
      commentPlaceholder: '点评一下',
      commentContent: null
    })
  },

  catchLikeTap: function (e) {
    console.log(e)
    var that = this
    app.like(this.data.blogId, that.data.blog.hasLike == 1, function () {
      if (that.data.blog.hasLike == 1) {
        that.data.blog.blogLikes = Number(that.data.blog.blogLikes) - 1
        that.data.blog.hasLike = -1
      } else {
        that.data.blog.blogLikes = Number(that.data.blog.blogLikes) + 1
        that.data.blog.hasLike = 1
      }
      //更新数据
      that.setData({
        blog: that.data.blog
      })
    })
  },

  catchFollowTap: function (e) {
    console.log(e)
    var that = this
    app.follow(that.data.blog.userCode, that.data.blog.hasFollow == 1, function () {
      if (that.data.blog.hasFollow == 1) {
        that.data.blog.hasFollow = 0
      } else {
        that.data.blog.hasFollow = 1
      }
      //更新数据
      that.setData({
        blog: that.data.blog
      })
    })
  },

  catchCommentListTap: function (e) {
    console.log(e)
    var that = this
    this.setData({
      focusComment: true,
      selectComment: e.currentTarget.dataset.comment,
      commentPlaceholder: '回复' + e.currentTarget.dataset.comment.userName + ':',
      commentContent: ''
    })
  },

  bindCommentBlur: function (e) {
    console.log(e)
    var that = this
    if (e.detail && e.detail.value) {
      this.setData({
        focusComment: false
      })
    } else {
      this.setData({
        focusComment: false,
        selectComment: null,
        commentPlaceholder: '点评一下',
        commentContent: null
      })
    }
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    console.log("onLoad options:" + options)
    this.setData({
      blogId: options.blogid
    })
    app.fxLogin(this.init)
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
    console.log('onPullDownRefresh:' + this.route)
    if (!isLoading) {
      this.init()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    return {
      title: '“' + this.data.blog.userName + '”纷享了“' + this.data.blog.title + '”',
      // path: '/page/user?id=123',
      // imageUrl: '',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})