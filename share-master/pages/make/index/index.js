const App = getApp()

Page({
  data: {
    userInfo: {},
    eranInfo: '1车灯，2车轮',
    image: "../../../assets/images/index-header@1x.png"
  },
  onLoad() {
  	this.getUserInfo()
  },
  navigateTo(e) {
    App.WxService.navigateTo('/pages/make/compose/index', {
        id: e.currentTarget.dataset.id
    })
  },
  getUserInfo() {
    const userInfo = App.globalData.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }
    App.getUserInfo()
    .then(data => {
     this.setData({
       userInfo: data
     })
    })
  },
  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '小璋的收益计算器',
      imageUrl: this.data.image,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }  
  }
})