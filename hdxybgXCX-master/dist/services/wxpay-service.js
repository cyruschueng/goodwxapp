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

// 待付款 
export function getBrandWCPayRequestParams(dic) {
  return urlencodePostRequest('pay/prepay', dic);
}
// 付尾款
export function getBrandWCFinalyPayRequestParams(orderid, openid, obligation) {
  return urlencodePostRequest('pay/payed', {
    orderId: orderid,
    openId: openid,
    hotelId: +appConfig.hotelId,
    obligation: obligation
  });
}

export function makeFinalPay(orderid, openid, obligation) {
  return getBrandWCFinalyPayRequestParams(orderid, openid, obligation).then((orderParams) => {
    if (orderParams.result == true) {
      return requestPayment(orderParams);
    } else {
      wx.showToast({
        title: '支付失败!',
        icon: 'success',
        duration: 5000
      })
      return false
    }
  })
}

export function makePayment(payDic) {
  return new Promise((resolve, reject) => {
    getBrandWCPayRequestParams(payDic).then((orderParams) => {

      if (orderParams.result) {

        if (orderParams.payFlag) {
          wx.setStorageSync('prepayOrderParams', orderParams)
          return resolve(requestPayment(orderParams));
        } else {
          wx.showToast({
            title: '预约成功!',
            icon: 'success',
            duration: 2000
          })
          return reject(orderParams.errorNum)
        }

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
          resolve(false)
        } else {
          wx.showToast({
            title: '支付失败!',
            icon: 'success',
            duration: 5000
          })
          resolve(false)
        }

      }
    })
  })
}