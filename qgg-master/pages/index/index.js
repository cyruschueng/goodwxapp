//index.js
//获取应用实例
const util = require('../../utils/util.js')
const common = require('../../utils/common.js')
const app = getApp()

var rpc_succ = false;        // 网络请求成功标志
var delta_list = []          // 从后台拉取的群列表
var group_list = []          // 设置到视图的群列表数据
var refresh = false          // 是否是刷新操作

Page({
  data: {
    motto: 'Hello World',
    has_list: true,
    q_list: [],
    away: false,
    bottom: false,
    show_toast: false,
    toast_data: [],
  },

  onLoad: function() {
    group_list = []

    // 建立用户个人信息缓存
    var user = wx.getStorageSync('user_info')
    if (user && user.uid && user.openid) {
      this.run_next()
    } else {
      this.start_by_login()
    }

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  onShow: function() {
    this.data.away = false

    // if navback from memo list, reset the group color
    var group = wx.getStorageSync('selected_group')
    if (group) {
      this.resetData(group)
      wx.removeStorageSync('selected_group')
    }
  },

  onPullDownRefresh: function() {
    refresh = true
    this.getGroupList(0, 10)
    wx.stopPullDownRefresh()
  },

  onReachBottom: function() {
    var curr_size = group_list.length
    if (curr_size >= 10 && curr_size % 10 == 0) {
      this.getGroupList(10, 10)
    }
  },

  onShareAppMessage: function() {
    return {
      title: '查看群聊的备忘录',
      imageUrl: '../../assets/images/memom.png',
      success: res => {
        // 转发成功
        console.log('after share', res)
        var user = wx.getStorageSync('user_info')
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: gres => {
            wx.request({
              url: util.GET_GROUP_INFO_URL,
              method: 'POST',
              data: {
                encrypted_data: gres.encryptedData,
                iv: gres.iv,
                user_id: user.uid,
                open_id: user.openid
              },
              success: ires => {
                refresh = true
                this.getGroupList(0, 10)
              } 
            })
          },
          fail: res => {

          }
        })
      },
    }
  },

  /**
   * 如果没有用户信息缓存，就重新登陆
   */
  start_by_login: function () {
    var user = {}
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: util.LOGIN_URL,
          method: 'POST',
          data: {
            code: res.code
          },
          success: cres => {
            user.uid = cres.data.data[0].id
            user.openid = cres.data.data[0].open_id
            wx.getUserInfo({
              success: gres => {
                user.url = gres.userInfo.avatarUrl
                user.name = gres.userInfo.nickName
                // store user info in cache
                wx.setStorageSync('user_info', user)
                wx.request({
                  url: util.POST_USER_INFO_URL,
                  method: 'POST',
                  data: {
                    head_img: user.url,
                    nick_name: user.name,
                    user_id: user.uid,
                    open_id: user.openid
                  }
                })
                // login complete，continue
                this.run_next()
              },
              fail: gres => {
                wx.hideLoading()
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                })
              }
            })
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

  /**
   * check sence value
   */
  run_next: function () {
    var options = wx.getStorageSync('lanuch_op')
    console.log('options from cache', options)
    if (options.scene == '1008' && options.query.shareTicket) {
      console.log('from a group')
      // from a group, go to group board direct
      wx.checkSession({
        success: res => {
          this.getGroupInfo(options.query.shareTicket)
        },
        fail: res => {
          wx.login({
            complete: res => {
              this.getGroupInfo(options.query.shareTicket)
            }
          })
        }
      })
    } else {
      console.log('from normal')
      this.getGroupList(0, 10)
    }
  },

  getGroupInfo: function (shareTicket) {
    var user = wx.getStorageSync('user_info')
    wx.getShareInfo({
      shareTicket: shareTicket,
      success: res => {
        wx.request({
          method: 'POST',
          url: util.GET_GROUP_INFO_URL,
          data: {
            encrypted_data: res.encryptedData,
            iv: res.iv,
            user_id: user.uid,
            open_id: user.openid
          },
          success: gres => {
            var group = {}
            group.group_id = gres.data.data.group_id
            group.open_gid = ires.data.data.open_gid
            wx.setStorageSync('selected_group', group)
            wx.redirectTo({
              url: '../list/list?group_id=' + group.group_id,
            })
          }
        })
      },
      fail: res => {
        wx.hideLoading()
        console.log('getShareInfo fail')
      }
    })

  },

  /**
   * 从后端获取群列表
   */
  getGroupList: function (offset, limit) {
    var user = wx.getStorageSync('user_info')
    wx.request({
      url: util.GET_GROUP_LIST_URL,
      method: 'POST',
      data: {
        user_id: user.uid,
        open_id: user.openid,
        offset: offset,
        limit: limit,
      },
      success: res => {
        delta_list = res.data.data
        rpc_succ = true
      },
      fail: res => {
        if (refresh) {
          wx.showToast({
            title: '加载失败',
            icon: 'none',
          })
        }
      },
      complete: res => {
        // 初始加载时，有个loading的圈圈要消掉
        wx.hideLoading()
        this.showData()
        app.globalData.app_status == 1
      }
    })
  },

  /**
   * 显示数据
   */
  showData: function() {
    this.prepareData()

    this.setData({
      q_list: group_list,
      has_list: group_list.length > 0
    })
  },

  /**
   * 将后端获取的数据进行处理，适配为视图层需要的格式
   */
  prepareData: function() {
    if (refresh) {
      group_list = []
      refresh = false
    }
    for (var i = 0; i < delta_list.length; i++) {
      delta_list[i].active = util.getIndexTime(delta_list[i].last_edit_message_time)
      delta_list[i].color = '#ffffff'
      group_list.push(delta_list[i])
    }
  },

  resetData: function(target) {
    var target_id = target.group_id
    var found = false
    var i = 0
    for ( ; i < group_list.length; i++) {
      if (group_list[i].group_id == target_id) {
        group_list[i].color = '#ffffff'
        found = true        
        break
      }
    }
    if (found) {
      this.setData({
        q_list: group_list,
        has_list: group_list.length > 0
      })
    }
  },

  toNoteList: function(e) {
    if (!this.data.away) {
      this.data.away = true
      
      var id = e.currentTarget.id
      for (var i = 0; i < group_list.length; i++) {
        if (group_list[i].group_id == id) {
          group_list[i].read_status = 2
          group_list[i].color = '#ebebeb'
          this.setData({
            q_list: group_list,
            has_list: group_list.length > 0
          })
          wx.setStorageSync('selected_group', group_list[i])
        }
      }
      wx.navigateTo({
        url: '../list/list?group_id=' + id,
      })
    }
  },
})
