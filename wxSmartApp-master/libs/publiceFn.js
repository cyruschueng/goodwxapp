import {
  reToMainPage
} from "router";
let app = getApp();
let PATH = app.globalData.PATH;

export function getShareScore(userId) {
  console.log(userId);
  return;
  wx.request({
    url: PATH + "/resource-service/fans/follow",
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    method: "GET",
    data: {
      userId: app.globalData.userId,
      followUserId: app.globalData.userId //模拟id
    },
    success: function (res) {
      // console.log(res);
      if (res.data.status == 200) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000,
          success: function () {
       
           reToMainPage();
          }
        })
      }
    }
  });
}



export function payDebt(userId) {

  console.log("成功进入支付函数");

  wx.request({
    url: PATH + '/resource-service/pay/payDebt',
    method: 'get',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    data: {
      userId: app.globalData.userId,
    },
    //post success
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200) {
        let payInfo = res.data.payInfo;
        wx.requestPayment({
          'timeStamp': payInfo.timeStamp,
          'nonceStr': payInfo.nonceStr,
          'package': payInfo.payPackage,
          'signType': 'MD5',
          'paySign': payInfo.paySign,
          'success': function (res) {
            console.log(res);
            wx.showToast({
              title: '交欠款成功',
              icon: 'loading',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  reToMainPage();
                }, 1500);
            
              }
            });
          },
          'fail': function (res) {
            console.log(res);
          }
        });
      }
    }
  })  


}



