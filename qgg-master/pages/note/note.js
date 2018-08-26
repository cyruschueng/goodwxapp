// note.js
const util = require('../../utils/util.js')
const app = getApp()

//var user = wx.getStorageSync('user_info')
var note = {}
var cs   = []

Page({
  data: {
    author_url: '',
    author_name: '',
    update_time: '',
    note_text: '',
    view_no: 0,
    comment_no: 0,
    thumb_no: 0,
    thumb_status: 1,
    comments: [],
    show_key: 'hidden',
    focus: false,
    b_distance: '0',
    disable: true,
  },

  onLoad: function(options) {
    var note_id = options.note_id
    this.getNoteDetail(note_id)

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onPullDownRefresh: function () {
    var note_select = wx.getStorageSync('selected_note')
    var note_id = note_select.message_id
    if (note_id) {
      this.getNoteDetail(note_id)
    }
    wx.stopPullDownRefresh()
  },

  onShareAppMessage: function () {
    return {
      title: '查看群聊的备忘录',
      imageUrl: '../../assets/images/memom.png',
    }
  },

  getNoteDetail: function(note_id) {
    var user = wx.getStorageSync('user_info')
    wx.request({
      url: util.GET_NOTE_DETAIL_URL,
      data: {
        user_id: user.uid,
        message_id: note_id,
        offset: 0,
        limit: 40
      },
      success: res => {
        note = res.data.data.message_info
        cs = res.data.data.comment_info
        this.showData()
      },
      fail: res => {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
        })
      },
      complete: res => {
      }
    })
  },

  getCommentList: function (offset, limit, gid) {
    var user = wx.getStorageSync('user_info')
    wx.request({
      url: util.GET_COMMNET_LIST_URL,
      method: 'POST',
      data: {
        user_id: user.uid,
        group_id: gid,
        offset: offset,
        limit: limit,
      },
      success: res => {
        delta_list = res.data.data.comment_info
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
        this.showData()
      }
    })
  },


  showData: function() {
    var note_select = wx.getStorageSync('selected_note')
    this.setData({
      author_url: note_select.user_head_img,
      author_name: note.user_group_name,
      note_text: note.message,
      update_time: util.getNoteTime(note_select.create_time),
      view_no: note.view_amount,
      thumb_no: note.thumb_amount,
      comment_no: cs.length, //comment_amount
      comments : cs,
      thumb_status: note.thumb_status
    })
  },

  onFocus: function() {
    //this.setData({
    //  edit_height: 'auto'
    //})
  },

  onUnFocus: function() {
    this.setData({
      disable: true,
      show_key: 'hidden',
      //b_distance: '0',
      comment: '',
    })
  },

  showEdit: function() {
    this.setData({
      disable: false,
      focus: true,
    })
    setTimeout(_ => {
      this.setData({
        show_key: 'visible',
        b_distance: '30%',
      })
    }, 300)
  },

  thumb_switch: function() {
    var note_select = wx.getStorageSync('selected_note')
    var user = wx.getStorageSync('user_info')
    var tmp_status = 1
    var tmp_no = this.data.thumb_no
    if (this.data.thumb_status == 1) {
      tmp_status = 2
      tmp_no++
      wx.request({
        url: util.THUMB_NOTE_URL,
        data: {
          user_id: user.uid,
          message_id: note_select.message_id
        }
      })
    } else {
      tmp_no--
      wx.request({
        url: util.UNTHUMB_NOTE_URL,
        method: 'POST',
        data: {
          user_id: user.uid,
          message_id: note_select.message_id
        }
      })
    }
    this.setData({
      thumb_status: tmp_status,
      thumb_no: tmp_no
    })
  },

  postComment: function(e) {
    var user = wx.getStorageSync('user_info')
    console.log('post comment')
    wx.request({
      url: util.POST_COMMENT_URL,
      method: 'POST',
      data: {
        user_id: user.uid,
        to_user_id: 0,
        message_id: note_select.message_id,
        comment: e.detail.value
      },
    })
  }

})