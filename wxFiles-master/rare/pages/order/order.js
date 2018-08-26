var app = getApp()
Page({
  data: {
    change: 1,
    list: [],
    list1: [],
    list2: [],
    list3: [],
  },
  onLoad: function (options) {
    var that = this
    app.load(that)
    wx.request({
      url: app.url + 'WxTOrder/selectbyflag?orderflag=0&userid=' + app.globalData.userid,
      success: function (res) {
        console.log(res.data.rows)
        var li = res.data.rows
        that.setData({
          list: li
        })
      }
    })
    
  },
  shouhuo: function (e) {
    wx.request({
      url: app.url + 'WxOrderPay/updateflag',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        out_trade_no: e.currentTarget.dataset.no
      },
      success: function(res){
        console.log(res)
        
      }
    })


  },
  toNotice: function(){
    wx.showToast({
      title: '提醒成功',
      icon:'success',
      duration:800
    })
  },
  
  navToEvaluate: function (e) {
    wx.navigateTo({
      url: '/pages/evaluate/evaluate?num='+e.currentTarget.dataset.no,
    })
  },
  navToOrderdetail: function (e) {
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?num=' + e.currentTarget.dataset.num + '&flag=' + e.currentTarget.dataset.flag,
    })
  },
  changeTap: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    this.setData({ change: id })
    if (id == 2) {
      wx.request({
        url: app.url + 'WxTOrder/selectbyflag?orderflag=1&userid=' + app.globalData.userid,
        success: function (res) {
          console.log(res)
          var li = res.data.rows
          that.setData({
            list1: li
          })
          wx.request({
            url: app.url + 'WxTOrder/selectbyflag?orderflag=2&userid=' + app.globalData.userid,
            success: function (res) {
              console.log(res)
              for (var i = 0; i < res.data.rows.length;i++){
                li.push(res.data.rows[i])
              }
              that.setData({
                list1: li
              })

            }
          })
        }
      })
    }
    if (id == 3) {
      wx.request({
        url: app.url + 'WxTOrder/selectbyflag?orderflag=3&userid=' + app.globalData.userid,
        success: function (res) {
          console.log(res.data.rows)
          var li = res.data.rows
          that.setData({
            list2: li
          })
          wx.request({
            url: app.url + 'WxTOrder/selectbyflag?orderflag=4&userid=' + app.globalData.userid,
            success: function (res) {
              console.log(res.data.rows)
              for (var i = 0; i < res.data.rows.length; i++) {
                li.push(res.data.rows[i])
              }
              that.setData({
                list2: li
              })

            }
          })
        }
      })
    }
    if (id == 4) {
      wx.request({
        url: app.url + 'WxTOrder/selectbyflag?orderflag=5&userid=' + app.globalData.userid,
        success: function (res) {
          console.log(res.data.rows)
          var li = res.data.rows
          that.setData({
            list3: li
          })
          wx.request({
            url: app.url + 'WxTOrder/selectbyflag?orderflag=6&userid=' + app.globalData.userid,
            success: function (res) {
              console.log(res.data.rows)
              for (var i = 0; i < res.data.rows.length; i++) {
                li.push(res.data.rows[i])
              }
              that.setData({
                list3: li
              })
              wx.request({
                url: app.url + 'WxTOrder/selectbyflag?orderflag=7&userid=' + app.globalData.userid,
                success: function (res) {
                  console.log(res.data.rows)
                  for (var i = 0; i < res.data.rows.length; i++) {
                    li.push(res.data.rows[i])
                  }
                  that.setData({
                    list3: li
                  })

                }
              })
            }
          })
        }
      })
    }
  },
  changePage: function (e) {
    var that = this
    this.setData({ change: e.detail.current + 1 })
    if (e.detail.current == 1) {
      wx.request({
        url: app.url + 'WxTOrder/selectbyflag?orderflag=1&userid=' + app.globalData.userid,
        success: function (res) {
          console.log(res.data.rows)
          var li = res.data.rows
          that.setData({
            list1: li
          })
          wx.request({
            url: app.url + 'WxTOrder/selectbyflag?orderflag=2&userid=' + app.globalData.userid,
            success: function (res) {
              console.log(res.data.rows)
              for (var i = 0; i < res.data.rows.length; i++) {
                li.push(res.data.rows[i])
              }
              that.setData({
                list1: li
              })

            }
          })
        }
      })
    }
    if (e.detail.current == 2) {
      wx.request({
        url: app.url + 'WxTOrder/selectbyflag?orderflag=3&userid=' + app.globalData.userid,
        success: function (res) {
          console.log(res.data.rows)
          var li = res.data.rows
          that.setData({
            list2: li
          })
          wx.request({
            url: app.url + 'WxTOrder/selectbyflag?orderflag=4&userid=' + app.globalData.userid,
            success: function (res) {
              console.log(res.data.rows)
              for (var i = 0; i < res.data.rows.length; i++) {
                li.push(res.data.rows[i])
              }
              that.setData({
                list2: li
              })

            }
          })
        }
      })
    }
    if (e.detail.current == 3) {
      wx.request({
        url: app.url + 'WxTOrder/selectbyflag?orderflag=5&userid=' + app.globalData.userid,
        success: function (res) {
          console.log(res.data.rows)
          var li = res.data.rows
          that.setData({
            list3: li
          })
          wx.request({
            url: app.url + 'WxTOrder/selectbyflag?orderflag=6&userid=' + app.globalData.userid,
            success: function (res) {
              console.log(res.data.rows)
              for (var i = 0; i < res.data.rows.length; i++) {
                li.push(res.data.rows[i])
              }
              that.setData({
                list3: li
              })
              wx.request({
                url: app.url + 'WxTOrder/selectbyflag?orderflag=7&userid=' + app.globalData.userid,
                success: function (res) {
                  console.log(res.data.rows)
                  for (var i = 0; i < res.data.rows.length; i++) {
                    li.push(res.data.rows[i])
                  }
                  that.setData({
                    list3: li
                  })

                }
              })
            }
          })
        }
      })
    }
  },
  
  payit: function (e) {
    wx.request({
      url: app.url + 'ProPayMsg/sendpaymsg',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        orderno: e.currentTarget.dataset.no + 1,
        sumprice: 1,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res)
        var li = JSON.parse(res.data)
        wx.requestPayment({
          timeStamp: li.time,
          nonceStr: li.nonceStr,
          package: "prepay_id=" + li.prepay_id,
          signType: 'MD5',
          paySign: li.paySign,
          success: function (res) {
            console.log(res)
            wx.request({
              url: app.url + 'WxOrderPay/updateflag?out_trade_no=' + e.currentTarget.dataset.no,
              method: 'post',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                console.log(res)
                wx.navigateTo({
                  url: '/pages/temp/temp?num=' + e.currentTarget.dataset.no + '&flag=1',
                })
              }
            })
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) { }
        })
      }
    })
  },
  cancelorder: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定要取消订单吗？(取消将无法找回订单)',
      success: function (res){
        if(res.confirm){
          wx.request({
            url: app.url + 'WxTOrder/updatedel',
            method: 'post',
            data:{
              ids: e.currentTarget.dataset.no 
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: '取消成功！',
                icon:'success',
                duration: 800
              })
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/order/order',
                })
              },800)
              
            }
          })
        }
      }
    })
  },

  onShow: function () {

  },

})