//me.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var isLoading = false;
Page({
  data: {
    loginInfo: null,
    expProgress: 0,
    signed: false,
    countBlog: 0,
    countFollow: 0,
    countFans: 0,
    tab: 1,
    blogs: [],
    follows: [],
    fans: [],
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
    wx.navigateTo({
      url: '/pages/post/post'
    })
  },

  catchTabTap: function (e) {
    console.log(e)
    var i = e.currentTarget.dataset.index
    var that = this
    that.setData({
      tab: i
    })

    if (i == 2 && that.data.follows.length == 0) {
      that.getFollow(1)
    } else if (i == 3 && that.data.fans.length == 0) {
      that.getFans(1)
    }
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
      formTop: (e.touches["0"].clientY - 90) + 'px'
    })
  },

  catchDeleteTap: function (e) {
    console.log(e)
    var i = e.currentTarget.dataset.index
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          app.del(that.data.blogs[i].blogId, function () {
            that.data.blogs.splice(i, 1)
            //更新数据
            that.setData({
              blogs: that.data.blogs
            })
          })
        }
      }
    })
  },

  catchUserTap: function (e) {
    //参数名会自动转小写且不允许下划线
    wx.navigateTo({
      url: '/pages/user/user?otherusercode=' + e.currentTarget.dataset.otherusercode
    })
  },

  catchFollowTap: function (e) {
    console.log(e)
    var i = e.currentTarget.dataset.index
    var that = this

    var item = null
    if (that.data.tab == 2) {
      item = that.data.follows[i]
    } else if (that.data.tab == 3) {
      item = that.data.fans[i]
    }

    if (item) {
      app.follow(item.userCode, item.hasFollow == 1, function () {
        if (item.hasFollow == 1) {
          item.hasFollow = 0
          that.data.countFollow = Number(that.data.countFollow) - 1
        } else {
          item.hasFollow = 1
          that.data.countFollow = Number(that.data.countFollow) + 1
        }

        //更新数据
        if (that.data.tab == 2) {
          for (var j in that.data.fans) {
            if (that.data.fans[j].userCode == item.userCode) {
              that.data.fans[j].hasFollow = item.hasFollow
            }
          }

          that.setData({
            follows: that.data.follows,
            fans: that.data.fans,
            countFollow: that.data.countFollow
          })
        } else if (that.data.tab == 3) {
          that.setData({
            follows: [],
            fans: that.data.fans,
            countFollow: that.data.countFollow
          })
        }
      })
    }
  },

  init: function () {
    var that = this
    if (app.globalData.loginInfo && app.globalData.loginInfo.inReview && app.globalData.loginInfo.inReview == 'N') {
      that.setData({
        hidePost: false
      })
    }

    if (app.globalData.loginInfo && app.globalData.loginInfo.tokenCode) {
      var loginInfo = app.globalData.loginInfo
      var expProgress = (loginInfo.nextLevelExpPoints && loginInfo.expPoints) ? loginInfo.expPoints / loginInfo.nextLevelExpPoints : 0;
      that.setData({
        tab: 1,
        follows: [],
        fans: [],
        loginInfo: loginInfo,
        expProgress: expProgress * 100
      })

      wx.request({
        url: app.globalData.baseURL + 'u/me.action',
        data: {
          tokenCode: app.globalData.loginInfo.tokenCode
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          if (res.data.status == 1 && res.data.content) {
            that.setData({
              signed: res.data.content.checkSign == 'signed',
              countBlog: res.data.content.countBlog,
              countFollow: res.data.content.countFollow,
              countFans: res.data.content.countFans
            })
          }
        }
      })
    }

    that.getUserBlog(1)
  },

  dailySign: function () {
    if (!this.data.signed && app.globalData.loginInfo && app.globalData.loginInfo.tokenCode) {
      var that = this
      wx.request({
        url: app.globalData.baseURL + 'u/dailySign.action',
        data: {
          tokenCode: app.globalData.loginInfo.tokenCode
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res)
          if (res.data.status == 1 && res.data.content) {
            if (res.data.content == 'dailySign') {
              wx.showToast({
                title: '签到成功',
                icon: 'success',
                duration: 2000
              })

              that.setData({
                signed: true
              })
            } else if (res.data.content == 'signed') {
              that.setData({
                signed: true
              })
            }
          }
        }
      })
    }
  },

  getUserBlog: function (page) {
    app.showLoading()
    isLoading = true

    var that = this
    wx.request({
      url: app.globalData.baseURL + 'blog/listUserBlog.action',
      data: {
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
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

  getFollow: function (page) {
    app.showLoading()
    isLoading = true

    var that = this
    wx.request({
      url: app.globalData.baseURL + 'u/myFollow.action',
      data: {
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
        rows: 6,
        page: page || 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1 && res.data.content) {
          if (page > 1) {
            that.setData({
              follows: that.data.follows.concat(res.data.content || [])
            })
          } else {
            that.setData({
              follows: res.data.content || []
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

  getFans: function (page) {
    app.showLoading()
    isLoading = true

    var that = this
    wx.request({
      url: app.globalData.baseURL + 'u/myFans.action',
      data: {
        tokenCode: app.globalData.loginInfo ? app.globalData.loginInfo.tokenCode : '',
        rows: 6,
        page: page || 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1 && res.data.content) {
          if (page > 1) {
            that.setData({
              fans: that.data.fans.concat(res.data.content || [])
            })
          } else {
            that.setData({
              fans: res.data.content || []
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
      wx.navigateTo({
        url: '/pages/view/view?blogid=' + blog.blogId
      })
    })
  },

  onLoad: function () {
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
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function () {
    if (!isLoading) {
      if (tab == 1) {
        if (this.data.blogs && (this.data.blogs.length % 6) == 0) {
          this.getUserBlog(1 + Number(this.data.blogs.length / 6))
        }
      } else if (tab == 2) {
        if (this.data.follows && (this.data.follows.length % 6) == 0) {
          this.getFollow(1 + Number(this.data.follows.length / 6))
        }
      } else if (tab == 3) {
        if (this.data.fans && (this.data.fans.length % 6) == 0) {
          this.getFans(1 + Number(this.data.fans.length / 6))
        }
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
