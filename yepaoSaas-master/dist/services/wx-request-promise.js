import Promise from '../utils/npm/bluebird.min';
import * as appConfig from '../app-config';
import * as AuthService from './auth-service';

export function wxRequestP(method, url, contentType, data = {}, accessToken, noload) {

  if (!noload) {
    if (contentType == 'application/json') {
      wx.showLoading({
        title: '加载中',
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
    }
  }

  if (accessToken) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        data,
        header: {
          'content-type': contentType,
        },
        success(res) {
          // console.log(' succeed: ' + JSON.stringify(res.data))
          if (+res.statusCode >= 200 && +res.statusCode < 400) {
            // console.log(url + ' succeed: ' + JSON.stringify(res.data))
            console.log(url + ' succeed: ' + JSON.stringify(res))
            wx.hideLoading();

            if (res.data.errCode == 0) {
              return resolve(res.data)
            } else {

              if (res.data.errMsg) {
                wx.showToast({
                  icon: 'none',
                  title: res.data.errMsg ? res.data.errMsg : '',
                })
              }

              return reject(res.data)
            }
            
            // wx.stopPullDownRefresh()
            
          } else {
            console.log(url + " failed: " + JSON.stringify(res.data))
            wx.hideLoading()
            return reject(res.data)
          }
        },
        fail(error) {
          wx.hideLoading();
          wx.showToast({
            icon: 'none',
            title: error.errMsg,
          })
          return reject(error)
        }
      })
    })
  } else {
    wx.hideLoading();

    wx.showToast({
      title: '未认证会员',
      icon: 'none',
      duration: 2000
    })
  }

}

export function wxJsonBackendRequestP(method, endpoint, data = {}, noload) {
  // data.appid = appConfig.appId
  return wxRequestP(method, appConfig.apiBase + endpoint, 'application/json', data, AuthService.certificationMemberFromServer(), noload)
}

export function wxJsonBackendGetRequestP(endpoint, data) {
  return wxJsonBackendRequestP('GET', endpoint, data)
}

// 无 弹窗 提示 正在加载中
export function wxJsonBackendGetRequestPNoLoading(endpoint, data) {
  return wxJsonBackendRequestP('GET', endpoint, data, 'noloading')
}

export function wxJsonBackendPostRequestP(endpoint, data) {
  return wxJsonBackendRequestP('POST', endpoint, data)
}

export function wxStaticGetRequestP(url, contentType = 'application/json') {
  return wxRequestP('GET', url, contentType)
}


export function wxUrlencodedBackendRequestP(method, endpoint, data = {}) {
  return wxRequestP(method, appConfig.apiBase + endpoint, 'application/x-www-form-urlencoded', data, AuthService.certificationMemberFromServer())
}
export function wxUrlencodedBackenPostRequestP(endpoint, data) {
  return wxUrlencodedBackendRequestP('POST', endpoint, data)
}
export function wxUrlencodedBackenGetRequestP(endpoint, data) {
  return wxUrlencodedBackendRequestP('GET', endpoint, data)
}