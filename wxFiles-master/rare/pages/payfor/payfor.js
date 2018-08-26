var app = getApp()
Page({
  data: {
    model: '',
    isScroll: true,
    sum: 0,
    count: 0,
    list: [],
    address: {},
    kd: 0,
    insum: 0,
    countAll: 0,
    remark: '',
    opt: "00",
    ppt:1,
    te:0
  },
  changeAddress: function (e){
    var that = this
    that.setData({
      address: that.data.addressLi[e.currentTarget.id],
      isScroll: true,
      model: ''
    })
  },
  bindModel: function (e) {
    if (e.target.dataset.model == 'cancel') {
      this.setData({ isScroll: true })
    } else if (e.target.dataset.model == 'confirm') {
      this.setData({ isScroll: true })
    }
    this.setData({ model: e.target.dataset.model })
  },
  onLoad: function (options) {
    var that = this
    app.load(this)
    this.setData({ol:options.ol})
    if (options.types == 1) {
      this.setData({
        sum: options.sum,
        count: options.count,
        list: JSON.parse(options.list),
        gui:options.gui
      })
      var tmp = 0
      var te = 0
      var qwe = []
      var inp = 0
      var ins = parseFloat(app.globalData.integral) / 100

      for (var i = 0; i < that.data.list.length; i++) {
        if (ins / 100 >= parseFloat(that.data.list[i].integralprice)){
          tmp = tmp + parseFloat(that.data.list[i].integralprice)
          ins = ins - that.data.list[i].integralprice*100
        }
        
        te = te + parseFloat(that.data.list[i].integral)
        inp = inp + parseFloat(that.data.list[i].integralprice)*100
      }
      console.log('tetetetetetetetetetetetetetete')
      console.log(te)
      that.setData({
        insum: tmp,
        te:te,
        inp:0
      })
    } else {
      var list = []
      list.push(JSON.parse(options.list))
      this.setData({
        sum: options.sum,
        count: options.count,
        list: list,
        ppt: options.count,
        insum: list.integralprice
      })
    }

    wx.request({
      url: app.url + 'WxUserAddress/select',
      data: {
        openid: app.globalData.openid,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)

          that.setData({
            addressLi: res.data.rows
          })
          for (var i = 0; i < res.data.rows.length; i++) {
            if (res.data.rows[i].isdelete == 3) {
              that.setData({
                address: res.data.rows[i]
              })
            }
          }
          console.log('that.data.address')
          console.log(that.data.address == {})
          
        
        
        
        wx.request({
          url: app.url + 'WxProWLPrice/wxselect' ,
          method:'post',
          data:{
            AddressName: that.data.address.province
          },
          success: function (res) {
            console.log(res)
            that.setData({
              kd: res.data[0].firstwprice
            })
            that.setData({
              countAll: parseFloat(that.data.sum) + parseFloat(that.data.kd) - parseFloat(that.data.insum)
            })
            if(options.ol == 2){
              that.setData({
                countAll: 0,
                kd: 0
              })
            }
          }
        })
      }
    });
    that.setData({
      ol: options.ol,
      aol:options.aol
    })

    
  },
  onShow: function () {
    var that = this
  },
  remark: function (e) {
    var that = this
    that.setData({
      remark: e.detail.value
    })
  },
  payit: function () {

    var that = this
    if (that.data.ol == 1) {
      for (var i = 0; i < that.data.list.length; i++) {
        wx.request({
          url: app.url + 'WxUserBuy/updategwdel?ids=' + that.data.list[i].buycid,
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
        })
      }

    }
    if (that.data.address == {}) {
      
      wx.showModal({
        title: '您还没填写默认地址',
        content: '赶紧前往填写吧！(若不填写将无法购买商品哦)',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/address/address',
            })
          } else {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }else{
      var date = new Date()

      console.log('inp:' + that.data.insum + 'cop:' + that.data.countAll + 'sb:' + that.data.count)
      var month = date.getMonth()
      var day = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      if (month < 10) { month = "0" + month }
      if (day < 10) { day = "0" + day }
      if (hours < 10) { hours = "0" + hours }
      if (minutes < 10) { minutes = "0" + minutes }
      if (seconds < 10) { seconds = "0" + seconds }
      var ran = Math.random() * 1000000000000 - 1
      if (ran < 10000000000) {
        ran += 10000000000
      }
      var opt = date.getFullYear() + month + day + hours + minutes + seconds + parseInt(ran)

      console.log(JSON.stringify(that.data.list))
      var temps = []
      for (var i = 0; i < that.data.list.length; i++) {
        var temp = { orderno: opt + 1, proId: that.data.list[i].proid, inprice: that.data.list[i].integralprice, countprice: that.data.list[i].sellprice * that.data.list[i].buypron, sumbuy: that.data.list[i].buypron, wlsendprice: that.data.kd }
        temps.push(temp)
      }
      console.log(temps)
      var sumprice = 1
      if(that.data.ol == 2){
        wx.request({
          url: app.url + 'WxTOrder/insert',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          data: {
            orderNum: opt,
            address: that.data.address.province + that.data.address.city + that.data.address.area + that.data.address.address,
            recordtime: date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds,
            remark: that.data.remark,
            sendname: that.data.address.telusername,
            sendtel: that.data.address.tel,
            isdelete: 0,
            orderflag: 0,
            inprice: that.data.insum,
            countprice: that.data.countAll,
            sumbuy: that.data.count,
            proid: 1,
            sendtype: 0,
            sendprice: that.data.kd,
            userId: app.globalData.userid,
            listtemp: JSON.stringify(temps),
            openid: app.globalData.openid,
            sumprice: 0
          },
          success: function (res) {
            wx.request({
              url: app.url + 'WxOrderPay/updateflag?out_trade_no=' + opt,
              method: 'post',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                console.log(res)
                wx.redirectTo({
                  url: '/pages/temp/temp?ty=0&num=' + opt + '&flag=1',
                })
              }
            })
          }
        })
        wx.request({
          url: app.url + 'WxUserL/updateintegral',
          method: 'post',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            integral: '-'+that.data.aol,
            countintegral: 0,
            openid: app.globalData.openid
          },
          success: function (res) {
            console.log('积分累加')
            console.log(res)
          }
        })
      }else{

      wx.request({
        url: app.url + 'WxTOrder/insert',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        data: {
          orderNum: opt,
          address: that.data.address.province + that.data.address.city + that.data.address.area + that.data.address.address,
          recordtime: date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds,
          remark: that.data.remark,
          sendname: that.data.address.telusername,
          sendtel: that.data.address.tel,
          isdelete: 0,
          orderflag: 0,
          inprice: that.data.insum,
          countprice: that.data.countAll,
          sumbuy: that.data.count,
          proid: 1,
          sendtype: 0,
          sendprice: that.data.kd,
          userId: app.globalData.userid,
          listtemp: JSON.stringify(temps),
          openid: app.globalData.openid,
          sumprice: sumprice
        },
        success: function (res) {
          console.log("------openid" + app.globalData.openid)
          if (res.data.code == 100) {
            console.log('-------')
            console.log(res)
            wx.request({
              url: app.url + 'ProPayMsg/sendpaymsg',
              method: 'post',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                orderno: opt + 1,
                sumprice: sumprice,
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
                      wx.request({
                        url: app.url + 'WxOrderPay/updateflag?out_trade_no=' + opt,
                        method: 'post',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function (res) {
                          console.log(res)
                          wx.redirectTo({
                            url: '/pages/temp/temp?ty=0&num=' + opt + '&flag=1',
                          })
                        }
                      })

                      wx.request({
                        url: app.url + 'WxUserL/updateintegral',
                        method: 'post',
                        header: { 'content-type': 'application/x-www-form-urlencoded' },
                        data: {
                          integral: that.data.te,
                          countintegral: that.data.te,
                          openid: app.globalData.openid
                        },
                        success: function (res) {
                          console.log('积分累加')
                          console.log(res)
                        }
                      })
                      // wx.request({
                      //   url: app.url + 'WxUserL/updateintegral',
                      //   method: 'post',
                      //   header: { 'content-type': 'application/x-www-form-urlencoded' },
                      //   data: {
                      //     integral: that.data.te,
                      //     countintegral: that.data.te,
                      //     openid: app.globalData.openid
                      //   },
                      //   success: function (res) {
                      //     console.log('积分累加')
                      //     console.log(res)
                      //   }
                      // })

                      for (var i = 0; i < that.data.list.length; i++) {
                        wx.request({
                          url: app.url + 'WxUserBuy/updatepro',
                          method: 'post',
                          header: { 'content-type': 'application/x-www-form-urlencoded' },
                          data: {
                            msgId: that.data.list[i].proid,
                            shellcount: that.data.list[i].buypron,
                          },
                          success: function (res) {
                            console.log('-----')
                            console.log(res)
                          }
                        })
                      }
                   
                      
                        
                  
                    

                  },
                  fail: function (res) {
                    console.log(res)

                    wx.redirectTo({
                      url: '/pages/temp/temp?ty=1&num=' + opt + '&flag=0',
                    })
                  },
                  complete: function (res) { }
                })
              }
            })

          }
        }
      })
      }
    }
    
  }
})