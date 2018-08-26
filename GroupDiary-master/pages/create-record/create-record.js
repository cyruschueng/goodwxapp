const AV = require('../../utils/av-weapp-min')
var util = require('../../utils/util.js');

Page({
  data: {
    groupId: "",
    content: '',
    imageList: [],
    fileList: [],
    address: "",
    addressName: "",
    lat: 0,
    lng: 0,
    canPreviewImage: true
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.data.groupId = options.groupId
  },
  onInput: function (res) {
    this.setData({
      content: res.detail.value
    })
  },
  //选择图片
  chooseImage: function () {
    var that = this
    var imageList = this.data.imageList
    wx.chooseImage({
      sizeType: "compressed",
      count: 9 - imageList.length,
      success: function (res) {
        //显示图片
        imageList = imageList.concat(res.tempFilePaths)
        that.setData({
          imageList: imageList
        })
      }
    })
  },
  //预览图片
  previewImage: function (e) {
    if (!this.data.canPreviewImage) {
      return
    }
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  //删除图片
  deleteImage: function (e) {
    this.data.canPreviewImage = false
    var index = e.currentTarget.dataset.index
    var imageList = this.data.imageList
    var that = this
    wx.showModal({
      title: '确定删除此图片？',
      success: function (res) {
        that.data.canPreviewImage = true
        if (!res.confirm) {
          return
        }
        imageList.splice(index, 1)
        that.setData({
          imageList: imageList
        })
      }
    })
  },
  //选择地址
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.data.lat = res.latitude
        that.data.lng = res.longitude
        that.setData({
          address: res.address,
          addressName: res.name
        })
      },
      fail: function (res) {
        if (res.errMsg == "chooseLocation:fail auth deny") {
          wx.openSetting({
            success: function (res) {
              //尝试再次跳转
              wx.chooseLocation({
                success: function (res) {
                  that.data.lat = res.latitude
                  that.data.lng = res.longitude
                  that.setData({
                    address: res.address,
                    addressName: res.name
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  //创建
  submit: function () {
    util.showLoading()
    var that = this
    var imageList = this.data.imageList
    if (imageList.length == 0) {
      this.createRecord()
      return
    }
    //上传图片
    var that = this
    var fileList = this.data.fileList
    this.data.imageList.map(tempFilePath => () => new AV.File('filename', {
      blob: {
        uri: tempFilePath,
      }
    }).save())
      .reduce((m, p) => m.then(v => AV.Promise.all([...v, p()])), AV.Promise.resolve([]))
      .then(function (files) {
        console.log("图片上传成功")
        console.log(files)
        files.forEach(function (file) {
          fileList.push(file.url())
        })
        that.createRecord()
      }, function (error) {
        util.hideLoading()
        console.log("上传图片失败")
        console.log(error)
      })
  },
  //创建记录
  createRecord: function () {
    var user = AV.User.current()
    var record = new AV.Object('Record')
    record.set('content', this.data.content)
    record.set('fileList', this.data.fileList)
    record.set('address', this.data.address)
    record.set('addressName', this.data.addressName)
    record.set('lat', parseFloat(this.data.lat))
    record.set('lng', parseFloat(this.data.lng))
    record.set('createUserId', user.attributes.authData.lc_weapp.openid)
    record.set('createUserName', user.get("nickName"))
    record.set('createUserImg', user.get("avatarUrl"))
    record.set('groupId', this.data.groupId)
    console.log(record)
    record.save().then(function (res) {
      util.hideLoading()
      //成功保存记录
      console.log("成功创建记录")
      console.log(res)
      getApp().globalData.refreshRecordList = true
      wx.showToast({
        title: '创建成功'
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }, function (error) {
      util.hideLoading()
      console.log("创建记录失败")
      console.log(error)
    }).catch(console.error)
  }
})