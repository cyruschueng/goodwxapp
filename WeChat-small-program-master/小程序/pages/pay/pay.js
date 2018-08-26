//获取应用实例
var app = getApp()
Page({
    data: {
        txtOrderCode: '',
        login: true
    },
    onLoad:function () {

    },
    goPay:function () {
        console.log('支付')
        wx.requestPayment({
            'timeStamp': '2018-03-28 11:00:00',
            'nonceStr': 'sign',
            'package': 'prepay_id=wx21231232',
            'signType': 'MD5',
            'paySign': 'sign',
            'success':function(res){

            },
            'fail':function(res){
                
            }
        })
    }
  /* goPay:function () {
       var ordercode = this.data.txtOrderCode;
       wx.login({
           success: function (res) {
               if (res.code) {
                   wx.request({
                       url: 'https://www.yourdomain.com/pay',
                       data: {
                           code: res.code,//要去换取openid的登录凭证
                           ordercode: ordercode
                       },
                       method: 'GET',
                       success: function (res) {
                           console.log(res.data)
                           wx.requestPayment({
                               timeStamp: res.data.timeStamp,
                               nonceStr: res.data.nonceStr,
                               package: res.data.package,
                               signType: 'MD5',
                               paySign: res.data.paySign,
                               success: function (res) {
                                   // success
                                   console.log(res);
                               },
                               fail: function (res) {
                                   // fail
                                   console.log(res);
                               },
                               complete: function (res) {
                                   // complete
                                   console.log(res);
                               }
                           })
                       }
                   })
               } else {
                   console.log('获取用户登录态失败！' + res.errMsg)
               }
           }
       })
   }*/
  /*goPay:function () {
      wx.login({
          success: function (res) {
              if (res.code) {
                  //发起网络请求
                  wx.request({
                      url: 'https://explome/login',
                      data: {
                          code: res.code,
                      },
                      success: function (msg) {
                          wx.hideLoading();
                          console.log(msg);
                          if (msg.data.code == 20000) {
                              //登录成功,把3rd_session存入本地Storage中
                              wx.setStorage({
                                  key: 'rd_session',
                                  data: msg.data.rd_session,
                              });
                          } else {
                              wx.showToast({
                                  title: msg.data.message,
                                  icon: "none",
                                  duration: 2000
                              })
                          }
                      },
                      fail: function () {
                          wx.showToast({
                              title: '用户登录！',
                              icon: 'none'
                          })
                          wx.hideLoading();

                      }
                  })
              } else {
                  wx.showToast({
                      title: '获取用户登录态失败！' + res.errMsg,
                      icon: 'none'
                  })
                  wx.hideLoading();
              }
          }
      });

      wx.request({
          url: 'https://explome/wechat/pay',
          data: {
              actionId: 21,
              rd_session: wx.getStorageSync('rd_session'),
              buy_number: 1,
          },
          success: function (msg) {
              console.log(msg);
              const payData = msg.data;
              if (payData.code == 20000) {
                  console.log("open pay");
                  wx.requestPayment({
                      timeStamp: payData.data.timeStamp.toString(),
                      nonceStr: payData.data.nonceStr,
                      package: "prepay_id=" + payData.data.package,
                      signType: payData.data.signType,
                      paySign: payData.data.paySign,
                      success: function (message) {
                          wx.showToast({
                              title: '支付成功',
                          })
                      },
                      fail: function (message) {

                          console.log(message);
                          wx.showToast({
                              title: '取消支付'
                          })
                      }
                  })
              } else {
                  console.log("not open pay");
              }
          },
          fail: {

          }
      })
  }*/
})