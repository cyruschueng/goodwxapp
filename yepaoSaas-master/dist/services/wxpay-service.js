import * as AuthService from './auth-service';
import * as appConfig from '../app-config';
import Promise from '../utils/npm/bluebird.min';

import {
  wxJsonBackendPostRequestP as jsonPostRequest
}
from './wx-request-promise';

import {
  wxUrlencodedBackenPostRequestP as urlencodePostRequest
}
from 'wx-request-promise';


// yp - xcx - submitBuyCourseOrder
// getUserInfo

// 课程购买 点击支付
// export function uploadBuyClassPay(cardId, price) {
//   return urlencodePostRequest('yp-xcx-submitBuyCourseOrder', {
//     custName: appConfig.custName,
//     gym: AuthService.getMemberInfo().gym,
//     memId: AuthService.getMemberInfo().memId,
//     cardId: cardId,
//     fee: price
//   })
// }

// 课程购买 下单
export function uploadBuyClassPay(dic) {
  var newDic = {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId,
  }
  newDic.cardId = dic.cardId;
  newDic.fee = dic.fee;
  if (dic.actId) {
    newDic.actId = dic.actId;
  }
  newDic.newMemName = AuthService.getUserInfo().username;
  newDic.newSex = AuthService.getUserInfo().gender;

  return urlencodePostRequest('yp-xcx-submitBuyCourseOrder', newDic)
}

// 课程购买 支付
export function uploadBuyClassPrepay(payDic) {
  return urlencodePostRequest('yp-xcx-buyCoursePrepay', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    userCardId: payDic.userCardId,
    xcxOrderId: payDic.xcxOrderId,
    ptId: payDic.ptId,
    openId: AuthService.getOpenId(),
    orderPrice: payDic.orderPrice
  })
}

// 在线购卡 下单
export function uploadOnlineCardOrder(dic) {
  var newDic = {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    memId: AuthService.getMemberInfo().memId,
  }
  newDic.cardId = dic.cardId;
  newDic.fee = dic.fee;
  if (dic.actId) {
    newDic.actId = dic.actId;
  }
  newDic.newMemName = AuthService.getUserInfo().username;
  newDic.newSex = AuthService.getUserInfo().gender;

  return urlencodePostRequest('yp-xcx-submitBuyCardOrder', newDic)
}

// 会员卡购买 activeRecId
export function uploadBuyCardPrepay(payDic) {
  return urlencodePostRequest('yp-xcx-buyCardPrepay', {
    custName: appConfig.custName,
    gym: AuthService.getMemberInfo().gym,
    userCardId: payDic.userCardId,
    xcxOrderId: payDic.xcxOrderId,
    preFeeId: payDic.preFeeId,
    openId: AuthService.getOpenId(),
    orderPrice: payDic.orderPrice
  })
}

// 取消支付
export function uploadFailPayment(payDic) {
  var newDic = {
    gym: AuthService.getMemberInfo().gym,
    custName: appConfig.custName
  }
  newDic.userCardId = payDic.userCardId;
  newDic.xcxOrderId = payDic.xcxOrderId;
  if (payDic.activeRecId) {
    newDic.activeRecId = payDic.activeRecId;
  }
  return urlencodePostRequest('yp-xcx-failBuyCard', newDic)
}

// 在线购卡 
export function makeMemCardPayment(payDic) {
  return new Promise((resolve, reject) => {
    uploadBuyCardPrepay(payDic).then((orderParams) => {

      if (orderParams.errCode == 0) {
        return resolve(requestPayment(orderParams.orderInfoMap));
      } else {
        wx.showToast({
          title: '下单失败!',
          icon: 'success',
          duration: 5000
        })
        return reject(orderParams.errorNum)
      }

    })
  })
}

// 课程购买
export function makeClassPayment(payDic) {
  return new Promise((resolve, reject) => {
    uploadBuyClassPrepay(payDic).then((orderParams) => {

      if (orderParams.errCode == 0) {
        return resolve(requestPayment(orderParams.orderInfoMap));
      } else {

        wx.showToast({
          title: '购买失败!',
          icon: 'success',
          duration: 5000
        })
        return reject(orderParams.errorNum)
      }

    })
  })
}

export function requestPayment(orderParams) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      appId: appConfig.appId,
      timeStamp: '' + orderParams.timeStamp,
      nonceStr: orderParams.nonceStr,
      package: 'prepay_id=' + orderParams.prepayId,
      signType: 'MD5',
      paySign: orderParams.paySign,
      success: (res) => {

        wx.showToast({
          title: '支付成功！',
          icon: 'success',
          duration: 2000
        })
        console.log('@@Pay Success: ' + JSON.stringify(res))
        resolve(true)
      },
      fail: (error) => {
        console.log('@@Pay fail: ' + JSON.stringify(error))
      },
      complete: (res) => {
        
        console.log('@@Pay complete: ' + JSON.stringify(res))
        if (res.errMsg == 'requestPayment:ok') {
        } else if (res.errMsg == 'requestPayment:fail cancel') {
          
          wx.showToast({
            title: '您已取消支付！',
            icon: 'success',
            duration: 5000
          })
          reject(false)
        } else if (res.errMsg == 'requestPayment:cancel') {
          wx.showToast({
            title: '您已取消支付！',
            icon: 'success',
            duration: 5000
          })
          reject(false)
        } else {
          wx.showToast({
            title: '支付失败!',
            icon: 'success',
            duration: 5000
          })
          reject(false)
        }

      }
    })
  })
}