import request from '../utils/request';

export function getAddressList (page) {
  return request.get('uc/address/list', {
  });
}
export function getAddressDetail (id) {
  return request.get('uc/address/detail', {
    addressId: id
  });
}

export function saveAddress (params) {
  return request.get('uc/address/save', params);
}

export function updateAddress (params) {
  return request.get('uc/address/update', params);
}

export function removeAddress (addressId) {
  return request.get('uc/address/remove', {
    addressId
  });
}