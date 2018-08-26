var api = require('../api.js')
function checkPay(id,price,text,that,$wuxDialog,callback){
  console.log(typeof (price))
  var hasPay = wx.getStorageSync('pay'+id)
  if(price&&!hasPay){
    console.log(hasPay)


    $wuxDialog.open({
      title: '提示',
      content: text,
      verticalButtons: !0,
      buttons: [
        {
          text: '去支付'+price+'块钱',
          bold: 0,
          onTap(e){
            api.login(function (user) {
              wx.showNavigationBarLoading()
              wx.showToast({
                title: 'Loading……',
                duration:2000,
                icon: 'loading'
              })
              api.pay(user.openid,price,'购买模板',function (res) {
                console.log(res)
                wx.hideToast()
                wx.hideNavigationBarLoading();

                wx.requestPayment({
                  'timeStamp': res.timeStamp,
                  'nonceStr': res.nonceStr,
                  'package': res.package,
                  'signType': res.signType,
                  'paySign': res.paySign,
                  'success': function (re) {
                    callback();
                    return true;
                  },
                  'fail': function (res) {
                    that.showZanToast('支付失败，请稍后再试');
                    return false;
                  }
                })
              })
            },function () {
              return false;
            },'必须授权登录之后才能处理呢，是否重新授权登录？')
          }
        },
        {
          text: '开通VIP，免费使用',
          bold: !0,
          onTap(e){
            wx.navigateTo({
              url: '/pages/about/about?type=vip'
            })
          }
        },
        {
          text: '取消',
          bold: 0,
          onTap(e){
            return false;
          }
        },
      ],
    })
  }else{
    return true;
  }
}
module.exports = {
  checkPay: checkPay
}
