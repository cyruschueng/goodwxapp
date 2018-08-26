//从配置文件获取openIdUrl和openGIdUrl
var openIdUrl = require('config').openIdUrl
var openGIdUrl = require('config').openGIdUrl
App({
  onLaunch: function (options) {
    var that = this
    //判断进入的场景
    if (options.scene === 1044) {
      this.globalData.tag = true
      //记录shareTicket
      this.globalData.shareticket = options.shareTicket
      //根据shareTicket获取加密数据
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          that.globalData.data = res.encryptedData
          that.globalData.iv = res.iv
          var endata = res.encryptedData
          var eniv = res.iv
          //检测登陆态
          wx.checkSession({
            success: function () {
              var myKey = wx.getStorageSync('sessionKey')
              that.globalData.sessionKey = myKey
              //发起请求解密数据得到openGId
              wx.request({
                url: openIdUrl,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  sessionKey: myKey,
                  data: endata,
                  iv: eniv,
                  sharing: 'true'
                },
                success: function (res) {
                  that.globalData.openGID = res.data.openGID
                  //发起请求根据openGId得到会面数据
                  wx.request({
                    url: openGIdUrl,
                    data: {
                      openGID: res.data.openGID
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function (res) {
                      if (res.data.message != 'zero') {
                        that.globalData.mymeeting = res.data
                      } else {
                        console.log('GETopenGID:' + res.data.openGID)
                      }
                    },
                    fail: function (res) {
                      console.log(res)
                    },
                  })
                },
                fail: function (res) {
                  console.log(res)
                },
              })
            },
            fail: function () {
              //登陆态失效需要重新登录
              wx.login({
                success: function (res) {
                  that.globalData.code = res.code
                  //通过上传code和加密数据到服务器进行解密
                  wx.request({
                    url: openIdUrl,
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      code: res.code,
                      data: endata,
                      iv: eniv,
                      sharing: 'false'
                    },
                    success: function (res) {
                      console.log(res)
                      that.globalData.openGID = res.data.openGID
                      //上传openGId得到对应的会面数据
                      wx.request({
                        url: openGIdUrl,
                        data: {
                          openGID: res.data.openGID
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        success: function (res) {
                          console.log(res)
                          if (res.data.message != 'zero') {
                            that.globalData.mymeeting = res.data
                          } else {
                            console.log('GETopenGID:' + res.data.openGID)
                          }
                        },
                        fail: function (res) {
                          console.log(res)
                        }
                      })
                      if (res.data.message == 'success') {
                        that.globalData.meeting = []
                      }
                      else {
                        that.globalData.meeting = res.data.meeting.sort(that.sortbydt)
                      }
                      that.globalData.openID = res.data.openID
                      if (that.globalData.sessionKey == null) {
                        that.globalData.sessionKey = res.data.sessionKey
                        //存储登陆态的sessionKey
                        wx.setStorageSync('sessionKey', res.data.sessionKey)
                      }
                    },
                    fail: function (res) {
                      console.log(res)
                    },
                  })
                },
                fail: function (res) {
                  console.log(res)
                },
              })

            }
          })
        },
        fail: function () {
        }
      })
      return
    }

    //不通过分享进入小程序时，触发登录
    wx.login({
      success: function (res) {
        that.globalData.code = res.code
        wx.request({
          url: openIdUrl,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            data: that.globalData.data,
            iv: that.globalData.iv,
            sharing: 'false'
          },
          success: function (res) {
            console.log(res)
            that.globalData.openGID = res.data.openGID
            wx.request({
              url: openGIdUrl,
              data: {
                openGID: res.data.openGID
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                if (res.data.message != 'zero') {
                  that.globalData.mymeeting = res.data
                } else {
                  console.log('GETopenGID:' + res.data.openGID)
                }
              },
              fail: function (res) {
                console.log(res)
              }
            })

            if (res.data.message == 'success') {
              that.globalData.meeting = []
            }
            else {
              that.globalData.meeting = res.data.meeting.sort(that.sortbydt)
            }
            that.globalData.openID = res.data.openID
            that.globalData.sessionKey = res.data.sessionKey
            wx.setStorageSync('sessionKey', res.data.sessionKey)
          },
          fail: function (res) {
            console.log(res)
          },
        })
      },
      fail: function (res) {
        console.log(res)
      },
    })


  },

  //排序函数，根据日期的新旧排序
  sortbydt: function (a, b) {
    var date = a.date.split("-")
    var time = a.time.split(":")
    var adt = date[0] + date[1] + date[2] + time[0] + time[1] + time[2]
    date = b.date.split("-")
    time = b.time.split(":")
    var bdt = date[0] + date[1] + date[2] + time[0] + time[1] + time[2]
    return parseInt(bdt) - parseInt(adt)
  },


  getUserInfo: function (cb) {
    var that = this
    wx.login({
      success: function (res) {
        console.log('login')
        console.log('code:' + res.code)
        that.globalData.code = res.code
        console.log('globaldatacode:' + that.globalData.code)
      }
    })
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    code: null,
    formID: null,
    remindtime: 0,
    openID: null,
    isChange: false,
    shareticket: '110',
    meeting: [],
    sessionKey: null,
    openGID: null,
    tag: false,   
    data: null,
    iv: null,
    mymeeting: null
  }
})
