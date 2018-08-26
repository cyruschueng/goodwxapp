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

  onLoad: function () {
    wx.showLoading({
      title: '',
      mask: true
    })
    
    this.data.ori_date = new Date()
    wx.setStorageSync('refresh', 0)

    // 建立用户个人信息缓存
    var user = wx.getStorageSync('user_info')
    if (user && user.uid && user.openid) {
      this.runNext()
    } else {
      this.startByLogin()
    }

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  startByLogin: function () {
    console.log("start by login")
    var user = {}
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: util.LOGIN_URL,
          method: 'GET',
          data: {
            code: res.code
          },
          success: cres => {
            if (cres.data.Errno == 0) {
              user.uid = cres.data.Data.Id
              user.openid = cres.data.Data.Openid
              wx.getUserInfo({
                success: gres => {
                  user.url = gres.userInfo.avatarUrl
                  user.name = gres.userInfo.nickName
                  // store user info in cache
                  wx.setStorageSync('user_info', user)
                  wx.request({
                    url: util.POST_USER_INFO_URL,
                    method: 'GET',
                    data: {
                      head_img: user.url,
                      nick_name: user.name,
                      userid: user.uid,
                      openid: user.openid
                    }
                  })
                  // login complete，continue
                  this.runNext()
                },
                fail: gres => {
                  wx.hideLoading()
                  wx.showToast({
                    title: '登录失败',
                    icon: 'none',
                  })
                }
              })
            } else {
              wx.hideLoading()
              wx.showToast({title: '登录失败',icon: 'none'})
            }
          },
          fail: cres => {
            wx.hideLoading()
            wx.showToast({
              title: '登录失败',
              icon: 'none',
            })
          }
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '登录失败',
          icon: 'none',
        })
      }
    })
  },

  runNext: function () {
    console.log("run next")
    var options = wx.getStorageSync('lanuch_op')
    if (options.scene == '1008' && options.query.shareTicket) {
      wx.checkSession({
        success: res => {
          this.getGroupMemo(options.query.shareTicket)
        },
        fail: res => {
          wx.login({
            complete: res => {
              wx.request({
                url: util.LOGIN_URL,
                method: post,
                data: {
                  code: res.code
                },
                complete: lres => {
                  this.getGroupMemo(options.query.shareTicket)
                }
              })
            }
          })
        }
      })
    } else {
      this.getTodayList(0, 20)
    }
  },

  getGroupMemo: function () {
    var user = wx.getStorageSync('user_info')
    wx.getShareInfo({
      shareTicket: shareTicket,
      success: res => {
        wx.request({
          method: 'GET',
          url: util.GET_GROUP_MEMO_URL,
          data: {
            encrypted_data: res.encryptedData,
            iv: res.iv,
            userid: user.uid,
            offset: 0,
            limit: 10, 
          },
          success: gres => {
            var group = {}
            if (gres.data.Data.memos.length > 0) {
              wx.setStorageSync("group_memos", gres.data.Data.memos)
              wx.redirectTo({
                url: '../list/list?opengid=' + gres.data.Data.opengid
              })
              wx.hideLoading()
            }
          }
        })
      },
      fail: res => {
        wx.hideLoading()
        console.log('getShareInfo fail')
      }
    })
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


  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var d = new Date(e.detail.value)

    var to = new Date()
    if (util.sameDay(d, to)) {
      console.log('same day')
      // do nothing
    }
    if (util.pastDay(d, to)) {
      console.log('past ', util.weekDay(d))
      wx.navigateTo({
        url: '../past/past?date=' +  d,
      })
    } else if (util.futureDay(d, to)) {
      console.log('future ', util.weekDay(d))
      wx.navigateTo({
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
          wx.setStorageSync('selected_memo', this.data.todos[i])
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
