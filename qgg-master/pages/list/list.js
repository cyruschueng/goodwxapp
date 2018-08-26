//logs.js
const util = require('../../utils/util.js')
const app = getApp()

var rpc_succ = false    // 网络请求成功标志
var delta_list = []     // 从后台拉取的群列表
var note_list = []     // 设置到视图的群列表数据


Page({
  data: {
    notes: [],
    motto: "hello",
    away: false,
    has_nlist: true,
    q_icon_url: '',
  },

  onLoad: function(options) {
    var group_id = options.group_id
    note_list = []
    wx.showLoading({
      title: '加载中',
    })
    this.getNoteList(0, 10, group_id, true)

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onShow: function () {
    this.data.away = false

    // if navback from a detail page, delete cache
    var note = wx.getStorageSync('selected_note')
    if (note) {
      wx.removeStorageSync('selected_note')
    }
    
    // if navback from edit page, a new note maybe commit. redo ui
    var edit = wx.getStorageSync('edit_note')
    var group = wx.getStorageSync('selected_group')
    if (edit == 1) {
      wx.setStorageSync('edit_note', 0)
      this.getNoteList(0, 20, group.group_id, true)
    }

    this.setData({
      edit_color: '#000000'
    })
  },

  onShareAppMessage: function () {
    return {
      title: '查看群聊的备忘录',
      imageUrl: '../../assets/images/memom.png',
    }
  },

  onPullDownRefresh: function () {
    var group = wx.getStorageSync('selected_group')
    if (group) {
      this.getNoteList(0, 10, group.group_id, true)
    }
    wx.stopPullDownRefresh()
  },
  
  getNoteList: function(offset, limit, gid, refresh) {
    var user = wx.getStorageSync('user_info')
    wx.request({
      url: util.GET_NOTE_LIST_URL,
      method: 'POST',
      data: {
        user_id: user.uid,
        open_id: user.openid,
        group_id: gid,
        offset: offset,
        limit: limit,
      },
      success: res => {
        delta_list = res.data.data
        rpc_succ = true
      },
      fail: res => {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
        })
      },
      complete: res => {
        wx.hideLoading()
        this.showData(refresh)
      }
    })
  },

  prepareData: function (refresh) {
    if (refresh) {
      note_list = []
    }
    for (var i = 0; i < delta_list.length; i++) {
      note_list.push(delta_list[i])
    }
  },

  showData: function(refresh) {
    this.prepareData(refresh)
    this.setData({
      notes: note_list,
      has_list: note_list.length > 0
    })
  },

  getNoteDetail: function(e) {
    if (!this.data.away) {
      this.data.away = true
      
      var target_id = e.currentTarget.id
      for (var i = 0; i < note_list.length; i++) {
        if (note_list[i].message_id == target_id) {
          note_list[i].read_status = 2
          wx.setStorageSync('selected_note', note_list[i])
          this.setData({
            notes: note_list,
            has_list: note_list.length > 0
          })
          break
        }
      }
      wx.navigateTo({
        url: '../note/note?note_id=' + target_id,
      })
    }

  },

  toEdit: function() {
    if (!this.data.away) {
      this.data.away = true
      
      this.setData({
        edit_color: '#8a8a8a'
      })

      wx.navigateTo({
        url: '../edit/edit',
      })
    }
  }
})
