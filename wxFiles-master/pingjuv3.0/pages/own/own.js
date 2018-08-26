var app = getApp()
Page({
  data: {
    innerHeight: 0,
    innerWidth: 0,
    hidden: true,
    model: '',
    isScroll:true,
    hidden: false,
    userInfo: {},
    pholist: [],
    ph: [],
    drop: ['/img/dropdown.png', '/img/up_d.png'],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  galleryBindTap: function () {
    if (this.data.hidden == false) {
      this.setData({ hidden: true })
    } else {
      this.setData({ hidden: false })
    }
  },
  bindModel: function (e) {
    if(e.target.dataset.model == 'cancel'){
      this.setData({isScroll:true})
    }else if(e.target.dataset.model == 'confirm'){
      this.setData({isScroll:true})
    }
    this.setData({ model: e.target.dataset.model })
  },
  changeCover: function () {
    var that = this
    wx.chooseImage({
      count:1,
      sizeType: ['compressed'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.api + 'setBGCover',
          filePath: tempFilePaths[0],
          name: 'photo',
          formData: {
            uid: wx.getStorageSync('userInfo').id
          },
          success: function (res) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            var ui = that.data.userInfo
            ui.bgcover = res.data.substring(res.data.indexOf('http'),res.data.indexOf('"}'))
            that.setData({ userInfo: ui })
          }
        })
      }
    })
  },
  load: function () {
    var that = this
    app.getUserInfo();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          innerHeight: res.windowHeight,
          innerWidth: res.windowWidth
        })
        console.log(res)
      }
    })
    this.setData({ userInfo: wx.getStorageSync('userInfo') })
    wx.request({
      url: app.api + 'getPhoto',
      data: {
        uid: wx.getStorageSync('userInfo').id,
      },
      method: 'post',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("------getphoto")
        console.log(res)
        var list = []
        if (res.data.code == 1) {
          if (res.data.data.photo_a != null && res.data.data.photo_a != "") {
            list.push(res.data.data.photo_a)
          }
          if (res.data.data.photo_b != null && res.data.data.photo_b != "") {
            list.push(res.data.data.photo_b)
          }
          if (res.data.data.photo_c != null && res.data.data.photo_c != "") {
            list.push(res.data.data.photo_c)
          }
          if (res.data.data.photo_d != null && res.data.data.photo_d != "") {
            list.push(res.data.data.photo_d)
          }
          if (res.data.data.photo_e != null && res.data.data.photo_e != "") {
            list.push(res.data.data.photo_e)
          }
          if (res.data.data.photo_f != null && res.data.data.photo_f != "") {
            list.push(res.data.data.photo_f)
          }
        }
        that.setData({ pholist: list, ph: res })
      }
    })
  },
  onShow: function () {
    this.load()
  },
  delphoto: function (e) {
    var that = this
    var ward = 'a';
    if (that.data.ph.data.data.photo_a == e.currentTarget.dataset.sat) {
      ward = 'a'
    } else if (that.data.ph.data.data.photo_b == e.currentTarget.dataset.sat) {
      ward = 'b'
    } else if (that.data.ph.data.data.photo_c == e.currentTarget.dataset.sat) {
      ward = 'c'
    } else if (that.data.ph.data.data.photo_d == e.currentTarget.dataset.sat) {
      ward = 'd'
    } else if (that.data.ph.data.data.photo_e == e.currentTarget.dataset.sat) {
      ward = 'e'
    } else if (that.data.ph.data.data.photo_f == e.currentTarget.dataset.sat) {
      ward = 'f'
    }
    console.log(ward)
    wx.request({
      url: app.api + 'setPhoto',
      data: {
        photo_id:ward,
        uid: wx.getStorageSync('userInfo').id,
        photo:''
      },
      method: 'post', 
      header: {},
      success: function(res){
         console.log('del pho')
         console.log(res)
         that.setData({
           model:'',
           isScroll:true
         })
         that.load();
      },
      fail: function(res) {
      },
      complete: function(res) {
        // complete
      }
    })
  },
  addPhoto: function (e) {
    var that = this
    var ward = 'a';
    if (that.data.pholist.length < 6) {
      if (that.data.ph.data.data.photo_a == null || that.data.ph.data.data.photo_a == "") {
        ward = 'a';
      } else if (that.data.ph.data.data.photo_b == null || that.data.ph.data.data.photo_b == "") {
        ward = 'b';

      } else if (that.data.ph.data.data.photo_c == null || that.data.ph.data.data.photo_c == "") {
        ward = 'c';

      } else if (that.data.ph.data.data.photo_d == null || that.data.ph.data.data.photo_d == "") {
        ward = 'd';

      } else if (that.data.ph.data.data.photo_e == null || that.data.ph.data.data.photo_e == "") {
        ward = 'e';

      } else if (that.data.ph.data.data.photo_f == null || that.data.ph.data.data.photo_f == "") {
        ward = 'f';
      }
    }
    if (that.data.ph.data.data.photo_a == e.currentTarget.dataset.sat) {
      ward = 'a'
    } else if (that.data.ph.data.data.photo_b == e.currentTarget.dataset.sat) {
      ward = 'b'
    } else if (that.data.ph.data.data.photo_c == e.currentTarget.dataset.sat) {
      ward = 'c'
    } else if (that.data.ph.data.data.photo_d == e.currentTarget.dataset.sat) {
      ward = 'd'
    } else if (that.data.ph.data.data.photo_e == e.currentTarget.dataset.sat) {
      ward = 'e'
    } else if (that.data.ph.data.data.photo_f == e.currentTarget.dataset.sat) {
      ward = 'f'
    }
    console.log(ward)
    
    wx.chooseImage({
      sizeType: ['compressed'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.api + 'setPhoto',
          filePath: tempFilePaths[0],
          name: 'photo',
          formData: {
            photo_id: ward,
            uid: wx.getStorageSync('userInfo').id
          },
          success: function (res) {
            var data = res.data
            that.setData({ pholist: res.data.data })
            console.log(data.data)
            that.load()
            that.setData({
              model:'',
              isScroll:true
            })
          }
        })
      }
    })
  },
  setit: function (e) {
    var that = this
    wx.previewImage({
      current: e.currentTarget.dataset.sat,
      urls: that.data.pholist
    })
  },
  navToHobby: function () {
    wx.navigateTo({
      url: '/pages/own/hobby/hobby'
    })
  },
  navToMylabel: function () {
    wx.navigateTo({
      url: '/pages/own/mylabel/mylabel'
    })
  },
  navToFriends: function () {
    wx.navigateTo({
      url: '/pages/own/friends/friends'
    })
  },
  navToAbout: function () {
    wx.navigateTo({
      url: '/pages/own/about/about'
    })
  },
  navToMsg: function () {
    wx.navigateTo({
      url: '/pages/msg/msg'
    })
  },
  onReady: function () {
    // 页面渲染完成
  },

  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})