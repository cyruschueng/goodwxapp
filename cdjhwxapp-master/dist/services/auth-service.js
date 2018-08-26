
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

export function saveAuthInfo(authInfo, userProfile) {
  // let subscriberInfo = authInfo.subscriberInfo;
  // let userProfile = authInfo.userProfile;
  let openId = authInfo.openId;
  // let credentials = authInfo.credentials;

  // storeE.set('subscriberInfo', subscriberInfo, EXPIRATION_MILLISECONDS);
  storeE.set('userProfile', userProfile.userInfo, EXPIRATION_MILLISECONDS);
  storeE.set('openid', openId, EXPIRATION_MILLISECONDS);
  // storeE.set('credentials', credentials, EXPIRATION_MILLISECONDS);
}

export function clearAuthInfo(authInfo) {
  // wx.removeStorageSync('subscriberInfo');
  // wx.removeStorageSync('userProfile');
  wx.removeStorageSync('openid');
  // wx.removeStorageSync('credentials');
}

// export function getSubscriberInfo() {
//   return storeE.get('subscriberInfo');
// }

export function getUserProfile() {
  return storeE.get('userProfile');
}

export function getUserId() {
  return storeE.get('openid');
}

// export function getCredentials() {
//   return storeE.get('credentials');
// }

export function getUserInfo() {
  let userProfile = getUserProfile();
  if (!userProfile) {
    return null;
  }
  return {
    userId: getUserId(),
    // apiToken: getCugeApiToken(),
    // gender: userProfile.gender === 'male' ? 'M' : 'F',
    username: userProfile.nickName,
    avatarSrc: userProfile.avatarUrl
  };
}

// export function getCugeApiToken() {
//   let credentials = getCredentials();
//   if (!credentials) {
//     console.log('@@no credentials');
//     return null;
//   }
//   let accessToken = credentials.accessToken;
//   console.log('@@accessToken: ' + JSON.stringify(accessToken));
//   let hours12 = 43200000;
//   if (new Date(accessToken.created).getTime() + accessToken.ttl * 1000 > Date.now() + hours12) {
//     return accessToken.id;
//   }
//   console.log('@@credentials expired.');
//   return null;
// }

export function isLoggedIn() {
  let userInfo = getUserInfo();
  return !FORCE_LOGIN && userInfo && userInfo.userId && userInfo.username && userInfo.avatarSrc;
}

// export function isSubscriber() {
//   let subscriberInfo = getSubscriberInfo();
//   return subscriberInfo && subscriberInfo.subscribe;
// }

export function saveFromPath(fromPath) {
  storeE.set('fromPath', fromPath, 10000);
}

export function getFromPath() {
  return storeE.get('fromPath');
}

export function removeFromPath() {
  wx.removeStorageSync('fromPath');
}

export function authFromServer(authCode, userInfoResult) {
  console.log('getUserInfo callback');
  // console.log(authCode, userInfoResult);
  return new Promise((resolve, reject) => {
    wx.request({
      url: appConfig.apiBase + 'getOpenId',
      method: 'GET',
      data: {
        "code": authCode,
        "hotelId": +appConfig.hotelId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("wxappauth result: " + JSON.stringify(res));
        if (+res.statusCode === 200) {
          console.log('wxappauth succeed: ' + JSON.stringify(res.data));
          saveAuthInfo(res.data, userInfoResult);
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

export function wxappLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (loginResult) {
        console.log('loginResult: ' + JSON.stringify(loginResult));
        wx.getUserInfo({
          success: function (res) {
            console.log('getUserInfo result: ' + JSON.stringify(res));
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
      // console.log('getCugeApiToken: ' + getCugeApiToken());
      return resolve();
    }

    return wxappLogin().then(({ authCode, userInfoResult }) => {
      return authFromServer(authCode, userInfoResult);
    });
  });
}

// code 0016FrSw0fuhgi1ie2Sw0qAcSw06FrS0