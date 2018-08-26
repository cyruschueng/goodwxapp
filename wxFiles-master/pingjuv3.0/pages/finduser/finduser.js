var app = getApp()
Page({
  data: {
    uflag: 0,
    userInfo: {},
    audit: 1,
    uid: 0,
    aid: 0
  },
  changeTap: function (e) {
    

    if (e.target.dataset.id == 's1') {
      this.setData({ uflag: 0 })
    } else {
      this.setData({ uflag: 1 })
    }

  },
  setit: function (e) {
    var that = this
    var list = []
    if (that.data.userInfo.photo_a != null && that.data.userInfo.photo_a != "") {
      list.push(that.data.userInfo.photo_a)
    }
    if (that.data.userInfo.photo_b != null && that.data.userInfo.photo_b != "") {
      list.push(that.data.userInfo.photo_b)
    }
    if (that.data.userInfo.photo_c != null && that.data.userInfo.photo_c != "") {
      list.push(that.data.userInfo.photo_c)
    }
    if (that.data.userInfo.photo_d != null && that.data.userInfo.photo_d != "") {
      list.push(that.data.userInfo.photo_d)
    }
    if (that.data.userInfo.photo_e != null && that.data.userInfo.photo_e != "") {
      list.push(that.data.userInfo.photo_e)
    }
    if (that.data.userInfo.photo_f != null && that.data.userInfo.photo_f != "") {
      list.push(that.data.userInfo.photo_f)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.sat,
      urls: list
    })
  },
  onLoad: function (options) {
    this.setData({ audit: options.audit, uid: options.uid, aid: options.aid })
    var that = this
    wx.request({
      url: app.api + 'me/profile/' + options.uid,
      method: 'get',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("-----user")
        console.log(res)
        res.data.data.avatar = res.data.data.avatar.replace('\\','');
        res.data.data.avatar = res.data.data.avatar.replace('\\','');
        res.data.data.avatar = res.data.data.avatar.replace('\\','');
        res.data.data.avatar = res.data.data.avatar.replace('\\','');
        res.data.data.avatar = res.data.data.avatar.replace('\\','');
        if(res.data.data.tags != '' && res.data.data.tags != null){
          res.data.data.tags = res.data.data.tags.split('|')
        }
        that.setData({ userInfo: res.data.data })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  agree: function () {
    var that = this
    wx.request({
      url: app.api + 'audit',
      data: {
        uid: wx.getStorageSync('userInfo').id,
        id: that.data.aid,
        mid: that.data.uid,
        audit: '1'
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header
      success: function (res) {
        console.log("ssssss")
        console.log(res)
        if (res.data.code == 1) {
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success'
          }, 1000);
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})