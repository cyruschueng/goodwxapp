// 发起会面页面
var app = getApp()
var requestUrl = require('../../config').requestUrl
var openIdUrl = require('../../config').openIdUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    date: '2017-07-14',
    time: '12:00',
    location: '地点',
    message: null,
    remindtime: 0,
    shareticket: '001',
    isDisabled: false,
    uplocation: {
      name: null,
      address: null,
      long: null,
      lat: null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
      }
    })
  },

  //通过调用地图接口设置会面地点信息
  setlocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          location: res.name,
          isDisabled: true,
          flag: true,
          uplocation:{
            name: res.name,
            address: res.address,
            long: res.longitude,
            lat: res.latitude
          }
        })
      },
      fail: function () {
        console.log('fail')
      },
      cancel: function () {
        console.log('cancel')
      }
    })
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
    // this.setData({
    //   location: this.data.location
    // })
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
    var that = this
    return {
      title: '您收到一个会面邀请',
      path: '/pages/accept/accept',
      success: function (res) {
        // 转发成功，获取shareTicket信息
        var ss = res.shareTickets[0]
        that.setData({
          shareticket: ss
        })
        // 通过shareTicket得到openGId
        wx.getShareInfo({
          shareTicket: ss,
          success: function (res) {
            wx.request({
              url: openIdUrl,
              data: {
                data: res.encryptedData,
                iv: res.iv,
                sessionKey: app.globalData.sessionKey,
                sharing: 'true'
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                var upload = null
                if(that.data.flag==true){
                  upload = JSON.stringify(that.data.uplocation)
                }else{
                  upload = that.data.location
                }
                wx.request({
                  url: requestUrl,
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    openID: app.globalData.openID,
                    date: that.data.date,
                    time: that.data.time,
                    location: upload,
                    message: that.data.message,
                    remindtime: that.data.remindtime,
                    openGID: res.data.openGID
                  },
                  method: 'POST',
                  success: function (res) {
                    console.log(res)
                    wx.showToast({
                      title: 'shareTicket分享成功',
                      icon: 'success'
                    })
                  },
                  fail: function (res) {
                    console.log(res)
                  }
                })

              },
              fail: function (res) {
                console.log(res)
              },
            })
          },
          //转发失败，此时该会面仅用户个人拥有
          fail: function (res) {
            var upload = null
            if (that.data.flag == true) {
              upload = JSON.stringify(that.data.uplocation)
            } else {
              upload = that.data.location
            }
            wx.request({
              url: requestUrl,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                openID: app.globalData.openID,
                date: that.data.date,
                time: that.data.time,
                location: upload,
                message: that.data.message,
                remindtime: that.data.remindtime,
                openGID: 'self'
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                wx.showToast({
                  title: '分享失败，只能转发给群聊，此会面仅个人有效',
                  icon: 'fail'
                })
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        })
        wx.redirectTo({
          url: '../first/first',
        })
      },
      fail: function (res) {
        // 转发失败
        console.log('share fail')
      }
    }
  },

  // 表单提交，用于确认提交输入的会面地点与会面详情信息
  formsubmit: function (event) {
    if (event.detail.value.place != "") {
      this.setData({
        location: event.detail.value.place,
        message: event.detail.value.textarea
      })
    } else {
      this.setData({
        message: event.detail.value.textarea
      })
    }
    wx.showToast({
      title: '请点击右上角转发,转发仅群聊有效',
      icon: 'success',
      duration: 2000
    })
  },

  //日期选择器
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 时间选择器
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

})