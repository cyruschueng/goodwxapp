const app = getApp()

Page({
  data: {
    download: 'download',
    modal: 'modal',
    imgUrls: [
      'https://snkwx.ledo.com/dist/hd/img/slide1.png',
      'https://snkwx.ledo.com/dist/hd/img/slide2.png',
      'https://snkwx.ledo.com/dist/hd/img/slide3.png',
      'https://snkwx.ledo.com/dist/hd/img/slide4.png',
      'https://snkwx.ledo.com/dist/hd/img/slide5.png'
    ],
    card: 'AAAAAAAAAAAA',
    modalHelp:'modalHelp',
    openid:''
  }, close1: function (e) {
    console.log(e.target.id)
    this.setData({
      modalHelp: 'modalHelp',
      modal: 'modal',
      download: 'download',
    })
  }, zhuli:function(e){
    console.log(e.target.id)
    wx.showLoading({
      title: '正在处理....',
      mask: 'true'
    })
    wx.request({
      url: 'https://snkwx.ledo.com/ledo/business/award/cashin2?uniqcode=2001&type=1' + '&awardId=' + e.target.id + '&openid=' + this.data.openid + '&uid=' + app.globalData.id,  
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 100) {
          wx.hideLoading()
          that.setData({
            modalHelp: 'modalHelp',
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
        } else if (res.data.code == 199) {
          wx.hideLoading()
          that.setData({
            modalHelp: 'modalHelp',
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
        }   else {
          wx.hideLoading()
          wx.showToast({
            title: '系统异常....',
            icon: 'success',
            duration: 2000
          })
        }



      }
    })



  },
   xiazai: function (e) {
    console.log(e.target.id)
   
    this.setData({
      download: 'downloadShow',
      modal: 'modalShow'
    })
  }, copyCard: function(e){
     console.log(e.target.id)
     var that =this
     wx.setClipboardData({
       data: this.data.card,
       success: function (res) {
         wx.getClipboardData({
           success: function (res) {
             console.log(res.data) // data
             that.setData({
               modalHelp: 'modalHelp',
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
  }, copy: function (e) {
    var that = this
    console.log(e.target.id)
    var url = '';
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.system)
        var system = res.system
        if (system.substring(0, 3) == "iOS") {
          url = 'https://itunes.apple.com/cn/app/quan-huang-shi-jie/id1196668154'
        } else if (system.substring(0, 3) == "And") {
          url = 'http://dl01.ledo.com/kofworld/kofworldsnk-1.0.0_100_3_2018-01-13_11-51-46_PUBLISHo.apk'
        }

      }
    })
    console.log("url=", url)
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            that.setData({
              
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

   }, onLoad: function () {
     console.log("share=code=",app.globalData.code)
     console.log("share=id=",app.globalData.id)
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
                    
                     openid: res.data.openid
                   
                   })
                 } else if (res.data.status == 1) {//已经助力过 index

                   that.setData({
                      
                     openid: res.data.openid
                     
                   })
                 } else if (res.data.status == 2) {//没有助力过 share

                   that.setData({
                      
                     openid: res.data.openid
                     
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
                                            
                                            
                                           if (res.data.status == 0) {//不是点分享进来的 index

                                             that.setData({
                                               
                                               openid: res.data.openid
                                               
                                             })
                                           } else if (res.data.status == 1) {//已经助力过 index

                                             that.setData({
                                                
                                               openid: res.data.openid
                                               
                                             })
                                           } else if (res.data.status == 2) {//没有助力过 share

                                             that.setData({
                                               
                                               openid: res.data.openid
                                               
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
  }
})