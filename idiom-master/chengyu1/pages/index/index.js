//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    clickFlag: true,
    giveFlag: false,
  },
  //事件处理函数
  goGame: function () {
    if (this.data.clickFlag){
      return;
    }else{
      wx.showLoading({
        title: '载入游戏中...',
      })
      app.req.loginWithUserinfo().then(res => {
        if (res === 1) {
            this.gameStart();
        } else if (res === 0) {
          wx.hideLoading();
          this.setData({
            clickFlag: true,
          })
        }
      }).catch(err => { console.log(err) })
    } 
  },
  // 开始游戏
  gameStart:function(){
    app.req.addrecord().then(res => {
      // console.log(res);
    }).then(res => {
      wx.hideLoading();
      wx.navigateTo({
        url: '../game/game',
      })
    })
  },
  goGive: function () {
    this.setData({
      giveFlag: true,
    })
  },
  goClose:function(){
    this.setData({
      giveFlag: false,
    })
  },
  // 支付
  goPayOne:function(){
    app.req.pay(199).then(res=>{
      console.log(res);
    })
  },
  goPayTwo: function () {
    app.req.pay(520).then(res => {
      console.log(res);
    })
  },
  goPayThree: function () {
    app.req.pay(888).then(res => {
      console.log(res);
    })
  },
  goPayFour: function () {
    app.req.pay(1010).then(res => {
      console.log(res);
    })
  },
  goPayFive: function () {
    app.req.pay(1314).then(res => {
      console.log(res);
    })
  },
  goPaySix: function () {
    app.req.pay(2018).then(res => {
      console.log(res);
    })
  },
  onLoad:function(){
    wx.showShareMenu({
      withShareTicket: true,
    });
    wx.getUserInfo({
      success:res=>{
        // console.log(1);
        this.setData({
          clickFlag:false,
        })
      }
    })
  },
  userInfo: function (res) {
    // console.log(res)
    if (res.detail.userInfo){
      // 授权则进入游戏
      wx.showLoading({
        title: '载入游戏中...',
      })
      app.req.loginWithUserinfo().then(res => {
        if (res === 1) {
          this.gameStart();
        } else if (res === 0) {
          wx.hideLoading();
          this.setData({
            clickFlag: true,
          })
        }
      }).catch(err => { console.log(err) })
      this.setData({
        clickFlag: false,
      })
    }
  },
  giveInfo: function (res) {
    // console.log(res)
    if (res.detail.userInfo) {
      // 授权打开打赏界面
      wx.showLoading({
        title: '正在加载...',
      })
      app.req.loginWithUserinfo().then(res => {
        if (res === 1) {
          wx.hideLoading();
          this.setData({
            giveFlag: true,
          })
        } else if (res === 0) {
          wx.hideLoading();
          this.setData({
            clickFlag: true,
          })
        }
      }).catch(err => { console.log(err) })
      this.setData({
        clickFlag: false,
      })
    }
  },
  onShow:function(){
    this.setData({
      double: true,
    })
  },
  onShareAppMessage:function(res){
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '十关之后你会变成文盲,不信来战！',
      path: '/pages/list/list',
      success:res=>{
        console.log(res)
        // 转发成功
        if (res.errMsg){
          wx.getShareInfo({
            // 给到唯一标识
            shareTicket: res.shareTickets[0],
            success:res=>{
              if(res.errMsg){
                app.req.getgroup(res.encryptedData,res.iv).then(res => {
                    this.addmoney();
                })
              }
            }
          })
        }
      },
      fail: function(res) {
        // 转发失败
        console.log(res)
      }
    }
  },
  addmoney:function(){
    app.req.addmoney(1).then(res => {
      console.log(res);
      if (res.f === 1) {
        wx.showToast({
          title: "分享成功",
          icon: "success",
          duration: 1000
        })
      }
    }).catch(err => { console.log(err) })
  }
})
