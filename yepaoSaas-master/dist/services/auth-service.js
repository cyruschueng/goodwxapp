
/* ----------------------------------------------------------------------- */

import * as appConfig from '../app-config';
import Promise from '../utils/npm/bluebird.min';

const EXPIRATION_MILLISECONDS = 1209600000;
const FORCE_LOGIN = false;

var storeE = {
  set: function (key, val, exp) {
    try {
      wx.setStorageSync(key, { val: val, exp: exp, time: new Date().getTime() });
    } catch (e) { }
  },
  get: function (key) {
    try {
      var info = wx.getStorageSync(key);
      if (!info) {
        return null;
      }
      if (new Date().getTime() - info.time > info.exp) {
        return null;
      }
      return info.val;
    } catch (e) {
      return null;
    }
  }
};

// 保存新登记 潜客会员信息
// 保存 会员信息
export function saveMemberInfo(result) {
  var memInfo = {
    memId: result.mem_id,
    custName: result.cust_name,
    gym: result.gym,
    pt: result.pt,
    mc: result.mc,
    sm: result.sm
  }
  storeE.set('memInfo', memInfo, EXPIRATION_MILLISECONDS);
}
export function getMemberInfo() {
  console.log('getMemberInfo = ' + JSON.stringify(storeE.get('memInfo')));
  return storeE.get('memInfo');
}

// 保存opneid
export function saveAuthInfo(authInfo, userProfile) {
  let openId = authInfo.openId;
  storeE.set('userProfile', userProfile.userInfo, EXPIRATION_MILLISECONDS);
  storeE.set('openid', openId, EXPIRATION_MILLISECONDS);
}

export function clearAuthInfo(authInfo) {
  wx.removeStorageSync('openid');
}

export function getUserProfile() {
  return storeE.get('userProfile');
}

export function getOpenId() {
  return storeE.get('openid');
}

export function getUserInfo() {
  let userProfile = getUserProfile();
  if (!userProfile) {
    return null;
  }
  return {
    openId: getOpenId(),
    username: userProfile.nickName,
    gender: FORMATGENDER[userProfile.gender],
    avatarSrc: userProfile.avatarUrl
  };
}
export const FORMATGENDER = {
  '1' : 'male',
  '2' : 'female',
  '0' : 'male'
}

export function isLoggedIn() {
  let userInfo = getUserInfo();
  return !FORCE_LOGIN && userInfo && userInfo.openId && userInfo.username && userInfo.avatarSrc;
}

export function authFromServer(authCode, userInfoResult) {
  console.log('getUserInfo callback');
  // console.log(authCode, userInfoResult);
  return new Promise((resolve, reject) => {
    wx.request({
      url: appConfig.apiBase + 'yp-xcx-getOpenId',
      method: 'GET',
      data: {
        "code": authCode,
        "custName": appConfig.custName
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("wxappauth result: " + JSON.stringify(res));
        if (+res.statusCode === 200) {
          console.log('wxappauth succeed: ' + JSON.stringify(res.data));
          saveAuthInfo(res.data.resultMap, userInfoResult);
          return resolve();
        } else {
          console.log("wxappauth failed: " + res.statusCode);
          return reject(+res.statusCode);
        }
      },
      fail: function (error) {
        return reject(error);
      }
    });
  });
}

// 如果没有同意 获取头像，再次发起请求
export function authorizeUserInfo() {
  return new Promise((resolve, reject) => { 
    wx.authorizeAsync({
      scope: 'scope.userInfo'
    }).catch((error) => {
      console.log(error);   
      return reject(error);
    }).then(res => {
      return resolve(res);
    })
  })
}

export function wxappLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (loginResult) {
        console.log('loginResult: ' + JSON.stringify(loginResult));
        wx.getUserInfo({
          success: function (res) {
            console.log('getUserInfo result: ' + JSON.stringify(res));
            storeE.set('userProfile', res.userInfo, EXPIRATION_MILLISECONDS);
            return resolve({ authCode: loginResult.code, userInfoResult: res });
          },
          fail: function (error) {
            return reject(error);
          }
        });
      },
      fail: function (error) {
        return reject(error);
      }
    });
  });
}

export function ensureLoggedIn() {
  return new Promise((resolve, reject) => {
    if (isLoggedIn()) {
      console.log('LoggedIn already');
      return resolve();
    }

    return wxappLogin().then(({ authCode, userInfoResult }) => {
      return authFromServer(authCode, userInfoResult);
    });
  });
}

// 认证会员
export function certificationMemberFromServer() {
  return true
}

// 会员认证
export function queryCertificationMember(phone) {
  wx.showLoading({
    title: '认证中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: appConfig.apiBase + 'yp-xcx-login',
      method: 'GET',
      data: {
        'custName': appConfig.custName,
        'phone': phone
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("wxappauth result: " + JSON.stringify(res));
        if (+res.statusCode === 200) {
          console.log('wxappauth succeed: ' + JSON.stringify(res.data));

          if (res.data.errCode == 0) {
            saveMemberInfo(res.data.memInfo);
            showSuccessFailToast('000');
            return resolve(true);
          } else {
            showSuccessFailToast('001');
            return reject(false);
          }
          
        } else {
          console.log("wxappauth failed: " + res.statusCode);
          showSuccessFailToast('002');
          return reject(+res.statusCode);
        }
      },
      fail: function (error) {
        showSuccessFailToast('002');
        return reject(error);
      }
    });
  });
}

export function showSuccessFailToast (code) {
  wx.hideLoading();
  if (code == '000') {
    wx.showToast({
      title: '认证成功',
      icon: 'success',
      duration: 1000
    });
  } else if (code == '001') {
    wx.showToast({
      title: '认证失败！查无此会员！',
      icon: 'none',
      duration: 800
    });
  } else {
    wx.showToast({
      title: '请求失败！',
      icon: 'none',
      duration: 1000
    });
  }
}


// code 0016FrSw0fuhgi1ie2Sw0qAcSw06FrS0

