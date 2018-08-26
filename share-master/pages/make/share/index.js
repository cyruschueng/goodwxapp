const App = getApp()

Page({
  data: {
    items: {
      images: [
        {
          path: "https://www.skyvow.cn/uploads/ov4h5SPywe66xu35vTmHqyV51Bf76r1508763643000.jpg",
          url: "/pages/test/index",
        },
        {
          path: "//onb3ey4ll.qnssl.com/o_1bi3hbeqdv9a10nc2101bslibv9.jpg",
          url: "/pages/test2/index",
        },
        {
          path: "https://www.skyvow.cn/uploads/ov4h5SPywe66xu35vTmHqyV51Bf76r1508763643000.jpg",
          url: "/pages/test2/index",
        },
      ],
    },
    
    indicatorDots: 0,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !0,
    eranInfo: '1车灯，2车轮',
    total: 3,
    nickName: 'eeeee',
    count: '111111'
  },
  onLoad() {
    var _this = this
  	_this.getUserInfo()
  },
  swiperchange(e) {
    console.log(e)
    this.setData({
      current: e.detail.current, 
    })
  },
  onSwiperTap(e) {
    const url = e.target.dataset.url
    App.WxService.navigateTo(url)
  },
  dotstip(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      current: index, 
    })
  },
  dotsL(e) {
    var indexL = this.data.current
    indexL--
    if(indexL < 0){
      indexL = this.data.total-1
    }
    this.setData({
      current: indexL, 
    })
  },
  dotsR(e) {
    var indexR = this.data.current
    indexR++
    if(indexR > this.data.total-1){
      indexR = 0
    }
    this.setData({
      current: indexR, 
    })
    console.log(e)
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
  helpMake(e) {
    wx.showModal({
      title: '恭喜，您帮他赚得1车币',
      showCancel: false,
      confirmText: '马上领取',
      content: '同时，他赠送您9车币',
      success: function(res) {
        if (res.confirm) {
          wx.showModal({
            title: '车币领取成功！',
            showCancel: false,
            confirmText: '看赚车券',
            content: '您是首次登陆【赚个车】，您的好友××赠送您一张“赚车券”你也可以开始“吆喝一声赚个车”了',
            success: function(res) {
              if (res.confirm) {
                App.WxService.switchTab('/pages/index/index')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})