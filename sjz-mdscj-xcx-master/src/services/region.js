import request from '../utils/request';

export function getRegionList (zoneId) {
  return request.get('trade/order/zone/viewChildren', {
    zoneId
  });
}

export function viewParents (zoneId) {
  return request.get('trade/order/zone/viewParents', {
    zoneId
  });
}
