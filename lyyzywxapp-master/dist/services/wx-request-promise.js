import Promise from '../utils/npm/bluebird.min';
import * as appConfig from '../app-config';
import * as AuthService from './auth-service';

export function wxRequestP(method, url, contentType, data = {}, accessToken = '') {

  if (contentType == 'application/json') {
    wx.showLoading({
      title: '加载中',
    })
  } else {
    wx.showLoading({
      title: '提交中',
    })
  }

  // console.log('@@wxRequestP access_token: ' + accessToken)
  // data.access_token = accessToken
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        'content-type': contentType,
        'access_token': accessToken
      },
      success(res) {
        // console.log(' succeed: ' + JSON.stringify(res.data))
        if (+res.statusCode >= 200 && +res.statusCode < 400) {
          // console.log(url + ' succeed: ' + JSON.stringify(res.data))
          console.log(url + ' succeed: ' + JSON.stringify(res))
          wx.hideLoading()
          // wx.stopPullDownRefresh()
          return resolve(res.data)
        } else {
          console.log(url + " failed: " + JSON.stringify(res.data))
          // wx.hideLoading()
          return reject(res.data)
        }
      },
      fail(error) {
        wx.hideLoading()
        return reject(error)
      }
    })
  })
}

export function wxJsonBackendRequestP(method, endpoint, data = {}) {
  // data.appid = appConfig.appId
  return wxRequestP(method, appConfig.apiBase + endpoint, 'application/json', data)
}

export function wxJsonBackendGetRequestP(endpoint, data) {
  return wxJsonBackendRequestP('GET', endpoint, data)
}

export function wxJsonBackendPostRequestP(endpoint, data) {
  return wxJsonBackendRequestP('POST', endpoint, data)
}

export function wxStaticGetRequestP(url, contentType = 'application/json') {
  return wxRequestP('GET', url, contentType)
}


export function wxUrlencodedBackendRequestP(method, endpoint, data = {}) {
  return wxRequestP(method, appConfig.apiBase + endpoint, 'application/x-www-form-urlencoded', data)
}
export function wxUrlencodedBackenPostRequestP(endpoint, data) {
  return wxUrlencodedBackendRequestP('POST', endpoint, data)
}