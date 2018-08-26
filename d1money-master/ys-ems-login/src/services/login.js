import queryString from 'queryString';
import request from '../utils/request';


export async function login(params) {
  return request('/user/services/doLogin', {
    method: 'POST',
    body: queryString.stringify(params),
  });
}


export async function loadWxLoginParam() {
  return request('/user/services/loadWxLoginParam', {
    method: 'POST',
  });
}
