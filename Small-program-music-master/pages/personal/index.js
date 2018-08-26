var app = getApp();
Page({
  data: {
    userInfo: {
      avatarUrl: "",
      nickName: ""
    },
    y_menus: [
      { title: '本地音乐', url: "" },
      { title: '我的收藏', url: "" },
    ],
    x_menus: [
      { title: '收藏', icon: '/images/collectChanged.png' },
      { title: '夜间', icon: '/images/eve.png', classes: 'two_side' },
      { title: '设置', icon: '/images/set.png' }
    ],
    toast: {
      display: true,
      msg: ""
    }
  },
  redirect: function (e) {
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {
      this.setData({ toast: { display: false, msg: "待完善" } })
    }
  },
  toastChange: function () {
    this.setData({ toast: { display: true, msg: "" } })
  },
  bingo: function () {
    
    this.setData({
      toast: {
        display: false, 
        msg: "Hi,I'm " + this.data.userInfo.nickName
      }
    })
  },
  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        console.log(res.userInfo)
        console.log(that)
        that.setData({
          'userInfo.avatarUrl': res.userInfo.avatarUrl,
          'userInfo.nickName': res.userInfo.nickName
        })
      }
    })
  }
})