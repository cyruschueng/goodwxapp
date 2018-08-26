import request from '../utils/request';

const host = 'https://qf-restapi.mdscj.com';

export function getCouponList(params) {
  return request.post(`${host}/promotion/coupon/list/detail`, params);
}

export function getCouponsDraw(params) {
  return request.post(`${host}/promotion/coupon/list/acquire`, params);
}
