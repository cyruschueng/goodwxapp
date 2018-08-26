// pages/list/list.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoFlag:true,
    selfNo:"",
    selfNick:"",
    selfPhoto:"",
    selfPass:"",
    topUser:[],
    restUser:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中.....',
    })
    wx.getUserInfo({
      success: res => {
        let selfNick = res.userInfo.nickName;
        let selfPhoto = res.userInfo.avatarUrl;
        // 获取成功
        app.req.loginWithUserinfo().then(res => {
          if (res === 1) {
            app.req.addrecord().then(res => {
              // console.log(res);
            // 获取本地shareTicket
            wx.getStorage({
              key: 'shareTicket',
              success: res=>{
                // 得到本地存储成功
                wx.getShareInfo({
                  // 给到唯一标识
                  shareTicket: res.data,
                  success: res => {
                    if (res.errMsg) {
                      console.log(res, "iv enc");
                      // 初始化用户信息   
                      // app.req.getgroup(res.encryptedData, res.iv).then(res => {
                      //   console.log(res, "排行榜数据");
                      //   if(res.f === 1){
                      //     let topUser = res.d.data.slice(0, 3);
                      //     let restUser = res.d.data.slice(3);
                      //     let selfPass = "";
                      //     for (let i = 0; i < res.d.data.length;i++ ){
                      //       if (res.d.data[i].UserID == res.d.userinfo.UserID ){
                      //         selfPass = i;
                      //       }
                      //     }
                      //     this.setData({
                      //       infoFlag: false,
                      //       topUser: topUser,
                      //       restUser: restUser,
                      //       selfPass: selfPass,
                      //       selfNick: selfNick,
                      //       selfPhoto: selfPhoto,
                      //     })
                      //     wx.hideLoading();
                      //   }
                      // })
                    }
                  }
                 })
              },
            })
            })
          } else if (res === 0) {
            wx.hideLoading();
            this.setData({
               infoFlag: true,
            })
          }
        }).catch(err => { console.log(err) })
      },
      fail:res=>{
        wx.hideLoading();
      }
    })
  },
  goGame:function(){
    if (this.data.infoFlag) {
      return;
    } else {
      wx.showLoading({
        title: '载入游戏中...',
      })
      app.req.loginWithUserinfo().then(res => {
        if (res === 1) {
          this.gameStart();
        } else if (res === 0) {
          wx.hideLoading();
          this.setData({
            infoFlag: true,
          })
        }
      }).catch(err => { console.log(err) })
    }
  },
  // 点击开始
  goGame: function () {
    if (this.data.infoFlag) {
      return;
    }
    wx.showLoading({
      title: '载入游戏中...',
    })
    app.req.loginWithUserinfo().then(res => {
      if (res === 1) {
        this.gameStart();
      } else if (res === 0) {
        wx.hideLoading();
        this.setData({
          infoFlag: true,
        })
      }
    }).catch(err => { console.log(err) })
  },
  // 开始游戏
  gameStart: function () {
    app.req.addrecord().then(res => {
      // console.log(res);
    }).then(res => {
      wx.hideLoading();
      wx.navigateTo({
        url: '../game/game',
      })
    })
  },
  userInfo:function(res){
    if (res.detail.userInfo) {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
     
    }
    return {
      title: '十关之后你会变成文盲,不信来战！',
      path: '/pages/list/list',
      success: function (res) {
        // 转发成功
        if (res.errMsg) {
          app.req.addmoney(1).then(res => {
            // console.log(res);
            if (res.f === 1) {
              wx.showToast({
                title: "分享成功",
                icon: "success",
                duration: 1000
              })
            }
          }).catch(err => { console.log(err) })
        }
      },
      fail: function (res) {
        // 转发失败
        // console.log(res)
      }
    }
  }
})