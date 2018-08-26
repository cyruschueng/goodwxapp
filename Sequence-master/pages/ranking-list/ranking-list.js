const AV = require('../../libs/av-weapp-min')
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
    this.getTodaySequenceList()
    wx.setNavigationBarTitle({
      title: '今日排行榜',
    })
  },

  /**
   * 切换标签
   */
  switchTab: function (event) {
    var selectSequence = event.currentTarget.id == "sequence"
    if (this.data.selectToday) {
      if (selectSequence && !this.data.getTodaySequenceComplete) {
        this.getTodaySequenceList()
      } else if (!selectSequence && !this.data.getTodayUserComplete) {
        this.getTodayUserList()
      }
    } else {
      if (selectSequence && !this.data.getAllSequenceComplete) {
        this.getAllSequenceList()
      } else if (!selectSequence && !this.data.getAllUserComplete) {
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
      if (selectSequence && !this.data.getTodaySequenceComplete) {
        this.getTodaySequenceList()
      } else if (!selectSequence && !this.data.getTodayUserComplete) {
        this.getTodayUserList()
      }
      wx.setNavigationBarTitle({
        title: '今日排行榜',
      })
    } else {
      if (selectSequence && !this.data.getAllSequenceComplete) {
        this.getAllSequenceList()
      } else if (!selectSequence && !this.data.getAllUserComplete) {
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
   * 获取接龙今日排行榜
   */
  getTodaySequenceList: function () {
    util.showLoading()
    var that = this
    var date = new Date()
    var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    var query = new AV.Query('Sequence')
    query.greaterThanOrEqualTo("todayCount", 0)
    query.equalTo("today", today)
    query.descending('todayCount')
    query.limit(10)
    query.find().then(function (sequenceList) {
      util.hideLoading()
      wx.stopPullDownRefresh()
      that.setData({
        getTodaySequenceComplete: true,
        todaySequenceList: sequenceList
      })
    }, err => {
      util.hideLoading()
      wx.stopPullDownRefresh()
      console.log("获取今日接龙总榜失败", err)
    })
  },

  /**
   * 获取今日排行榜
   */
  getTodayUserList: function () {
    util.showLoading()
    var that = this
    var date = new Date()
    var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    var query = new AV.Query('User')
    query.greaterThanOrEqualTo("todayCount", 0)
    query.equalTo("today", today)
    query.descending('todayCount')
    query.limit(10)
    query.find().then(function (userList) {
      util.hideLoading()
      wx.stopPullDownRefresh()
      that.setData({
        getTodayUserComplete: true,
        todayUserList: userList
      })
    }, err => {
      util.hideLoading()
      wx.stopPullDownRefresh()
      console.log("获取用户总榜失败", err)
    })
  },

  /**
   * 获取接龙总排行榜
   */
  getAllSequenceList: function () {
    util.showLoading()
    var that = this
    var query = new AV.Query('Sequence')
    query.greaterThanOrEqualTo("idiomCount", 0)
    query.descending('idiomCount')
    query.limit(10)
    query.find().then(function (sequenceList) {
      util.hideLoading()
      wx.stopPullDownRefresh()
      that.setData({
        getAllSequenceComplete: true,
        allSequenceList: sequenceList
      })
    }, err => {
      util.hideLoading()
      wx.stopPullDownRefresh()
      console.log("获取接龙总榜失败", err)
    })
  },

  /**
   * 获取用户总排行榜
   */
  getAllUserList: function () {
    util.showLoading()
    var that = this
    var query = new AV.Query('User')
    query.greaterThanOrEqualTo("idiomCount", 0)
    query.descending('idiomCount')
    query.limit(10)
    query.find().then(function (userList) {
      util.hideLoading()
      wx.stopPullDownRefresh()
      that.setData({
        getAllUserComplete: true,
        allUserList: userList
      })
    }, err => {
      util.hideLoading()
      wx.stopPullDownRefresh()
      console.log("获取用户总榜失败", err)
    })
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