const config = require('../../config')
const util = require('../../utils/util.js')
const qcloud = require('../../libs/wafer2-client-sdk/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    sequence: null,
    idiomList: [],
    hasLogin: false,
    inputIdiom: "",
    inputIdiomPinyin: [],
    canInput: false,
    isLastCreator: false,
    canSend: false,
    toView: "",
    inputValue: "",
    currentPage: 0,
    hasNextPage: true,
    loadingNextPage: false,
    shouldSaveIdiom: false,
    canGetUserInfo: false,
    shareInfo: null,
    openTunnel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.id = options.id
    var app = getApp()
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
    app.login(this.loginSuccess, this.updateUserSuccess, this.loginFail)
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
  },

  /**
   * 登录成功
   */
  loginSuccess: function () {
    this.data.currentPage = 0
    this.getSequence()
    this.getIdioms()
    this.setData({
      hasLogin: true
    })
    if (this.data.shouldSaveIdiom) {
      // 保存成语
      this.data.shouldSaveIdiom = false
      this.onSubmit()
    }
  },

  /**
   * 更新用户信息成功
   */
  updateUserSuccess: function () {
    if (!this.tunnel) {
      var that = this
      that.connectTunnel()
    }
    if (this.data.shareInfo != null) {
      this.decryptShareInfo(this.data.shareInfo)
      this.data.shareInfo = null
    }
  },

  /**
   * 登录失败
   */
  loginFail: function () {
    this.getSequence()
    this.getIdioms()
  },

  /**
   * 连接信道
   */
  connectTunnel: function () {
    var that = this
    this.data.openTunnel = true
    var user = getApp().globalData.user
    // 创建信道
    var tunnel = this.tunnel = new qcloud.Tunnel(config.tunnelUrl)

    // // 连接成功
    // tunnel.on("connect", () => console.log("信道已连接"))
    // // 聊天室有人加入或退出
    // tunnel.on("people", people => { console.log(people) })
    // // 信道关闭
    // tunnel.on("close", () => console.log("信道已断开"))
    // // 重连
    // tunnel.on("reconnecting", () => console.log("信道正在重连"))
    // // 重连成功
    // tunnel.on("reconnect", () => console.log("信道重连成功"))
    // // 信道错误
    // tunnel.on("error", error => console.error("信道发生错误", error))

    // 接收到消息
    tunnel.on("speak", data => {
      var idiom = data.word
      if (user.openId != data.who.openId && idiom.sequenceId == that.data.id) {
        var idiomList = that.data.idiomList
        var lastIdiomNum = idiomList[idiomList.length - 1].idiomNum
        if (idiom.idiomNum == lastIdiomNum + 1) {
          that.pushIdiomList(idiom)
        } else {
          that.onRefresh()
        }
      }
    })
    // 打开信道
    tunnel.open()
  },

  /**
   * 后续后台切换回前台的时候，也要重新启动聊天室
   */
  onShow() {
    this.data.openTunnel = true
    if (this.tunnel && this.tunnel.isClosed()) {
      this.connectTunnel()
    }
  },

  /**
   * 页面卸载时，退出聊天室
   */
  onUnload() {
    this.data.openTunnel = false
    if (this.tunnel && !this.tunnel.isClosed()) {
      this.tunnel.close()
    }
  },

  /**
   * 页面切换到后台运行时，退出聊天室
   */
  onHide() {
    this.data.openTunnel = false
    if (this.tunnel && !this.tunnel.isClosed()) {
      this.tunnel.close()
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (res) {
    var app = getApp()
    if (res.detail.userInfo) {
      app.login(this.loginSuccess, this.loginFail)
    }
    // 获取到用户信息后保存成语
    if (res.currentTarget.dataset.submit) {
      this.data.shouldSaveIdiom = true
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
        app.login(that.loginSuccess, that.loginFail)
        that.data.shouldSaveIdiom = true
      },
      fail: function (res) {
        if (wx.openSetting) {
          wx.openSetting({
            success: function (res) {
              wx.getUserInfo({
                success: function (res) {
                  app.login(that.loginSuccess, that.loginFail)
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
    var params = {
      sequenceId: this.data.id
    }
    var user = getApp().globalData.user
    if (user != null && user.openId != null) {
      params.userId = user.openId
    }
    util.httpGet(config.getSequence, params, this.getSequenceSuccess, this.getSequenceFail)
  },

  /**
   * 获取接龙成功
   */
  getSequenceSuccess: function (sequence) {
    if (sequence == null || sequence.id == null) {
      return
    }
    this.setData({
      sequence: sequence
    })
    wx.setNavigationBarTitle({
      title: sequence.title
    })
    if (sequence.joinStatus != null && sequence.joinStatus != 0) {
      if (sequence.joinStatus == 1 || sequence.type == "all") {
        this.showInput()
      } else if (sequence.type == "group") {
        this.setGroupTypeRelation()
      } else if (sequence.type == "two" && sequence.imgList.length < 2) {
        this.setTwoTypeRelation()
      }
    } else {
      if (sequence.type == "all") {
        this.setAllTypeRelation()
      } else if (sequence.type == "group") {
        this.setGroupTypeRelation()
      } else if (sequence.type == "two") {
        this.setTwoTypeRelation()
      }
    }
  },

  /**
   * 获取接龙失败
   */
  getSequenceFail: function (err) { },

  /**
   * 建立和全平台类型接龙的关系
   */
  setAllTypeRelation: function () {
    this.showInput()
    this.setFollowRelation()
  },

  /**
   * 建立和群类型接龙的关系
   */
  setGroupTypeRelation: function () {
    var that = this
    var shareTicket = getApp().globalData.shareTicket
    var joinStatus = that.data.sequence.joinStatus
    if (shareTicket != null && shareTicket.length > 0) {
      if (!wx.getShareInfo) {
        wx.showModal({
          showCancel: false,
          content: "您的微信版本过低，请升级到最新版微信后参与",
        })
      }
      wx.getShareInfo({
        shareTicket: shareTicket,
        success(res) {
          if (getApp().globalData.hasUpdate) {
            that.decryptShareInfo(res)
          } else {
            that.data.shareInfo = res
          }
        },
        fail(err) {
          console.log("获取分享信息失败", err)
        }
      })
    } else if (joinStatus != 1 && joinStatus != 2) {
      that.setFollowRelation()
    }
  },

  /**
   * 解密分享信息
   */
  decryptShareInfo: function (shareInfo) {
    var user = getApp().globalData.user
    var params = {
      userId: user.openId,
      encryptedData: shareInfo.encryptedData,
      iv: shareInfo.iv
    }
    util.httpPost(config.decryptData, params, this.decryptShareInfoSuccess, null)
  },

  /**
   * 解析用户进入小程序携带的分享数据成功
   */
  decryptShareInfoSuccess: function (data) {
    var sequence = this.data.sequence
    if (sequence.groupId == data.openGId) {
      this.showInput()
      this.setJoinRelation()
    } else {
      this.setFollowRelation()
    }
  },

  /**
   * 建立和两人类型接龙的关系
   */
  setTwoTypeRelation: function () {
    var sequence = this.data.sequence
    if (sequence.imgList.length < 2) {
      this.showInput()
      if (this.data.hasLogin) {
        var user = getApp().globalData.user
        var imgList = sequence.imgList
        if (imgList == null) {
          imgList = []
        }
        imgList.push(user.avatarUrl)
        sequence.imgList = imgList
        sequence.joinCount = imgList.length
        getApp().globalData.refreshSequenceList = true
        this.setData({
          sequence: sequence
        })
        this.setJoinRelation()
        if (this.data.shouldSaveIdiom) {
          // 保存成语
          this.data.shouldSaveIdiom = false
          this.onSubmit()
        }
      }
    }
  },

  /**
   * 建立接龙的参与关系
   */
  setJoinRelation: function () {
    var user = getApp().globalData.user
    if (user == null) {
      return
    }
    var sequence = this.data.sequence
    var params = {
      userId: user.openId,
      sequenceId: sequence.id,
      joinStatus: 1
    }
    util.httpPost(config.setUserSequenceMap, params, this.setUserSequenceMapSuccess, null)
  },

  /**
   * 建立接龙的围观关系
   */
  setFollowRelation: function () {
    var user = getApp().globalData.user
    if (user == null) {
      return
    }
    var sequence = this.data.sequence
    var params = {
      userId: user.openId,
      sequenceId: sequence.id,
      joinStatus: 2
    }
    util.httpPost(config.setUserSequenceMap, params, this.setUserSequenceMapSuccess, null)
  },

  /**
   * 建立用户接龙的关系成功
   */
  setUserSequenceMapSuccess: function (userSequenceMap) {
    var sequence = this.data.sequence
    sequence.joinStatus = userSequenceMap.joinStatus
    if (userSequenceMap.joinStatus == 1 && sequence.type == "all") {
      sequence.joinCount = sequence.joinCount + 1
      this.setData({
        sequence: sequence
      })
    }
  },

  /**
   * 获取成语列表
   */
  getIdioms: function (showLoading) {
    this.setData({
      loadingNextPage: true
    })
    var currentPage = this.data.currentPage
    var params = {
      sequenceId: this.data.id,
      page: currentPage + 1
    }
    var user = getApp().globalData.user
    if (user != null && user.openId != null) {
      params.userId = user.openId
    }
    if (showLoading) {
      util.httpGet(config.getIdioms, params, this.getIdiomsSuccess, this.getIdiomsFail, true)
    } else {
      util.httpGet(config.getIdioms, params, this.getIdiomsSuccess, this.getIdiomsFail, false)
    }
  },

  /**
   * 获取成语列表成功
   */
  getIdiomsSuccess: function (idiomList) {
    var that = this
    var pageSize = 10
    var user = getApp().globalData.user
    this.data.currentPage = this.data.currentPage + 1
    var hasNextPage
    if (idiomList != null && idiomList.length == pageSize) {
      hasNextPage = true
    } else {
      hasNextPage = false
    }
    var allIdiomList
    if (this.data.currentPage == 1) {
      allIdiomList = idiomList
    } else {
      allIdiomList = idiomList.concat(this.data.idiomList)
    }
    var isLastCreator = false
    if (allIdiomList != null && allIdiomList.length > 0 && user != null &&
      allIdiomList[allIdiomList.length - 1].creator.id == user.openId) {
      isLastCreator = true
    }
    this.setData({
      idiomList: allIdiomList,
      isLastCreator: isLastCreator,
      hasNextPage: hasNextPage,
      loadingNextPage: false
    })
    if (idiomList.length > 0) {
      if (this.data.currentPage == 1) {
        setTimeout(function () {
          that.setData({
            toView: idiomList[idiomList.length - 1].id
          })
        }, 100)
      } else {
        setTimeout(function () {
          that.setData({
            toView: idiomList[idiomList.length - 1].id
          })
        }, 50)
      }
    }
  },

  /**
   * 获取成语列表失败
   */
  getIdiomsFail: function () {
    this.setData({
      hasNextPage: true,
      loadingNextPage: false
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
   * 显示输入框
   */
  showInput: function () {
    var that = this
    this.setData({
      canInput: true
    })
    var idiomList = this.data.idiomList
    if (idiomList.length > 0 && this.data.currentPage == 1) {
      setTimeout(function () {
        that.setData({
          toView: idiomList[idiomList.length - 1].id
        })
      }, 50)
    }
  },

  /**
   * 点赞
   */
  onLike: function (e) {
    var user = getApp().globalData.user
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
    if (user == null || user.openId == null) {
      return
    }
    var params = {
      userId: user.openId,
      idiomId: idiom.id,
      likeStatus: 1
    }
    util.httpPost(config.setLike, params, null, null)
  },

  /**
   * 点踩
   */
  onUnLike: function (e) {
    var user = getApp().globalData.user
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
    if (user == null || user.openId == null) {
      return
    }
    var params = {
      userId: user.openId,
      idiomId: idiom.id,
      likeStatus: 2
    }
    util.httpPost(config.setLike, params, null, null)
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
  onSubmit: function (e) {
    var user = getApp().globalData.user
    if (!this.data.canSend || user == null || user.openId == null) {
      return
    }
    var sequence = this.data.sequence
    var idiomList = this.data.idiomList
    var params = {
      creator: {
        id: user.openId,
        name: user.nickName,
        img: user.avatarUrl
      },
      sequence: {
        id: sequence.id,
        type: sequence.type,
        imgList: sequence.imgList,
        title: sequence.title
      },
      idiomValue: this.data.inputIdiom,
      lastIdiomValue: idiomList[idiomList.length - 1].value
    }
    if (e && e.detail.formId) {
      params.formId = e.detail.formId
    }
    util.httpPost(config.saveIdiom, params, this.saveIdiomSuccess, null, true)
  },

  /**
   * 提交成语成功
   */
  saveIdiomSuccess: function (res) {
    if (typeof res == "object") {
      // 成功保存记录
      this.pushIdiomList(res)
      // 发送消息
      this.sendMessage(res)
    } else {
      wx.showModal({
        showCancel: false,
        content: res,
      })
      if (res == "列表有更新") {
        this.data.currentPage = 0
        this.data.hasNextPage = true
        this.getIdioms()
      }
    }
  },

  /**
   * 添加成语
   */
  pushIdiomList: function (idiom) {
    var that = this
    var user = getApp().globalData.user
    var sequence = this.data.sequence
    var idiomList = this.data.idiomList
    if (sequence.type == "all") {
      // 修改最近的五个接龙用户头像
      if (sequence.imgList == null) {
        sequence.imgList = []
      }
      if (sequence.imgList.includes(user.avatarUrl)) {
        var index = sequence.imgList.indexOf(user.avatarUrl)
        sequence.imgList.splice(index, 1)
      }
      sequence.imgList.push(user.avatarUrl)
      if (sequence.imgList.length > 5) {
        sequence.imgList.splice(0, 1)
      }
      this.setData({
        sequence: sequence
      })
      if (sequence.joinStatus != 1) {
        this.setJoinRelation()
      }
    }
    getApp().globalData.refreshSequenceList = true
    this.data.InputIdiom = ""
    idiomList.push(idiom)
    var isLastCreator = false
    if (idiomList[idiomList.length - 1].creator.id == user.openId) {
      isLastCreator = true
    }
    this.setData({
      isLastCreator: isLastCreator,
      canSend: false,
      inputValue: "",
      idiomList: idiomList
    })
    setTimeout(function () {
      that.setData({
        toView: idiom.id
      })
    }, 50)
  },

  /**
   * 发送消息
   */
  sendMessage: function (idiom) {
    if (!this.tunnel || !this.tunnel.isActive() || this.tunnel.isClosed()) {
      this.connectTunnel()
    } else {
      this.tunnel.emit("speak", { word: idiom })
    }
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
      sequence.type == "all" ||
      (sequence.type == "two" && sequence.imgList.length < 2)) {
      this.getSequence()
    }
    this.data.currentPage = 0
    this.data.hasNextPage = true
    this.getIdioms(true)
    if (this.tunnel && this.tunnel.isClosed()) {
      this.connectTunnel()
    }
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
    if (sequence.type != "group" ||
      sequence.groupId.length > 0) {
      return
    }
    var that = this
    var user = getApp().globalData.user
    wx.getShareInfo({
      shareTicket: shareTicket,
      success(res) {
        var params = {
          userId: user.openId,
          encryptedData: res.encryptedData,
          iv: res.iv,
          sequenceId: sequence.id
        }
        util.httpPost(config.saveShareInfo, params, that.saveShareInfoSuccess, null)
      }
    })
  },

  /**
   * 保存群id成功
   */
  saveShareInfoSuccess: function (groupId) {
    var sequence = this.data.sequence
    sequence.groupId = groupId
    this.setData({
      sequence: sequence
    })
  }
})