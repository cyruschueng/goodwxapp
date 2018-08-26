const AV = require('../../utils/av-weapp-min')
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
    groupId: "",
    recordList: [],
    canShowEmpty: false,//是否可展示空白页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.groupId = options.groupId
    this.getRecords()
    var user = AV.User.current()
    this.setData({
      userId: user.attributes.authData.lc_weapp.openid
    })
  },

  onShow: function (options) {
    var app = getApp()
    var refreshRecordList = app.globalData.refreshRecordList
    if (refreshRecordList) {
      app.globalData.refreshRecordList = false
      this.getRecords()
    }
  },

  getRecords: function () {
    util.showLoading()
    var that = this
    // 构建 Record 的查询
    var query = new AV.Query('Record')
    query.equalTo('groupId', this.data.groupId)
    query.descending('createdAt')
    // 执行查询
    query.find().then(function (recordList) {
      util.hideLoading()
      recordList.forEach(function (record, i, a) {
        var date = new Date(record.createdAt)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        record.set("date", year + "-" + month + "-" + day + " " + that.pad(hour) + ":" + that.pad(minute))
      })
      that.setData({
        canShowEmpty: true,
        recordList: recordList
      })
      console.log(recordList)
    }, function (error) {
      util.hideLoading()
      console.log("获取记录失败")
      console.log(error)
    })
  },

  /**
   * 预览图片
   */
  previewImage: function (event) {
    var listIndex = event.currentTarget.dataset.listIndex
    var index = event.currentTarget.dataset.index
    var current = event.currentTarget.dataset.src
    var record = this.data.recordList[listIndex]
    var imageList = record.get('fileList')
    if (imageList == null || imageList.length == 0) {
      return
    }
    wx.previewImage({
      current: current,
      urls: imageList
    })
  },

  /**
   * 不可删除图片，加这个方法避免报错
   */
  deleteImage: function () { },

  /**
   * 查看位置
   */
  openLocation: function (event) {
    var index = event.currentTarget.id
    var record = this.data.recordList[index]
    wx.openLocation({
      latitude: record.get("lat"),
      longitude: record.get("lng"),
      name: record.get("addressName"),
      address: record.get("address")
    })
  },

  /**
  * 删除记录
  */
  deleteRecord: function (event) {
    var that = this
    var index = event.currentTarget.id
    var recordList = this.data.recordList
    var record = recordList[index]
    wx.showModal({
      title: '确定删除此记录？',
      success: function (res) {
        if (!res.confirm) {
          return
        }
        util.showLoading()
        record.destroy().then(function (success) {
          // 删除成功
          that.getRecords()
        }, function (error) {
          util.hideLoading()
          // 删除失败
          console.log("记录删除失败")
          console.log(err)
        });
        return
      }
    })
  },

  /**
   * 跳转到创建页面
   */
  navigateToCreate: function (event) {
    var updateUserSuccess = getApp().globalData.updateUserSuccess
    if (updateUserSuccess) {
      var groupId = this.data.groupId
      wx.navigateTo({
        url: '../create-record/create-record?groupId=' + groupId,
      })
    } else {
      this.getUserInfo()
    }
  },

  /**
    * 获取用户信息
    */
  getUserInfo: function () {
    util.showLoading()
    var that = this
    wx.getUserInfo({
      success: (res) => {
        that.updateUserInfo(res.userInfo)
      },
      fail: (res) => {
        util.hideLoading()
        console.log("获取用户信息失败")
        console.log(res)
        wx.showModal({
          title: '需要您的授权才可以发印记哟~',
          showCancel: false,
          success: function (res) {
            wx.openSetting({
              success(res) {
                if (!res.authSetting['scope.userInfo']) {
                  return
                }
                that.getUserInfo()
              }
            })
          }
        })
      }
    })
  },

  /**
    * 更新用户信息
    */
  updateUserInfo: function (userInfo) {
    var that = this
    var user = AV.User.current()
    user.set(userInfo).save().then(user => {
      util.hideLoading()
      console.log("更新用户信息成功")
      console.log(user)
      getApp().globalData.updateUserSuccess = true
      //跳转到创建页
      var groupId = this.data.groupId
      wx.navigateTo({
        url: '../create-record/create-record?groupId=' + groupId,
      })
    }, error => {
      util.hideLoading()
      console.log("更新用户信息失败")
      console.log(error)
    }).catch(console.error)
  },

  /**
   * 两位数补零
   */
  pad: function (num) {
    return (Array(2).join(0) + num).slice(-2)
  }
})