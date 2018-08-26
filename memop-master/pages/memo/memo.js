// pages/memo/memo.js

const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    note: '',
    show_date: '',   // 显示的计划日期
    picker_date: '', // picker中的起始日期
    ori_date: null,   // 日期对象,
    title_change: false,
    note_change: false,
    date_change: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ac = wx.getStorageSync('action')
    this.data.ori_date = wx.getStorageSync('plan_date')
    if (ac == 'add_memo') {
      this.showAddPage()
    } else if (ac == 'edit_memo') {
      this.showEditPage()
    }
  },

  showAddPage: function () {
    this.setData({
      picker_date: util.ymdDate(this.data.ori_date),
      show_date: util.formatDate(this.data.ori_date),
    })
  },

  showEditPage: function() {
    var m = wx.getStorageSync('selected_memo')
    this.setData({
      picker_date: util.ymdDate(this.data.ori_date),
      show_date: util.formatDate(this.data.ori_date),
      title: m.Title,
      note:  m.Content,
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
  
  },

  storeTitle: function (e) {
    if (this.data.title != e.detail.value) {
      this.data.title = e.detail.value
      this.data.title_change = true
    }
  },

  storeNote: function (e) {
    if (this.data.note != e.detail.value) {
      this.data.note = e.detail.value
      this.data.note_change = true
    }
  },

  postMemo: function () {
    console.log('title input: ', this.data.title)
    console.log('note input: ', this.data.note)

    if ((this.data.note_change || this.data.title_change || this.data.date_change)
        && (this.data.title.length > 0)) {
      var user = wx.getStorageSync('user_info')
      var m = wx.getStorageSync('selected_memo')
      var memoid = 0
      if (m) {
        memoid = m.Id
      }
      wx.setStorageSync('refresh', 1)
      wx.request({
        url: util.POST_MEMO_URL,
        method: 'GET',
        data: {
          memoid: memoid,
          userid: user.uid,
          title: this.data.title,
          content: this.data.note,
          plantime: util.getDayStartSecs(this.data.ori_date)
        }
      })
      this.data.title_change = false
      this.data.note_change = false
      this.data.date_change = false
    }
    wx.navigateBack({
    })
  },

  deleteMemo: function () {
    var user = wx.getStorageSync('user_info')
    var m = wx.getStorageSync('selected_memo')
    wx.setStorageSync('refresh', 1)
    wx.request({
      url: util.DELETE_MEMO_URL,
      method: 'GET',
      data: {
        userid: user.uid,
        memoid: m.Id,
      },
      complete: res => {
        wx.navigateBack({
        })
      }
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var n = new Date(e.detail.value)
    if (!sameDay(n, this.data.ori_date)) {
      this.data.ori_date = n
      this.data.date_change = true
      this.setData({
        picker_date: util.ymdDate(this.data.ori_date),
        show_date: util.formatDate(this.data.ori_date),
      })
    }

  }

})