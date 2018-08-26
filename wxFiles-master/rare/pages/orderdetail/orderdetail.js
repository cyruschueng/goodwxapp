var app = getApp()
Page({

  data: {
    opq:0,
    ju:{}
  },

  onLoad: function (options) {
    var that = this
    app.load(that)
    
    wx.request({
      url: app.url + 'WxTOrder/selectbyflag',
      method:'get',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        orderno:options.num,
        orderflag:options.flag,
        userid:app.globalData.userid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          opq: 1
        })
        var sumbuy = 0
        var price = 0
        var or = res.data.rows[0].tOrOrderdetaillist
        for (var i = 0; i < or.length; i++){
          sumbuy = sumbuy + or[i].sumbuy
          price = price + or[i].sumbuy * or[i].sellprice
          console.log(sumbuy)
        }
        price = price + parseFloat(res.data.rows[0].sendprice)
        console.log(res)
        console.log(sumbuy)
        that.setData({
          ju: res.data.rows[0],
          sumbuy:sumbuy,
          price: price
        })
      }
    })
  },
  onShow: function () {
  
  },
  payit: function (e) {
    var that = this
    wx.request({
      url: app.url + 'ProPayMsg/sendpaymsg',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        orderno: that.data.ju.orderNum + 1,
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
              url: app.url + 'WxUserL/updateintegral',
              method: 'post',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                integral: that.data.ju.integral,
                countintegral: that.data.ju.integral,
                openid: app.globalData.openid
              },
              success: function (res) {
                console.log('积分累加')
                console.log(res)
              }
            })
            wx.request({
              url: app.url + 'WxOrderPay/updateflag?out_trade_no=' + e.currentTarget.dataset.no,
              method: 'post',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                console.log(res)
                wx.redirectTo({
                  url: '/pages/temp/temp?num=' + that.data.ju.orderNum + '&flag=1',
                })
              }
            })

            

            // for (var i = 0; i < that.data.list.length; i++) {
            //   wx.request({
            //     url: app.url + 'WxUserBuy/updatepro',
            //     method: 'post',
            //     header: { 'content-type': 'application/x-www-form-urlencoded' },
            //     data: {
            //       msgid: that.data.list[i].proid,
            //       shellcount: that.data.list[i].buypron,
            //     },
            //     success: function (res) {
            //       console.log('-----')
            //       console.log(res)
            //     }
            //   })
            // }

          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) { }
        })
      }
    })
  },
  cancelpl: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消订单吗？(取消将无法找回订单)',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.url + 'WxTOrder/updatedel',
            method: 'post',
            data: {
              orderId: [e.currentTarget.dataset.no]
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log(res)

            }
          })
        }
      }
    })
  }
})