//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // groupList: []
    groupList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.token) {
      this.getGroupList()
      this.updateUserInfo()
    } else {
      app.loginCallback = res => {
        this.getGroupList()
        this.updateUserInfo()
      }
    }
    
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getGroupList: function() {
    var that = this
    wx.request({
      url: 'https://group.mrourou.com/wx/group',
      header: {
        'content-type': 'application/json', // 默认值
        'wx-group-token': app.globalData.token
      },
      success: function (res) {
        console.log(res.data)
        that.setData({groupList:res.data.data.list})
      }
    })
  },
  updateUserInfo: function(e) {
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        console.log(res)
        wx.request({
          url: 'https://group.mrourou.com/wx/user',
          header: {
            'content-type': 'application/json', // 默认值
            'wx-group-token': app.globalData.token
          },
          method:"POST",
          data:{
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    })
  },
  //自己定义的方法
  toDetail: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/index?groupWxId=" + id
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '各种各样的群',
      path: '/pages/add/index',
      success: function (res) {
        console.log(res)
        var navUrl = '/pages/add/index?shareTicket=' + res.shareTickets[0]
        console.log(navUrl)
        wx.navigateTo({
          url: navUrl
        })
      },
      fail: function (res) {
        console.log(res)
        // 转发失败
      }
    }
  }
})
