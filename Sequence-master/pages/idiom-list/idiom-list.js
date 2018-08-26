const AV = require('../../libs/av-weapp-min')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    sequence: null,
    idiomList: [],
    hasUserInfo: false,
    inputIdiom: "",
    inputIdiomPinyin: [],
    userSequenceMap: null,
    isJoin: false,
    canInput: false,
    isLastCreator: false,
    canSend: false,
    toView: "",
    inputValue: "",
    currentPage: 0,
    hasNextPage: true,
    loadingNextPage: false,
    hasCheckRelation: false,
    shouldSaveIdiom: false,
    canGetUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var date = new Date()
    if ((date.getHours() > 0 && date.getHours() < 7) ||
      (date.getHours() == 7 && date.getMinutes() < 30)) {
      // 01:00 - 07:30 后台处于休眠
      wx.redirectTo({
        url: '/pages/sleep/sleep'
      })
    } else {
      this.data.id = options.id
      var app = getApp()
      if (!app.globalData.hasLogin) {
        app.login(this.loginSuccess, this.updateUserSuccess)
      } else {
        this.setData({
          hasUserInfo: app.globalData.hasUserInfo
        })
        util.showLoading()
        this.getSequence()
        this.getIdioms()
      }
      // 转发可获取转发目标信息
      if (wx.showShareMenu) {
        wx.showShareMenu({
          withShareTicket: true
        })
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
   * 登录成功
   */
  loginSuccess: function () {
    util.showLoading()
    this.getSequence()
    this.getIdioms()
  },

  /**
   * 更新用户信息成功
   */
  updateUserSuccess: function () {
    this.setData({
      hasUserInfo: true
    })
    var sequence = this.data.sequence
    if (sequence == null) {
      return
    }
    if (sequence.get("type") == "two" && sequence.get("imgList").length < 2) {
      // 重新获取接龙数据，设置关系
      this.getSequence()
    } else if (this.data.shouldSaveIdiom) {
      // 保存成语
      this.data.shouldSaveIdiom = false
      this.onSubmit()
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (res) {
    var app = getApp()
    if (res.detail.userInfo) {
      util.showLoading()
      app.updateUserInfo(res.detail.userInfo, this.updateUserSuccess)
    }
    // 获取到用户信息后保存成语
    this.data.shouldSaveIdiom = true
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
        that.data.shouldSaveIdiom = true
      },
      fail: function (res) {
        if (wx.openSetting) {
          wx.openSetting({
            success: function (res) {
              wx.getUserInfo({
                success: function (res) {
                  app.updateUserInfo(res.userInfo, that.updateUserSuccess)
                  that.data.shouldSaveIdiom = true
                },
                fail: function (res) {
                  wx.showModal({
                    showCancel: false,
                    content: "需要您的授权才可接龙"
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
   * 获取接龙
   */
  getSequence: function () {
    var that = this
    var sequence = AV.Object.createWithoutData('Sequence', this.data.id)
    sequence.fetch().then(function () {
      that.setData({
        sequence: sequence
      })

      if (!that.data.hasCheckRelation) {
        that.checkRelation()
      }
      wx.setNavigationBarTitle({
        title: sequence.get("title"),
      })
    }, function (error) {
      console.log("获取接龙失败", error)
    })
  },

  /**
   * 检查用户、接龙关系
   */
  checkRelation: function () {
    var that = this
    var user = getApp().globalData.user
    var sequence = this.data.sequence
    var query = new AV.Query('UserSequenceMap')
    query.equalTo('user', user)
    query.equalTo('sequence', sequence)
    query.first().then(function (userSequenceMap) {
      that.data.hasCheckRelation = true
      if (userSequenceMap != null) {
        that.data.userSequenceMap = userSequenceMap
        // 更新关系表，用于更新首页排序
        userSequenceMap.save()
        that.data.isJoin = userSequenceMap.get("join")
        if (that.data.isJoin || sequence.get("type") == "all") {
          that.setData({
            canInput: true
          })
        } else if (sequence.get("type") == "group") {
          that.setGroupTypeRelation()
        } else if (sequence.get("type") == "two" && sequence.get("imgList").length < 2) {
          that.setTwoTypeRelation()
        }
      } else {
        if (sequence.get("type") == "all") {
          that.setAllTypeRelation()
        } else if (sequence.get("type") == "group") {
          that.setGroupTypeRelation()
        } else if (sequence.get("type") == "two") {
          that.setTwoTypeRelation()
        }
      }
    }, function (err) {
      console.log("查找用户、群关系失败", err)
    })
  },

  /**
   * 建立和全平台类型接龙的关系
   */
  setAllTypeRelation: function () {
    this.setData({
      canInput: true
    })
    this.setFollowRelation()
  },

  /**
   * 建立和群类型接龙的关系
   */
  setGroupTypeRelation: function () {
    var that = this
    var shareTicket = getApp().globalData.shareTicket
    if (shareTicket != null) {
      var user = getApp().globalData.user
      var sequence = this.data.sequence
      if (!wx.getShareInfo) {
        wx.showModal({
          showCancel: false,
          content: "您的微信版本过低，请升级到最新版微信后参与",
        })
      }
      wx.getShareInfo({
        shareTicket: shareTicket,
        success(res) {
          var paramsJson = {
            sessionKey: user.attributes.authData.lc_weapp.session_key,
            encryptedData: res.encryptedData,
            iv: res.iv
          }
          AV.Cloud.run('decryptData', paramsJson).then(function (data) {
            if (sequence.get("groupId") == data.openGId) {
              that.setData({
                isJoin: true,
                canInput: true
              })
              that.setJoinRelation()
            } else {
              that.setFollowRelation()
            }
          })
        },
        fail(err) {
          console.log("获取分享信息失败", err)
        }
      })
    } else {
      this.setFollowRelation()
    }
  },

  /**
   * 建立和两人类型接龙的关系
   */
  setTwoTypeRelation: function () {
    var sequence = this.data.sequence
    if (sequence.get("imgList").length < 2) {
      this.setData({
        canInput: true
      })
      if (this.data.hasUserInfo) {
        var user = getApp().globalData.user
        var imgList = sequence.get("imgList")
        if (imgList == null) {
          imgList = []
        }
        imgList.push(user.get("avatarUrl"))
        sequence.set("imgList", imgList)
        sequence.save()
        getApp().globalData.refreshSequenceList = true
        this.setData({
          isJoin: true,
          sequence: sequence
        })
        this.setJoinRelation()
        if (this.data.shouldSaveIdiom) {
          // 保存成语
          this.data.shouldSaveIdiom = false
          this.onSubmit()
        }
      } else {
        // 没有用户信息，关系暂时未确定，获取到用户信息后再设置
        this.data.hasCheckRelation = false
        this.setFollowRelation()
      }
    } else {
      this.setFollowRelation()
    }
  },

  /**
   * 建立接龙的参与关系
   */
  setJoinRelation: function () {
    var that = this
    var sequence = this.data.sequence
    var userSequenceMap
    if (this.data.userSequenceMap != null) {
      userSequenceMap = this.data.userSequenceMap
      userSequenceMap.set("join", true)
    } else {
      var user = getApp().globalData.user
      var userSequenceMap = new AV.Object('UserSequenceMap')
      userSequenceMap.set('user', user)
      userSequenceMap.set('sequence', sequence)
      userSequenceMap.set('join', true)
    }
    userSequenceMap.save().then(userSequenceMap => {
      that.data.userSequenceMap = userSequenceMap
      // 更新参与人数
      var query = new AV.Query('UserSequenceMap')
      query.equalTo('sequence', sequence)
      query.equalTo('join', true)
      query.count().then(count => {
        sequence.set("joinCount", count)
        sequence.save()
        if (sequence.get("type") == "all") {
          that.setData({
            sequence: sequence
          })
        }
      }, error => {
        throw new AV.Cloud.Error('查询参与人数失败')
      })
    })
  },

  /**
   * 建立接龙的围观关系
   */
  setFollowRelation: function () {
    var that = this
    var user = getApp().globalData.user
    var sequence = this.data.sequence
    if (this.data.userSequenceMap != null) {
      userSequenceMap = this.data.userSequenceMap
      userSequenceMap.set("join", true)
    } else {
      var user = getApp().globalData.user
      var userSequenceMap = new AV.Object('UserSequenceMap')
      userSequenceMap.set('user', user)
      userSequenceMap.set('sequence', sequence)
      userSequenceMap.set('join', false)
    }
    userSequenceMap.save().then(userSequenceMap => {
      that.data.userSequenceMap = userSequenceMap
    })
  },

  /**
   * 获取成语列表
   */
  getIdioms: function () {
    this.setData({
      loadingNextPage: true
    })
    var pageSize = 10
    var that = this
    var user = getApp().globalData.user
    if (user == null) {
      util.hideLoading()
      return
    }
    var currentPage = this.data.currentPage
    var params = {
      userId: user.id,
      sequenceId: this.data.id,
      page: currentPage + 1
    }
    AV.Cloud.run('getIdioms', params).then(idiomList => {
      util.hideLoading()
      that.data.currentPage = currentPage + 1
      var hasNextPage
      if (idiomList != null && idiomList.length == pageSize) {
        hasNextPage = true
      } else {
        hasNextPage = false
      }
      var allIdiomList
      if (that.data.currentPage == 1) {
        allIdiomList = idiomList
      } else {
        allIdiomList = idiomList.concat(that.data.idiomList)
      }
      var isLastCreator = false
      if (allIdiomList != null &&
        allIdiomList[allIdiomList.length - 1].creator.id == user.id) {
        isLastCreator = true
      }
      that.setData({
        idiomList: allIdiomList,
        isLastCreator: isLastCreator,
        hasNextPage: hasNextPage,
        loadingNextPage: false
      })
      if (idiomList.length > 0) {
        if (that.data.currentPage == 1) {
          setTimeout(function () {
            that.setData({
              toView: idiomList[idiomList.length - 1].objectId
            })
          }, 500)
        } else {
          setTimeout(function () {
            that.setData({
              toView: idiomList[idiomList.length - 1].objectId
            })
          }, 50)
        }
      }
    }, err => {
      util.hideLoading()
      console.log("获取成语列表失败", err)
      that.setData({
        hasNextPage: true,
        loadingNextPage: false
      })
    })
  },

  /**
   * 列表滚动到顶部
   */
  scrollToTop: function () {
    if (!this.data.hasNextPage || this.data.loadingNextPage) {
      return
    }
    this.getIdioms()
  },

  /**
   * 点赞
   */
  onLike: function (e) {
    var idiomList = this.data.idiomList
    var index = e.currentTarget.id
    var idiom = idiomList[index]
    var isLikeChange = false
    if (idiom.likeStatus == 1) {
      return
    }
    // 更新赞、踩页面数据
    if (idiom.likeStatus == 2) {
      isLikeChange = true
      var unLikeCount = 0
      if (idiom.unLikeCount != null && idiom.unLikeCount > 0) {
        unLikeCount = idiom.unLikeCount - 1
      }
      idiom.unLikeCount = unLikeCount
    }
    idiom.likeStatus = 1
    var likeCount = 1
    if (idiom.likeCount != null && idiom.likeCount > 0) {
      likeCount = idiom.likeCount + 1
    }
    idiom.likeCount = likeCount
    this.setData({
      idiomList: idiomList
    })
    // 更新数据库
    var user = getApp().globalData.user
    var params = {
      userId: user.id,
      idiomId: idiom.objectId
    }
    AV.Cloud.run('like', params)
  },

  /**
   * 点踩
   */
  onUnLike: function (e) {
    var idiomList = this.data.idiomList
    var index = e.currentTarget.id
    var idiom = idiomList[index]
    var isLikeChange = false
    if (idiom.likeStatus == 2) {
      return
    }
    // 更新赞、踩页面数据
    if (idiom.likeStatus == 1) {
      isLikeChange = true
      var likeCount = 0
      if (idiom.likeCount != null && idiom.likeCount > 0) {
        likeCount = idiom.likeCount - 1
      }
      idiom.likeCount = likeCount
    }
    idiom.likeStatus = 2
    var unLikeCount = 1
    if (idiom.unLikeCount != null && idiom.unLikeCount > 0) {
      unLikeCount = idiom.unLikeCount + 1
    }
    idiom.unLikeCount = unLikeCount
    this.setData({
      idiomList: idiomList
    })
    // 更新数据库
    var user = getApp().globalData.user
    var params = {
      userId: user.id,
      idiomId: idiom.objectId
    }
    AV.Cloud.run('unlike', params)
  },

  /**
   * 输入成语
   */
  onInput: function (e) {
    var inputIdiom = e.detail.value
    this.data.inputIdiom = e.detail.value
    var canSend = false
    if (inputIdiom.length == 4 &&
      util.isChinese(inputIdiom) &&
      !this.data.isLastCreator &&
      this.data.canInput) {
      this.data.inputIdiom = e.detail.value
      canSend = true
    }
    if (this.data.canSend != canSend) {
      this.setData({
        canSend: canSend
      })
    }
  },

  /**
   * 提交成语
   */
  onSubmit: function () {
    if (!this.data.canSend) {
      return
    }
    util.showLoading()
    var that = this
    var user = getApp().globalData.user
    var sequence = this.data.sequence
    var idiomList = this.data.idiomList
    var params = {
      creator: {
        id: user.id,
        name: user.get("nickName"),
        img: user.get("avatarUrl")
      },
      sequence: {
        id: sequence.id,
        type: sequence.get("type"),
        imgList: sequence.get("imgList")
      },
      idiomValue: this.data.inputIdiom,
      lastIdiomValue: idiomList[idiomList.length - 1].value
    }
    AV.Cloud.run('saveIdiom', params).then(res => {
      util.hideLoading()
      if (typeof res == "object") {
        // 成功保存记录
        var idiom = res
        if (sequence.get("type") == "all") {
          // 修改最近的五个接龙用户头像
          var imgList = sequence.get("imgList")
          if (imgList == null) {
            imgList = []
          }
          if (!imgList.includes(user.get("avatarUrl"))) {
            imgList.push(user.get("avatarUrl"))
            if (imgList.length > 5) {
              imgList.splice(0, 1)
            }
            sequence.set("imgList", imgList)
            that.setData({
              sequence: sequence
            })
          }
          if (!that.data.isJoin) {
            that.setJoinRelation()
          }
        }
        getApp().globalData.refreshSequenceList = true
        wx.showToast({
          title: '创建成功'
        })
        that.data.InputIdiom = ""
        // 更新列表
        idiomList.push(idiom)
        that.setData({
          isLastCreator: true,
          canSend: false,
          inputValue: "",
          idiomList: idiomList
        })
        setTimeout(function () {
          that.setData({
            toView: idiom.objectId
          })
        }, 50)
      } else {
        wx.showModal({
          showCancel: false,
          content: res,
        })
        if (res == "列表有更新") {
          that.data.currentPage = 0
          that.data.hasNextPage = true
          that.getIdioms()
        }
      }
    }, err => {
      util.hideLoading()
      console.log("保存接龙失败", err)
    })
  },

  /**
   * 检查拼音是否能接上
   */
  checkPinyin: function (pinyin1, pinyin2) {
    var canConnect = false
    pinyin1.forEach(function (value1) {
      pinyin2.forEach(function (value2) {
        if (value1 == value2) {
          canConnect = true
        }
      })
    })
    return canConnect
  },

  /**
   * 点击右上角刷新
   */
  onRefresh: function () {
    var sequence = this.data.sequence
    if (sequence == null ||
      sequence.get("type") == "all" ||
      (sequence.get("type") == "two" && sequence.get("imgList").length < 2)) {
      this.getSequence()
    }
    this.data.currentPage = 0
    this.data.hasNextPage = true
    util.showLoading()
    this.getIdioms()
  },

  /**
  * 分享
  */
  onShareAppMessage: function () {
    var that = this
    return {
      title: "一起来玩成语接龙！",
      path: 'pages/idiom-list/idiom-list?id=' + this.data.id,
      success(res) {
        if (res.shareTickets != null && res.shareTickets.length > 0) {
          that.getShareInfo(res.shareTickets[0])
        }
      }
    }
  },

  /**
   * 获取分享信息
   */
  getShareInfo: function (shareTicket) {
    var sequence = this.data.sequence
    if (sequence.get("type") != "group" ||
      sequence.get("groupId").length > 0) {
      return
    }
    var that = this
    var user = getApp().globalData.user
    wx.getShareInfo({
      shareTicket: shareTicket,
      success(res) {
        var paramsJson = {
          sessionKey: user.attributes.authData.lc_weapp.session_key,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        AV.Cloud.run('decryptData', paramsJson).then(function (data) {
          //保存群id
          sequence.set("groupId", data.openGId)
          sequence.save()
          that.setData({
            sequence: sequence
          })
        })
      }
    })
  }
})