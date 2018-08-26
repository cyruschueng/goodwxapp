const AV = require('../../libs/av-weapp-min')
const util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    joinList: [],
    followList: [],
    getJoinComplete: false,
    getFollowComplete: false,
    hasUserInfo: false,
    selectJoin: true,
    currentJoinPage: 0,
    hasNextJoinPage: true,
    loadingNextJoinPage: false,
    currentFollowPage: 0,
    hasNextFollowPage: true,
    loadingNextFollowPage: false,
    showCreateBtn: true,
    hideBtnTime: 0,
    canScroll: false,
    canGetUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var date = new Date()
    if ((date.getHours() > 0 && date.getHours() < 7) ||
      (date.getHours() == 7 && date.getMinutes() < 30)) {
      // 01:00 - 07:30 后台处于休眠
      wx.redirectTo({
        url: '/pages/sleep/sleep'
      })
    } else {
      var app = getApp()
      app.login(this.loginSuccess, this.updateUserSuccess)
      // 显示转发按钮
      if (wx.showShareMenu) {
        wx.showShareMenu()
      }
      //检查客户端基础库 
      wx.getSystemInfo({
        success: function (res) {
          // 从基础库1.3.0开始，才能使用 getUserInfo 的 button
          if (res.SDKVersion != null &&
            parseFloat(res.SDKVersion.substring(0, 4)) >= 1.3) {
            that.setData({
              canGetUserInfo: true
            })
          }
        }
      })
    }
  },

  /**
   * 页面显示
   */
  onShow: function () {
    if (getApp().globalData.refreshSequenceList) {
      getApp().globalData.refreshSequenceList = false
      this.data.getJoinComplete = false
      this.data.getFollowComplete = false
      // 刷新两个页面
      this.data.currentJoinPage = 0
      this.data.hasNextJoinPage = true
      this.getJoinSequences()
      this.data.currentFollowPage = 0
      this.data.hasNextFollowPage = true
      this.getFollowSequences()
    }
  },

  /**
   * 登录成功
   */
  loginSuccess: function () {
    this.getSequencesFirstPage()
  },

  /**
   * 更新用户信息成功
   */
  updateUserSuccess: function () {
    this.setData({
      hasUserInfo: true
    })
  },

  /**
   * 接龙首页
   */
  getSequencesFirstPage: function () {
    util.showLoading()
    if (this.data.selectJoin) {
      this.data.currentJoinPage = 0
      this.data.hasNextJoinPage = true
      this.getJoinSequences()
    } else {
      this.data.currentFollowPage = 0
      this.data.hasNextFollowPage = true
      this.getFollowSequences()
    }
  },

  /**
   * 接龙下一页
   */
  getSequencesNextPage: function () {
    if (this.data.selectJoin) {
      this.getJoinSequences()
    } else {
      this.getFollowSequences()
    }
  },

  /**
   * 获取参与的接龙
   */
  getJoinSequences: function () {
    if (!this.data.hasNextJoinPage || this.data.loadingNextJoinPage) {
      return
    }
    this.setData({
      loadingNextJoinPage: true
    })
    var pageSize = 10
    var that = this
    var user = getApp().globalData.user
    if (user == null) {
      return
    }
    var currentJoinPage = this.data.currentJoinPage
    AV.Cloud
      .run('getJoinSequences', { userId: user.id, page: currentJoinPage + 1 })
      .then(joinList => {
        util.hideLoading()
        wx.stopPullDownRefresh()
        that.data.currentJoinPage = currentJoinPage + 1
        var hasNextJoinPage
        if (joinList != null && joinList.length == pageSize) {
          hasNextJoinPage = true
        } else {
          hasNextJoinPage = false
        }
        var allJoinList
        if (that.data.currentJoinPage == 1) {
          allJoinList = joinList
        } else {
          allJoinList = that.data.joinList.concat(joinList)
        }
        that.setData({
          getJoinComplete: true,
          joinList: allJoinList,
          hasNextJoinPage: hasNextJoinPage,
          loadingNextJoinPage: false
        })
      }, err => {
        util.hideLoading()
        wx.stopPullDownRefresh()
        console.log("获取参与的接龙失败", err)
        that.setData({
          hasNextJoinPage: true,
          loadingNextJoinPage: false
        })
      })
  },

  /**
   * 获取围观的接龙
   */
  getFollowSequences: function () {
    if (!this.data.hasNextFollowPage || this.data.loadingNextFollowPage) {
      return
    }
    this.setData({
      loadingNextFollowPage: true
    })
    var pageSize = 10
    var that = this
    var user = getApp().globalData.user
    if (user == null) {
      return
    }
    var currentFollowPage = this.data.currentFollowPage
    AV.Cloud
      .run('getFollowSequences', { userId: user.id, page: currentFollowPage + 1 })
      .then(followList => {
        util.hideLoading()
        wx.stopPullDownRefresh()
        that.data.currentFollowPage = currentFollowPage + 1
        var hasNextFollowPage
        if (followList != null && followList.length == pageSize) {
          hasNextFollowPage = true
        } else {
          hasNextFollowPage = false
        }
        var allFollowList
        if (that.data.currentFollowPage == 1) {
          allFollowList = followList
        } else {
          allFollowList = that.data.followList.concat(followList)
        }
        that.setData({
          getFollowComplete: true,
          followList: allFollowList,
          hasNextFollowPage: hasNextFollowPage,
          loadingNextFollowPage: false
        })
      }, err => {
        util.hideLoading()
        wx.stopPullDownRefresh()
        console.log("获取围观的接龙失败", err)
        that.setData({
          hasNextFollowPage: true,
          loadingNextFollowPage: false
        })
      })
  },

  /**
   * 切换标签
   */
  switchTab: function (event) {
    var selectJoin = event.currentTarget.id == "join"
    if (selectJoin && !this.data.getJoinComplete) {
      this.getJoinSequences()
    } else if (!selectJoin && !this.data.getFollowComplete) {
      this.getFollowSequences()
    }
    this.setData({
      selectJoin: selectJoin
    })
    this.data.canScroll = false
  },

  /**
   * 跳转接龙详情页面
   */
  navigateToIdiomList: function (event) {
    var index = event.currentTarget.id
    var id
    if (this.data.selectJoin) {
      id = this.data.joinList[index].objectId
    } else {
      id = this.data.followList[index].objectId
    }
    wx.navigateTo({
      url: '/pages/idiom-list/idiom-list?id=' + id
    })
  },

  /**
   * 跳转创建接龙页面
   */
  navigateToCreate: function () {
    wx.navigateTo({
      url: '/pages/create-sequence/create-sequence'
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    var app = getApp()
    if (e.detail.userInfo) {
      app.updateUserInfo(e.detail.userInfo, this.updateUserSuccess)
      this.navigateToCreate()
    }
  },

  /**
   * 跳转设置页面，获取用户信息
   */
  openSetting: function () {
    var that = this
    var app = getApp()
    wx.getUserInfo({
      success: function (res) {
        app.updateUserInfo(res.userInfo, that.updateUserSuccess)
        that.navigateToCreate()
      },
      fail: function (res) {
        if (wx.openSetting) {
          wx.openSetting({
            success: function (res) {
              wx.getUserInfo({
                success: function (res) {
                  app.updateUserInfo(res.userInfo, that.updateUserSuccess)
                  that.navigateToCreate()
                },
                fail: function (res) {
                  wx.showModal({
                    showCancel: false,
                    content: "需要您的授权才可创建接龙"
                  })
                }
              })
            }
          })
        } else {
          wx.showModal({
            showCancel: false,
            content: "您的微信版本过低，请升级到最新版微信后创建接龙"
          })
        }
      }
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.getSequencesFirstPage()
  },

  /**
   * 上拉加载
   */
  onReachBottom: function (event) {
    this.getSequencesNextPage()
    if (!this.data.canScroll) {
      return
    }
    // 隐藏创建按钮，避免遮挡
    this.setData({
      showCreateBtn: false
    })
    var date = new Date()
    this.data.hideBtnTime = date.getTime()
  },

  /**
   * 页面滚动
   */
  onPageScroll: function (event) {
    this.data.canScroll = true
    if (this.data.showCreateBtn == false) {
      var date = new Date()
      var time = date.getTime()
      if (time - this.data.hideBtnTime < 350) {
        return
      }
      // 显示创建按钮
      this.setData({
        showCreateBtn: true
      })
    }
  }

})
