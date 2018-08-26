//app.js
var openIdUrl = require('config').openIdUrl
var openGIdUrl = require('config').openGIdUrl
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this
    if (options.scene === 1044) {
      this.globalData.tag = true
      this.globalData.shareticket = options.shareTicket
      console.log(options.shareTicket)
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          that.globalData.data = res.encryptedData
          that.globalData.iv = res.iv

          console.log('first-----------------------------')
          var endata = res.encryptedData
          var eniv = res.iv
          console.log(endata)
          console.log(eniv)
          console.log('------------------------------------')

          wx.checkSession({
            success: function () {
              console.log('success-----------------------')
              var myKey = wx.getStorageSync('sessionKey')
              console.log(myKey)
              that.globalData.sessionKey = myKey
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
                  console.log(res)
                  that.globalData.openGID = res.data.openGID
                  console.log('openGID:' + res.data.openGID)

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
                    },
                  })

                  // wx.hideLoading()
                  // wx.showToast({
                  //   title: '加载完成',
                  //   icon: 'success'
                  // })
                  // wx.stopPullDownRefresh()
                },
                fail: function (res) {
                  console.log(res)
                  // wx.hideLoading()
                  // wx.showToast({
                  //   title: '加载失败，下拉刷新可重新加载',
                  // })
                  // wx.stopPullDownRefresh()
                },
              })

            },
            fail: function () {
              wx.login({
                success: function (res) {
                  console.log('code:' + res.code)
                  that.globalData.code = res.code
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
                      console.log('openGID:' + res.data.openGID)
                      // if(res.data.openGID=='fail'){
                      //   return that.onLaunch(options)
                      // }


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
                        console.log('sorted: ')
                        console.log(that.globalData.meeting)
                      }
                      that.globalData.openID = res.data.openID
                      if (that.globalData.sessionKey == null) {
                        console.log('sessionKey1----------------------')
                        console.log(res.data.sessionKey)
                        that.globalData.sessionKey = res.data.sessionKey
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

    console.log('login----------------------------------')
    wx.login({
      success: function (res) {
        console.log('code:' + res.code)
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
            console.log('openGID:' + res.data.openGID)

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
              console.log('sorted: ')
              console.log(that.globalData.meeting)
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
    // typeof bb == "function" && bb(this.globalData.code)

    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
          // console.log('data:'+res.encryptedData)
          // console.log('iv:'+res.iv)
          console.log(res.userInfo)
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
