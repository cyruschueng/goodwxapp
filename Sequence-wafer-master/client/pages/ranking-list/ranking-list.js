const config = require('../../config')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectToday: true,
    selectSequence: true,
    todaySequenceList: [],
    todayUserList: [],
    allSequenceList: [],
    allUserList: [],
    getTodaySequenceComplete: false,
    getTodayUserComplete: false,
    getAllSequenceComplete: false,
    getAllUserComplete: false,
    showSwitchBtn: true,
    hideBtnTime: 0,
    canScroll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '今日排行榜',
    })
  },

  /**
   * 页面显示
   */
  onShow: function () {
    var selectSequence = this.data.selectSequence
    if (this.data.selectToday) {
      if (selectSequence) {
        this.getTodaySequenceList()
      } else if (!selectSequence) {
        this.getTodayUserList()
      }
    } else {
      if (selectSequence) {
        this.getAllSequenceList()
      } else if (!selectSequence) {
        this.getAllUserList()
      }
    }
  },

  /**
   * 切换标签
   */
  switchTab: function (event) {
    var selectSequence = event.currentTarget.id == "sequence"
    if (this.data.selectToday) {
      if (selectSequence) {
        this.getTodaySequenceList()
      } else if (!selectSequence) {
        this.getTodayUserList()
      }
    } else {
      if (selectSequence) {
        this.getAllSequenceList()
      } else if (!selectSequence) {
        this.getAllUserList()
      }
    }
    this.setData({
      selectSequence: selectSequence
    })
    this.data.canScroll = false
  },

  /**
    * 切换今、总排行榜
    */
  switchToday: function () {
    var selectToday = !this.data.selectToday
    var selectSequence = this.data.selectSequence
    if (selectToday) {
      if (selectSequence) {
        this.getTodaySequenceList()
      } else if (!selectSequence) {
        this.getTodayUserList()
      }
      wx.setNavigationBarTitle({
        title: '今日排行榜',
      })
    } else {
      if (selectSequence) {
        this.getAllSequenceList()
      } else if (!selectSequence) {
        this.getAllUserList()
      }
      wx.setNavigationBarTitle({
        title: '总排行榜',
      })
    }
    this.setData({
      selectToday: selectToday
    })
    this.data.canScroll = false
  },

  /**
   * 获取今日接龙排行榜
   */
  getTodaySequenceList: function () {
    util.httpGet(config.getTodaySequenceRank, {}, this.getTodaySequenceRankSuccess, this.getTodaySequenceRankFail)
  },

  /**
   * 获取今日接龙排行榜成功
   */
  getTodaySequenceRankSuccess: function (sequenceList) {
    wx.stopPullDownRefresh()
    this.setData({
      getTodaySequenceComplete: true,
      todaySequenceList: sequenceList
    })
  },

  /**
   * 获取今日接龙排行榜失败
   */
  getTodaySequenceRankFail: function (err) {
    wx.stopPullDownRefresh()
  },

  /**
   * 获取今日用户排行榜
   */
  getTodayUserList: function () {
    util.httpGet(config.getTodayUserRank, {}, this.getTodayUserRankSuccess, this.getTodayUserRankFail)
  },

  /**
   * 获取今日用户排行榜成功
   */
  getTodayUserRankSuccess: function (userList) {
    wx.stopPullDownRefresh()
    this.setData({
      getTodayUserComplete: true,
      todayUserList: userList
    })
  },

  /**
   * 获取今日用户排行榜失败
   */
  getTodayUserRankFail: function (err) {
    wx.stopPullDownRefresh()
  },

  /**
   * 获取总接龙排行榜
   */
  getAllSequenceList: function () {
    util.httpGet(config.getAllSequenceRank, {}, this.getAllSequenceRankSuccess, this.getAllSequenceRankFail)
  },

  /**
   * 获取总接龙排行榜成功
   */
  getAllSequenceRankSuccess: function (sequenceList) {
    wx.stopPullDownRefresh()
    this.setData({
      getAllSequenceComplete: true,
      allSequenceList: sequenceList
    })
  },

  /**
   * 获取总接龙排行榜失败
   */
  getAllSequenceRankFail: function (err) {
    wx.stopPullDownRefresh()
  },

  /**
   * 获取总用户排行榜
   */
  getAllUserList: function () {
    util.httpGet(config.getAllUserRank, {}, this.getAllUserRankSuccess, this.getAllUserRankFail)
  },

  /**
   * 获取总用户排行榜成功
   */
  getAllUserRankSuccess: function (userList) {
    wx.stopPullDownRefresh()
    this.setData({
      getAllUserComplete: true,
      allUserList: userList
    })
  },

  /**
   * 获取总用户排行榜失败
   */
  getAllUserRankFail: function (err) {
    wx.stopPullDownRefresh()
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    var selectSequence = this.data.selectSequence
    if (this.data.selectToday) {
      if (selectSequence) {
        this.getTodaySequenceList()
      } else if (!selectSequence) {
        this.getTodayUserList()
      }
    } else {
      if (selectSequence) {
        this.getAllSequenceList()
      } else if (!selectSequence) {
        this.getAllUserList()
      }
    }
  },

  /**
   * 页面触底
   */
  onReachBottom: function (event) {
    if (!this.data.canScroll) {
      return
    }
    // 隐藏切换按钮，避免遮挡
    this.setData({
      showSwitchBtn: false
    })
    var date = new Date()
    this.data.hideBtnTime = date.getTime()
  },

  /**
   * 页面滚动
   */
  onPageScroll: function (event) {
    this.data.canScroll = true
    if (this.data.showSwitchBtn == false) {
      var date = new Date()
      var time = date.getTime()
      if (time - this.data.hideBtnTime < 350) {
        return
      }
      // 显示切换按钮
      this.setData({
        showSwitchBtn: true
      })
    }
  }
})