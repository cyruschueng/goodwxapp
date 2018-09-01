//index.js
//获取应用实例
var util = require('../../utils/util.js');
Page({
  data: {
    userInfo: {},
    chance:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    rankingList:[],
    mentalList:[],
    rankingShow:true,
    mentalShow:false,
    awardShow: false,
    isTanchuang:false,
    giftList:[],
    indicatorDots: false,
    autoplay: false,
    interval: 4000,
    duration: 500,
    circular: true,
    announcement:''
  },
  //事件处理函数
  onLoad: function () {
    this.indexFun()
  },
  onShow(){
    this.indexFun()
    this.getRank()
  },
  //获取排行榜
  getRank(){
    var that = this;
    wx.request({
      url: util.Apis + "/h5/game/user/rank",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      method: 'POST',
      success: function (res) {
       
        that.setData({
          rankingList: res.data.data.rank2,
          mentalList: res.data.data.rank1,
        })
      }
    })
  },
  indexFun: function () {
    var nickName
    var avatarUrl
    var gender
    var city
    var userInfo
    var that = this
    //判断有没有授权, 如果用户已经同意小程序获取用户信息功能，后续调用接口不会弹窗询问
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
         
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
            
              that.getUser(nickName, avatarUrl, gender, city, userInfo)
            }
          })
        } else {
        
          that.getUser(nickName, avatarUrl, gender, city, userInfo)
        }
      }
    })
  },
  //开始游戏
  startGame(){
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '温馨提示',
            content: '亲，你目前尚未对荣耀大拷问授权哦。是否去授权？',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    wx.authorize({
                      scope: 'scope.userInfo',
                      success() {
                      
                        that.getUser(nickName, avatarUrl, gender, city, userInfo)
                      }
                    })
                  }
                })
              } else if (res.cancel) {
               
                that.switchFun()
              }
            }
          })
        } else {
          if (that.data.chance) {
            wx.navigateTo({
              url: '../answer/answer',
            })
          } else {
            that.setData({
              isTanchuang: true
            })
          }
        }
      }
    })
  },
  //关闭弹窗
  closePopup(){
    this.setData({
      isTanchuang: false
    })
  },
  //第一步事件：获取用户头像、昵称
  getUser: function (nickName, avatarUrl, gender, city, userInfo) {
    var that = this
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        var userInfo = res.userInfo
        nickName = userInfo.nickName
        avatarUrl = userInfo.avatarUrl
        gender = userInfo.gender //性别 0：未知、1：男、2：女
        city = userInfo.city
       
        that.getcode(nickName, avatarUrl, gender, city)
      }
    })
  },
  //第二步事件：获取用户唯一标识
  getcode: function (nickName, avatarUrl, gender, city) {
    var that = this
    
    wx.login({
      success: res => {
       
        wx.request({
          url: util.Apis + "/h5/game/weChat/code",
          data: {
            code: res.code,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'  // 默认值
          },
          method: 'POST',
          success: function (res) {
           
            var open = JSON.parse(res.data).openid;
            var sessionKey = JSON.parse(res.data).session_key;
           
            that.setData({
              sessionKey: sessionKey,
              openid: open
            })
            wx.setStorage({
              key: "sessionKey",
              data: {
                'sessionKey': sessionKey,
                'openid': open
              }
            })
            wx.request({
              url: util.Apis + "/h5/game/user/login",
              data: {
                openid: open,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'  // 默认值
              },
              method: 'POST',
              success: function (res) {
                if(res.data.code){
                 
                  wx.request({
                    url: util.Apis + "/h5/game/user/register",
                    data: {
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender, //性别 0：未知、1：男、2：女
                      city: city,
                      openid: open,
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'  // 默认值
                    },
                    method: 'POST',
                    success: function (res) {
                    
                      that.setData({
                        userInfo: res.data.data,
                        chance: res.data.data.chance
                      })
                      that.getRank()
                    }
                  })
                }else{
                 
                  that.setData({
                    userInfo:res.data.data,
                    chance: res.data.data.chance
                  })
                  that.getRank()
                }
              }
            })
          }
        })
      }
    })
  },

  //排行榜
  rankingList(){
    this.setData({
      rankingShow: true,
      mentalShow: false,
      awardShow: false
    })
  },
  //脑力排行榜
  mentalList(){
    this.setData({
      rankingShow: false,
      mentalShow: true,
      awardShow: false
    })
  },
  //全部奖品
  awardAll(){
    this.setData({
      rankingShow: false,
      mentalShow: false,
      awardShow: true
    })
    var that = this;
    wx.request({
      url: util.Apis + "/h5/game/user/giftList",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'  // 默认值
      },
      method: 'POST',
      success: function (res) {
       
        that.setData({
          giftList: res.data.data.data,
          announcement: res.data.data.Announcement.announcement
        })
      }
    })
  },
  // 转发分享
  onShareAppMessage: function (res) {
    var that = this;
        wx.showShareMenu({
          withShareTicket: true
        })
        if (res.from === 'button') {
          wx.showShareMenu({
            withShareTicket: true
          })
        }
        return {
          title: '荣耀大拷问',
          path: 'pages/index/index',
          imageUrl: 'http://yukicomic-pic.oss-cn-hangzhou.aliyuncs.com/XCX_rongyao/share.png',
          success: function (res) {
           
            wx.getShareInfo({
              shareTicket: res.shareTickets,
              success(res) {
               
                //解密
                wx.request({
                  url: util.Apis + "/h5/game/weChat/decodeUserInfo",
                  data: {
                    sessionKey: that.data.sessionKey,
                    encryptedData: res.encryptedData,
                    iv: res.iv
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'  // 默认值
                  },
                  method: 'POST',
                  success: function (res) {
                   
                    //查询是否分享过该群
                    wx.request({
                      url: util.Apis + "/h5/game/user/share",
                      data: {
                        openGId: res.data.data.openGId,
                        openid: that.data.openid,
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'  // 默认值
                      },
                      method: 'POST',
                      success: function (res) {
                        if(res.data.code){
                          wx.showToast({
                            title: '请分享到不同的群',
                            icon: 'none',
                            duration: 2000
                          })
                        }else{
                         
                          that.setData({
                            chance: res.data.data,
                            isTanchuang:false
                          })
                        }
                      }
                    })
                  }
                })
              },
              fail(res) {
               
                wx.showToast({
                  title: '请分享到不同的群',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
            // 转发成功
          },
          fail: function (res) {
           
            // 转发失败
          }
        }
     
  }
})
