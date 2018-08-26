const config = require('../../config')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    firstIdiom: "",
    isTitleLegal: false,
    isIdiomLegal: false,
    sequenceType: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 标题输入
   */
  onTitleInput: function (event) {
    var value = event.detail.value
    this.data.title = value
    this.setData({
      isTitleLegal: value.length > 0 ? true : false
    })
  },

  /**
   * 成语输入
   */
  onIdiomInput: function (event) {
    var value = event.detail.value
    this.data.firstIdiom = value
    this.setData({
      isIdiomLegal: value.length == 4 && util.isChinese(value) ? true : false
    })
  },

  /**
   * 选择类型
   */
  selectType: function (event) {
    this.setData({
      sequenceType: event.currentTarget.id
    })
  },

  /**
   * 提交
   */
  submit: function (e) {
    if (!(this.data.isTitleLegal && this.data.isIdiomLegal && this.data.sequenceType.length > 0)) {
      return
    }
    var user = getApp().globalData.user
    if (user == null) {
      wx.showToast({
        title: '您还没有授权登录'
      })
      return
    }
    var creator = {
      id: user.openId,
      name: user.nickName,
      img: user.avatarUrl
    }
    var params = {
      title: this.data.title,
      firstIdiom: this.data.firstIdiom,
      type: this.data.sequenceType,
      creator: creator
    }
    if (e.detail.formId) {
      params.formId = e.detail.formId
    }
    util.httpPost(config.createSequence, params, this.submitSuccess, this.submitFail, true)
  },

  /**
   * 提交成功
   */
  submitSuccess: function (sequence) {
    getApp().globalData.refreshSequenceList = true
    wx.showToast({
      title: '创建成功'
    })
    setTimeout(function () {
      wx.redirectTo({
        url: '../idiom-list/idiom-list?id=' + sequence.id,
      })
    }, 1000)
  },

  /**
   * 提交失败
   */
  submitFail: function () { }
})