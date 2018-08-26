import http from '@/utils/http';

export function saveUserInfo(params = {}) {
  return http.postRequest({
    url: '/api/index.php?r=customer/save-customer',
    params,
  });
}

export function getSessionKey(params = {}) {
  return http.getRequest({
    url: '/api/index.php?r=customer/authcode',
    params,
  });
}

export default {};
