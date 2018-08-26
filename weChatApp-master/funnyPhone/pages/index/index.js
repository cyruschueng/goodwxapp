//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentIndex:100000,
    works:[
      { callName:"slidewater",remarks:"备注",moreInfo:"more"},
      { callName: "slidewater", remarks: "备注", moreInfo: "more",length:"0:00" },
      { callName: "slidewater", remarks: "备注", moreInfo: "more" ,length: "0:00"},
      { callName: "slidewater", remarks: "备注", moreInfo: "more" ,length: "0:00"},
      { callName: "slidewater", remarks: "备注", moreInfo: "more" ,length: "0:00"},
      { callName: "slidewater", remarks: "备注", moreInfo: "more" ,length: "0:00"},
      { callName: "slidewater", remarks: "备注", moreInfo: "more" ,length: "0:00"},
      { callName: "slidewater", remarks: "备注", moreInfo: "more" ,length: "0:00"},
      ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
     wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  stop(){},
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tapePlay(e){
    console.log("e",e.currentTarget.dataset.current)
    console.log("e",e)
    var that = this;
    if(e.currentTarget.dataset.current != that.data.currentIndex){
       that.setData({
          currentIndex:e.currentTarget.dataset.current,
        })
     }else{
       that.setData({
          currentIndex:10000
        })
     }
   
  },
  goProduce(){
    wx.navigateTo({
      url: '/pages/produce/produce',
    })
  },
  goDetail(){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  }
})
