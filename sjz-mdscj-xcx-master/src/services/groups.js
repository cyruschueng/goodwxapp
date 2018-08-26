import request from '../utils/request';

export function getGroupsDetail ({ groupOrderNo }) {
  return request.get(`trade/b/groupOrder/mine/detail?groupOrderNo=${groupOrderNo}`);
}

export function getProductTuanList ({ page, size, appKey }) {
  return request.get(`product/promotionlist?page=${page}&size=${size}&appKey=${appKey}`);
}