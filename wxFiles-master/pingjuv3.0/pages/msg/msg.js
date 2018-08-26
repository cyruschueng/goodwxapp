var app = getApp();
Page({
  data: {
    userInfo: {},
    tempFilePaths: '',
    ageList: ['18-23岁', '24-29岁', '30-35岁', '36-41岁', '42-50岁', '51-60岁'],
    genderList: ['男', '女'],
    maritalList: ['保密', '未婚', '已婚', '离异'],
    constellationList: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天枰座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    ulist: { uid: '', avatarUrl: '', name: '', age: '18-23岁', marital: '保密', constellation: '双鱼座', mobile: '', des: '', sex: '', openid: '', country: '', province: '' },
    idnex: 0,
    types: 'own'
  },
  onLoad: function (options) {
    if (options.type == undefined) {
      this.setData({ types: 'own' })
    } else {
      this.setData({ types: options.types })
    }
    var that = this;
    var userInfo = wx.getStorageSync('userInfo')
    var list = {
      uid: userInfo.id,
      avatarUrl: userInfo.avatar,
      name: userInfo.name,
      age: userInfo.age,
      marital: userInfo.marital,
      constellation: userInfo.constellation,
      mobile: userInfo.mobile,
      des: userInfo.des,
      sex: userInfo.sex,
      openid: wx.getStorageSync('openid'),
      wechatid: '11'
    }
    this.setData({
      userInfo: userInfo,
      tempFilePaths: that.data.userInfo.avatar,
      ulist: list
    })

  },
  changePhoto: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths)
        wx.uploadFile({
          url: app.api + 'setCover', 
          filePath: tempFilePaths[0],
          name: 'photo',
          formData: {
            uid:wx.getStorageSync('userInfo').id
          },
          success: function (res) {
            var data = res.data
            console.log("----uploadHead")
            console.log(res)
            var ui = that.data.ulist
            ui.avatarUrl = res.data.substring(res.data.indexOf('http'),res.data.indexOf('"}'))
            that.setData({ ulist: ui })
          },
          fail:function(res){
            console.log(res)
          }
        })
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: function (res) {
    //     var list = that.data.ulist
    //     list.avatarUrl = res.tempFilePaths[0]
    //     that.setData({ ulist: list })
    //   }
    // })
  },
  bindInputName: function (e) {
    var list = this.data.ulist
    list.name = e.detail.value
    this.setData({ ulist: list })
  },
  bindInputMobile: function (e) {
    var list = this.data.ulist
    list.mobile = e.detail.value
    this.setData({ ulist: list })
  },
  bindInputDes: function (e) {
    var list = this.data.ulist
    list.des = e.detail.value
    this.setData({ ulist: list })
  },
  bindPickerGender: function (e) {
    var that = this
    var list = this.data.ulist
    list.sex = that.data.genderList[e.detail.value]
    this.setData({ ulist: list })
  },
  bindPickerAge: function (e) {
    var that = this
    var list = this.data.ulist
    list.age = that.data.ageList[e.detail.value]
    this.setData({ ulist: list })
  },
  bindPickerMarital: function (e) {
    var that = this
    var list = this.data.ulist
    list.marital = that.data.maritalList[e.detail.value]
    this.setData({ ulist: list })
  },
  bindPickerConstellation: function (e) {
    var that = this
    var list = this.data.ulist
    list.constellation = that.data.constellationList[e.detail.value]
    this.setData({ ulist: list })
  },
  submit: function () {
    var that = this
    console.log("---ulist")
    console.log(that.data.ulist)
    wx.request({
      url: app.api + 'me/profile',
      data: that.data.ulist,
      method: 'post',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)

        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.switchTab({
          url: '/pages/' + that.data.types + '/' + that.data.types,
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})