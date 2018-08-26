//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    todos: '',
    has_todo: false,
    picker_date: '',  // picker的起始值, like: 2018-04-18
    show_date: '',    // 页面上显示的时间, like: 2018年4月18日
    ori_date: null,    // 当前页面的Date对象, like: new Date()
    week: '',
    away: false
  },

  onLoad: function (options) {
    wx.setStorageSync('refresh', 0)
    this.data.ori_date = new Date(options.date)

    this.getTodayList(0, 20)

    this.setData({
      show_date: util.formatDate(this.data.ori_date),
      picker_date: util.ymdDate(this.data.ori_date),
      week: util.weekDay(this.data.ori_date)
    })
  },

  onShow: function () {
    this.data.away = false
    this.setData({
      show_date: util.formatDate(this.data.ori_date),
      picker_date: util.ymdDate(this.data.ori_date)
    })

    var refresh = wx.getStorageSync('refresh')
    if (refresh == 1) {
      wx.setStorageSync('refresh', 0)
      this.getTodayList(0, 20)
    }
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  getTodayList: function (offset, limit) {
    var user = wx.getStorageSync('user_info')
    wx.request({
      url: util.GET_MEMO_LIST_URL,
      method: 'GET',
      data: {
        userid: user.uid,
        plantime: util.getDayStartSecs(this.data.ori_date),
        offset: offset,
        limit: limit,
      },
      success: res => {
        if (res.data.Data.Memos) {
          this.setData({
            todos: res.data.Data.Memos,
            has_todo: res.data.Data.Memos.length > 0,
          })
        }
      },
      fail: res => {

      },
      complete: res => {
        // 初始加载时，有个loading的圈圈要消掉
        wx.hideLoading()
      }
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    var d = new Date(e.detail.value)
    var to = new Date()
    var c = new Date(this.data.ori_date)
    if (util.sameDay(d, c)) {
      // do nothing
      console.log('same day in past page')
    } else if (util.sameDay(d, to)) {
      wx.navigateBack({
        
      })
    } else if (util.pastDay(d, to)) {
      wx.redirectTo({
        url: '../past/past?date=' + d,
      })
    } else if (util.futureDay(d, to)) {
      wx.redirectTo({
        url: '../future/future?date=' + d,
      })
    }
  },

  getNoteDetail: function (e) {
    if (!this.data.away) {
      this.data.away = true

      var target_id = e.currentTarget.id
      for (var i = 0; i < this.data.todos.length; i++) {
        if (this.data.todos[i].Id == target_id) {
          wx.setStorageSync('selected_todo', this.data.todos[i])
        }
      }
      wx.setStorageSync('action', 'edit_memo')
      wx.setStorageSync('plan_date', this.data.ori_date)
      wx.navigateTo({
        url: '../memo/memo',
      })
    }

  },

  addMemo: function () {
    if (!this.data.away) {
      this.data.away = true

      wx.setStorageSync('action', 'add_memo')
      wx.setStorageSync('plan_date', this.data.ori_date)
      wx.navigateTo({
        url: '../memo/memo',
      })
    }
  }

}

)
