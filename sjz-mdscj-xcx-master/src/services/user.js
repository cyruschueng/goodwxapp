import config from '../config';
import request from '../utils/request';

export function ucLogin (code, encryptedData, iv, rawData, signature, source) {
  let params = {
    channel: config.channel,
    domain: config.domain,
    code: code,
    encryptedData: encryptedData,
    iv,
    rawData,
    signature
  };
  if (source) {
    params.source = source;
  }
  return request.post('uc/xcxLogin', params);
}

export function getInfo () {
  return request.get('uc/userInfo');
}

export function getCouponList (params) {
  return request.post('promotion/coupon/mine/list', params);
}

export function saveUserFormId (params) {
  return request.post('uc/xcx/saveUserFormId', {...params, channel: config.channel});
}
