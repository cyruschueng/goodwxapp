//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://snkwx.ledo.com/dist/hd/img/slide1.png',
      'https://snkwx.ledo.com/dist/hd/img/slide2.png',
      'https://snkwx.ledo.com/dist/hd/img/slide3.png',
      'https://snkwx.ledo.com/dist/hd/img/slide4.png',
      'https://snkwx.ledo.com/dist/hd/img/slide5.png'
    ],
    imgs:'',
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    wiper_mode: "scaleToFill",
    hdclass: 'details',
    btn_moreHead: 'btn_moreHead',
    download: 'download',
    modal: 'modal',
    invited: 'invited',
    Getgift:'Getgift',
    card:'',
    userInfo: {},
    imageShow: 'hide',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url: '',
    shareUrl: '',
    imgsNum: 0,
    openid: '',
    uid: 0
    
  }, //分享事件处理函数
  onShareAppMessage(options) {
    var that = this
    console.log("shareUrl", that.shareUrl)
    return {
      title: "拳皇世界寻找最初玩伴",
      path: that.shareUrl,
      imageUrl: 'https://snkwx.ledo.com/dist/hd/img/211-170.png',
      success: function (res) {
        // console.log
        // wx.getShareInfo({
        //   shareTicket: res.shareTickets,
        //   success: function (res) {
        //     console.log("res1=", res)
        //   }, fail: function (res) {
        //     console.log("r1==", res)
        //   }, complete: function (res) {
        //     console.log("re1==", res)
        //   }
        // })
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, share: function (e) {
    console.log(e.target.id)
    



  }, xiazai: function (e) {
    console.log(e.target.id)
   
    this.setData({
      download: 'downloadShow',
      modal: 'modalShow'
    })


  }, guize: function (e) {
    console.log(e.target.id)
    this.setData({
      hdclass: 'detailsShow',
      modal: 'modalShow'
    })
  }, close1: function (e) {
    console.log(e.target.id)
    this.setData({
      hdclass: 'details',
      modal: 'modal',
      download: 'download',
    })
  }, show: function (e) {
    console.log(e.target.id)
    this.setData({
      invited: 'btn_moreHeadShow',
      btn_moreHead: 'hide',
      imageShow: 'invitedHeadimg '
    })

  }, close: function (e) {
    console.log(e.target.id)
    this.setData({
      modal: 'modal',
      Getgift: 'Getgift'
    })
  } ,getlibao: function (e) {
    console.log(e.target.id)
    var that=this
    wx.showLoading({
      title: '正在处理....',
      mask: 'true'
    })
    
    wx.request({
      url: 'https://snkwx.ledo.com/ledo/business/award/cashin2?uniqcode=2001&type=2' + '&awardId=' + e.target.id + '&openid=' + this.data.openid + '&uid=' + this.data.uid, //仅为示例，并非真实的接口地址
      data: {
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.code==100){
          wx.hideLoading()
          that.setData({
            Getgift: 'GetgiftShow',
            modal: 'modalShow',
            card: res.data.card
          })
          // wx.setClipboardData({
          //   data: res.data.card,
          //   success: function (res) {
          //     wx.getClipboardData({
          //       success: function (res) {
          //         console.log(res.data) // data
          //       }
          //     })
          //   }
          // })
        } else if (res.data.code == 105){
          wx.hideLoading()
          that.setData({
            Getgift: 'GetgiftShow',
            modal: 'modalShow',
            card: res.data.card
          })
          // wx.setClipboardData({
          //   data: res.data.card,
          //   success: function (res) {
          //     wx.getClipboardData({
          //       success: function (res) {
          //         console.log(res.data) // data
          //       }
          //     })
          //   }
          // })
        } else if (res.data.code == 103) {
          wx.hideLoading()
          wx.showToast({
            title: '助力好友未达标',
            icon: 'none', 
            duration: 2000
          })
        }else{
          wx.hideLoading()
          wx.showToast({
            title: '系统异常....',
            icon: 'success',
            duration: 2000
          })
        }
        
       

      }
    })


  }, copyCard: function (e) {
    console.log(e.target.id)
    var that = this
    wx.setClipboardData({
      data: this.data.card,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            that.setData({
              modal: 'modal',
              hdclass: 'details',
              Getgift: 'Getgift',
              download: 'download',
            })
            wx.showToast({
              title: '复制成功！',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  }, copy:function(e){
    var that=this
    console.log(e.target.id)
    var url='';
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.system)
        var system = res.system
        if (system.substring(0, 3) == "iOS") {
          url ='https://itunes.apple.com/cn/app/quan-huang-shi-jie/id1196668154'
        } else if (system.substring(0, 3) == "And") {
          url ='http://dl01.ledo.com/kofworld/kofworldsnk-1.0.0_100_3_2018-01-13_11-51-46_PUBLISHo.apk'
        }

      }
    })
    console.log("url=",url)
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            that.setData({
              hdclass: 'details',
              modal: 'modal',
              download: 'download',
            })
            wx.showToast({
              title: '复制成功！',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })

  },
  onLoad: function () {

    
  


    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })


    console.log("code=" + app.globalData.code)
    var that = this;
     
    wx.getSetting({
      success: res => {
        // if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {

            wx.request({
              url: 'https://snkwx.ledo.com/ledo/fun/deal',
              data: {
                code: app.globalData.code,
                encryptedData: res.encryptedData,
                iv: res.iv,
                id: app.globalData.id
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'POST',
              success: function (res) {
                console.log(res.data)


                console.log("openid=", res.data.openid)

                if (res.data.status == 0) {//不是点分享进来的 index

                  that.setData({
                    shareUrl: 'pages/index/index?id=' + res.data.uid,
                    imgs: res.data.imgs.split(','),
                    imgsNum: res.data.imgsNum,
                    openid: res.data.openid,
                    uid: res.data.uid
                  })
                } else if (res.data.status == 1) {//已经助力过 index

                  that.setData({
                    shareUrl: 'pages/index/index?id=' + res.data.uid,
                    imgs: res.data.imgs.split(','),
                    imgsNum: res.data.imgsNum,
                    openid: res.data.openid,
                    uid: res.data.uid
                  })
                } else if (res.data.status == 2) {//没有助力过 share

                  that.setData({
                    shareUrl: 'pages/index/index?id=' + res.data.uid,
                    imgs: res.data.imgs.split(','),
                    imgsNum: res.data.imgsNum,
                    openid: res.data.openid,
                    uid: res.data.uid
                  })
                }

              },
              fail: function () {
                // fail
                console.log("获取失败！")
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res_user) {

                                      wx.request({
                                        url: 'https://snkwx.ledo.com/ledo/fun/deal',
                                        data: {
                                          code: res_login.code,
                                          encryptedData: res_user.encryptedData,
                                          iv: res_user.iv,
                                          id: app.globalData.id

                                        },
                                        method: 'GET',
                                        header: {
                                          'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                          console.log(res.data)
                                          that.shareUrl = 'pages/index/index?id=' + res.data.uid
                                          console.log("that.shareUrl=", that.shareUrl)
                                          if (res.data.status == 0) {//不是点分享进来的 index

                                            that.setData({
                                              shareUrl: 'pages/index/index?id=' + res.data.uid,
                                              imgs: res.data.imgs.split(','),
                                              imgsNum: res.data.imgsNum,
                                              openid: res.data.openid,
                                              uid: res.data.uid
                                            })
                                          } else if (res.data.status == 1) {//已经助力过 index

                                            that.setData({
                                              shareUrl: 'pages/index/index?id=' + res.data.uid,
                                              imgs: res.data.imgs.split(','),
                                              imgsNum: res.data.imgsNum,
                                              openid: res.data.openid,
                                              uid: res.data.uid
                                            })
                                          } else if (res.data.status == 2) {//没有助力过 share

                                            that.setData({
                                              shareUrl: 'pages/index/index?id=' + res.data.uid,
                                              imgs: res.data.imgs.split(','),
                                              imgsNum: res.data.imgsNum,
                                              openid: res.data.openid,
                                              uid: res.data.uid
                                            })
                                          }
                                        }
                                      })
                                    }
                                  })
                                }
                              }
                            });
                          }
                        }, fail: function (res) {

                        }
                      })

                    }
                  }
                })

              }, complete: function (res) {
                console.log("获取用户信息完成1！")

              }
              ,
              complete: function () {
                // complete
                console.log("获取用户信息完成2！")
              }
            })

          }
        })
      }
    })







    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })


    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // app.userInfoReadyCallback = res => {
      //   console.log("res=",res)
      //   this.setData({
      //     userInfo: res.userInfo,
      //     hasUserInfo: true
      //   })
      //   getUserInfo(app.globalData.code, res.encryptedData, res.iv, app.globalData.id)
      // }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function () {

  }
})
