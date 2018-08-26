//index.js
//获取应用实例
const app = getApp();

var imgurl = "https://zhongyoupingtai0515.oss-cn-hongkong.aliyuncs.com/upload/image/"
Page({
  data: {
    imgGroup: "",
    iconGroup: "",
    islogin: false
  },

  onShareAppMessage: function () {
    return {
      title: "中油平台",
      success: function (result) {//转发信息
        if (result.shareTickets) {  //群发          
          /* wx.getShareInfo({// 获取转发详细信息
             shareTicket: result.shareTickets[0],
             success(res) {
               console.log(" 获取转发详细信息1313")
               console.log(res.roomTopic); // 错误信息
               console.log(res.encryptedData); // 解密后为一个 JSON 结构（openGId  群对当前小程序的唯一 ID）
               console.log(res.iv); // 加密算法的初始向量
             },
           });*/
          t.share()

        } else {//个人

        }
      },
      fail: function (res) {
        console.log("取消分享")
      },
      complete() { }
    }
  },

  onLoad: function () {
   
    wx.showShareMenu({//模拟显示用户群
      withShareTicket: true,
    })
    let that = this;
    var info = wx.getStorageSync('ptuserinfo');
    var img = info.avatarUrl ? info.avatarUrl : "/img/user.png"
    this.setData({ username: info.username, selfimg: img })
    wx.request({
      url: app.globalData.apiBase + "/index.php/app/index.html",
      data: { uid: info.userid },
      success: function (res) {
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        that.setData({ rice: d })//剩余大米
      }
    })
    wx.request({
      url: app.globalData.apiBase + "/index.php/weixin/lunbo_and_icon.html",
      success: function (res) {
        // console.log(res.data)
        that.setData({
          imgGroup: res.data.imgGroup,  //轮播图及链接
          iconGroup: res.data.iconGroup,//icon图标链接
        })
      }
    })
  },
  onShow: function () { //页面切换显示大米

    let that = this;
    var info = wx.getStorageSync('ptuserinfo');
    if (info != "") {
      wx.request({ //获取用户大米
        url: app.globalData.apiBase + "index.php/app/index.html",
        data: { uid: info.userid },
        success: function (res) {
          let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
          that.setData({ rice: d, islogin: true })
        }
      })
    }
  },
  wxlogout() {//解除绑定
    let that = this;
    wx.showModal({
      title: '解除绑定', content: '确定要清除' + this.data.username + '的账号绑定么？',
      success: function (res) {
        //如果用户点击确定
        if (res.confirm) {
          wx.request({
            url: app.globalData.apiBase + "index.php/weixin/wxlogout.html",
            data: {
              trd_session: app.globalData.trd_session
            },
            success: function (res) {
              wx.removeStorage({
                key: 'ptuserinfo',
                success: function (msg) {
                  wx.showToast({
                    title: "账号解除绑定成功",
                    duration: 1000,
                    mask: true,
                    icon: "success"
                  }),
                    wx.setStorageSync('flag', 2)
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }, 1000)
                },
                fail: function (e) {
                  // console.log(e)
                }
              })
            }
          })
        }
      }
    })
  },

})

