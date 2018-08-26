//page/types/types.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var isLoading = false;
Page({
  data: {
    // blogTypes: ['小吃快餐', '西餐', '火锅冒菜麻辣烫', '川菜', '农家菜、农家乐', '烧烤烤肉', '甜点饮品',
    //   '云贵菜', '海鲜河鲜粤菜', '咖啡茶饮酒吧', '自助餐', '日韩料理', '东南亚美食', '素食粥类', '其他特色美食'],
    blogTypes: [
      { name: '小吃快餐', img: '/img/types/xiaochi.png' },
      { name: '西餐', img: '/img/types/xicang.png' },
      { name: '火锅冒菜麻辣烫', img: '/img/types/huoguo.png' },
      { name: '川菜', img: '/img/types/chuangcai.png' },
      { name: '农家菜、农家乐', img: '/img/types/nongjiacai.png' },
      { name: '烧烤烤肉', img: '/img/types/shaokao.png' },
      { name: '甜点饮品', img: '/img/types/tiandian.png' },
      { name: '云贵菜', img: '/img/types/yunguicai.png' },
      { name: '海鲜河鲜粤菜', img: '/img/types/haixiang.png' },
      { name: '咖啡茶饮酒吧', img: '/img/types/kafei.png' },
      { name: '自助餐', img: '/img/types/zizhucang.png' },
      { name: '日韩料理', img: '/img/types/rihanliaoli.png' },
      { name: '东南亚美食', img: '/img/types/dongnanyameishi.png' },
      { name: '素食粥类', img: '/img/types/sushi.png' },
      { name: '其他特色美食', img: '/img/types/qita.png' }
    ],
    blogs: [],
    blogType: null,
    hidePost: true,
    showComment: false,
    floatCommentContent: '',
    formTop: '0rpx',
    selectedBlogIndex: null
  },

  //事件处理函数
  bindSendBlogTap: function (e) {
    wx.navigateTo({
      url: '/pages/post/post'
    })
  },

  bindTypeTap: function (e) {
    this.setData({
      blogType: e.currentTarget.dataset.blogtype
    })
    this.init()
  },

  bindListTap: function (e) {
    wx.navigateTo({
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

  catchCommentTap: function (e) {
    console.log(e)
    this.data.selectedBlogIndex = e.currentTarget.dataset.index
    this.setData({
      showComment: true,
      //formTop: (e.touches["0"].clientY - 90) + 'px'
      formTop: '240rpx'
    })
  },

  catchUserTap: function (e) {
    //参数名会自动转小写且不允许下划线
    wx.navigateTo({
      url: '/pages/user/user?otherusercode=' + e.currentTarget.dataset.otherusercode
    })
  },

  catchShareTap: function (e) {
    console.log(e)
    var that = this
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      },
      complete: function (res) {
        // 转发结束
        console.log(res)
      }
    })
  },

  catchFollowTap: function (e) {
    console.log(e)
    var i = e.currentTarget.dataset.index
    var that = this
    var followUserCode = that.data.blogs[i].userCode
    var hasFollow = that.data.blogs[i].hasFollow == 1
    app.follow(followUserCode, hasFollow, function () {
      for (var j in that.data.blogs) {
        if (that.data.blogs[j].userCode == followUserCode) {
          if (hasFollow) {
            that.data.blogs[j].hasFollow = 0
          } else {
            that.data.blogs[j].hasFollow = 1
          }
        }
      }
      //更新数据
      that.setData({
        blogs: that.data.blogs
      })
    })
  },

  init: function (lastBlogId) {
    app.showLoading()
    isLoading = true

    var that = this
    if (app.globalData.loginInfo && app.globalData.loginInfo.inReview && app.globalData.loginInfo.inReview == 'N') {
      that.setData({
        hidePost: false
      })
    }

    wx.request({
      url: app.globalData.baseURL + 'blog/newBlog.action',
      data: {
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
        blogType: that.data.blogType || '',
        lastBlogId: lastBlogId || '',
        rows: 6
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          if (res.data.content) {
            for (var i in res.data.content) {
              res.data.content[i].insertTime_fmt = util.formatTimeStamp(res.data.content[i].insertTime)
            }
            if (lastBlogId) {
              that.setData({
                blogs: that.data.blogs.concat(res.data.content)
              })
            } else {
              that.setData({
                blogs: res.data.content
              })
            }
          } else if (!lastBlogId) {
            that.setData({
              blogs: []
            })
          }
        } else if (res.data.status == -1) {
          // token is invalid
          app.fxReLogin(that.init)
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
        isLoading = false
        wx.stopPullDownRefresh()
      }
    })
  },

  contentFocus: function (e) {

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
      wx.navigateTo({
        url: '/pages/view/view?blogid=' + blog.blogId
      })
    })
  },

  onLoad: function (options) {
    console.log("onLoad options:" + options)
    this.setData({
      blogType: options.blogType || null
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

  //下拉刷新
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
    if (!isLoading) {
      if (this.data.blogs && (this.data.blogs.length % 6) == 0) {
        this.init(this.data.blogs[this.data.blogs.length - 1].blogId)
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
  }
})
