//logs.js
var util = require('../../utils/util.js')
var md5 = require('../../utils/md5.js')

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

  },

  onLoad: function () {
    console.log('onLoad')

  },
  clickPay: function (e) {
    console.log("clickPay e:" + JSON.stringify(e))
    var param = {
      level_id: "1"
    }
    util.wxPrepay(param, function (ret) {
      console.log(JSON.stringify(ret))
      var msgObj = ret.data.obj
      console.log("msgObj:" + JSON.stringify(msgObj))

      wx.requestPayment({
        timeStamp: msgObj.timeStamp + "",
        nonceStr: msgObj.nonceStr,
        package: msgObj.package,
        signType: "MD5",
        paySign: msgObj.paySign,
        success: function (ret) {
          // success  
          console.log("sucess:" + JSON.stringify(ret))
        },
        fail: function (ret) {
          // fail  
          console.log("fail:" + JSON.stringify(ret))
        },
        complete: function () {
          // complete  
          console.log("complete:" + JSON.stringify(ret))
        }
      })

    })
  }
})
