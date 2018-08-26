//app.js
App({
  onLaunch: function () {
    //获取分享数据--无效
    //wx.getShareInfo()

    //调用API从本地缓存中获取数据
    var loginInfo = wx.getStorageSync('loginInfo')
    if (loginInfo) {
      if (loginInfo.lastLoginDate
        && (Number(loginInfo.lastLoginDate) + 3 * 60 * 60 * 1000) > new Date().getTime()) {
        this.globalData.loginInfo = loginInfo
      } else {
        wx.removeStorageSync('loginInfo')
      }
    }
  },

  globalData: {
    loginInfo: null,
    // domain: 'fxapp.xin',
    baseURL: 'https://fxapp.xin/fenxiang/' // prd
    // baseURL: 'https://fxapp.xin/fenxiang_test/' // test
    // baseURL: 'https://127.0.0.1/fenxiang/' // dev
  },

  onShow: function () {
    //当小程序启动，或从后台进入前台显示，会触发 onShow

  },

  onHide: function () {
    //当小程序从前台进入后台，会触发 onHide

  },
  onError: function () {
    //当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息

  },

  showLoading: function () {
    wx.showToast({
      title: 'loading...',
      icon: 'loading',
      duration: 15000
    })
    wx.showNavigationBarLoading()
  },

  hideLoading: function () {
    wx.hideToast()
    wx.hideNavigationBarLoading()
  },

  fxLogin: function (cb) {
    if (this.globalData.loginInfo) {
      typeof cb == "function" && cb()
      return
    }

    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        that.getLoginInfo(res.code, cb)
      },
      fail: function (res) {
        console.log('用户登录失败，无法获取敏感信息')
      }
    })
  },

  fxReLogin: function (cb) {
    this.globalData.loginInfo = null
    wx.removeStorageSync('loginInfo')
    this.fxLogin(cb)
  },

  getLoginInfo: function (code, cb) {
    var that = this
    that.showLoading()
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log(res)
        that.showLoading()
        wx.request({
          // url: that.globalData.baseURL + 'wxLoginTest.action',
          url: that.globalData.baseURL + 'wxLogin.action',
          data: {
            code: code,
            userInfo: res.rawData,
            encryptedData: res.encryptedData,
            iv: res.iv,
            signature: res.signature
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.data.status == 1 && res.data.content && res.data.content.tokenCode) {
              that.globalData.loginInfo = res.data.content
              wx.setStorageSync('loginInfo', that.globalData.loginInfo)
              typeof cb == "function" && cb()
            }
          },
          fail: function (res) {
            that.changeSetting(cb)
          },
          complete: function (res) {
            that.hideLoading()
          }
        })
      },
      fail: function (res) {
        that.changeSetting(cb)
      },
      complete: function (res) {
        that.hideLoading()
      }
    })
  },

  changeSetting: function (cb) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '请您授权，看看朋友们纷享的美食',
      showCancel: false,
      success: function (res) {
        console.log(res)
        wx.openSetting({
          success: function (res) {
            console.log(res)
            if (res.authSetting && res.authSetting["scope.userInfo"]) {
              that.getLoginInfo(cb)
            } else {
              that.changeSetting(cb)
            }
          },
          fail: function (res) {
            that.changeSetting(cb)
          }
        })
      }
    })
  },

  getUserInfo: function (otherUserCode, cb) {
    var that = this
    that.showLoading()
    wx.request({
      url: that.globalData.baseURL + 'u/view.action',
      data: {
        tokenCode: that.globalData.loginInfo.tokenCode,
        otherUserCode: otherUserCode
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1 && res.data.content) {
          typeof cb == "function" && cb(res.data.content)
        }
      },
      complete: function (res) {
        that.hideLoading()
      }
    })
  },

  like: function (blogId, dislike, cb) {
    console.log('like:' + blogId)
    if (!blogId) {
      return
    }

    var that = this
    wx.request({
      url: that.globalData.baseURL + 'blog/' + (dislike ? 'unlike.action' : 'like.action'),
      data: {
        tokenCode: that.globalData.loginInfo.tokenCode,
        blogId: blogId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: dislike ? '取消点赞成功' : '点赞成功',
            icon: 'success',
            duration: 2000
          })
          typeof cb == "function" && cb()
        } else {
          wx.showModal({
            title: '出错啦',
            content: '网络不给力啊',
            showCancel: false
          })
        }
      }
    })
  },

  follow: function (followUserCode, hasFollow, cb) {
    console.log('follow:' + followUserCode)
    if (!followUserCode) {
      return
    }

    var that = this
    wx.request({
      url: that.globalData.baseURL + 'u/' + (hasFollow ? 'unFollow.action' : 'follow.action'),
      data: {
        tokenCode: that.globalData.loginInfo.tokenCode,
        followUserCode: followUserCode
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: hasFollow ? '取消关注成功' : '关注成功',
            icon: 'success',
            duration: 2000
          })
          typeof cb == "function" && cb()
        } else if (res.data.status == 'follow.alreadyFollowed' || res.data.status == 'follow.notFollowed') {
          typeof cb == "function" && cb()
        } else {
          wx.showModal({
            title: '出错啦',
            content: '网络不给力啊',
            showCancel: false
          })
        }
      }
    })
  },

  comment: function (blogId, content, selectComment, cb) {
    console.log('comment:' + blogId + ' \t\t ' + content)
    if (!blogId) {
      return
    }

    var that = this
    if (!content) {
      wx.showModal({
        title: '提示',
        content: '点评一下吧',
        showCancel: false
      })
      return
    }

    that.showLoading()
    wx.request({
      url: that.globalData.baseURL + 'blog/comment.action',
      data: {
        tokenCode: that.globalData.loginInfo.tokenCode,
        commentContent: content,
        blogId: blogId,
        refCommentId: selectComment ? selectComment.commentId : '',
        atList: selectComment ? selectComment.userCode : ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '点评成功',
            icon: 'success',
            duration: 2000
          })
          typeof cb == "function" && cb()
        } else {
          wx.showModal({
            title: '出错啦',
            content: '网络不给力啊',
            showCancel: false
          })
        }
      },
      complete: function (res) {
        that.hideLoading()
      }
    })
  },

  del: function (blogId, cb) {
    console.log('del:' + blogId)
    if (!blogId) {
      return
    }

    var that = this
    wx.request({
      url: that.globalData.baseURL + 'blog/remove.action',
      data: {
        tokenCode: that.globalData.loginInfo.tokenCode,
        blogId: blogId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          typeof cb == "function" && cb()
        } else {
          wx.showModal({
            title: '出错啦',
            content: '网络不给力啊',
            showCancel: false
          })
        }
      }
    })
  }
})
