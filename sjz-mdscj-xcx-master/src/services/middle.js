import request from '../utils/request';
import config from '../config';

export function getProductDetail ({distsendid, es, makeReqId}) {
  if (makeReqId) {
    return request(`https://mall.xuanwonainiu.com/xcx/makeReqId/${makeReqId}`);
  } else {
    return request(`https://mall.xuanwonainiu.com/xcx/distsend/${distsendid}/${es}`);
  }
}

export function getProductsList ({distsendid, es, makeReqId, action}) {
  if (makeReqId) {
    return request(`https://mall.xuanwonainiu.com/xcx/makeReqId/${makeReqId}/${action}`);
  } else {
    return request(`https://mall.xuanwonainiu.com/xcx/distsend/${distsendid}/${es}/${action}`);
  }
}
