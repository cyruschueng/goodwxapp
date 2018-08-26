import request from '../utils/request';
import config from '../config';

// 从cms活动页获取小程序首页商品列表id数组
export function getProductIds (pageStatus = 'PUBLISH', pageType = 'ACTIVITYPAGE') {
  return request.post(`product/cms/previewOrPublish`, {
    domain: config.domain,
    pageId: config.indexPageId,
    pageStatus,
    pageType
  });
}

export function getIndexProducts (ids) {
  return request.post(`product/cms/getProductList`, {ids});
}

export function getProductDetail (productId) {
  return request(`product/viewForSP?productId=${productId}&promotionType=NONE`);
  // return new Promise(resolve => {
  //   resolve(require('../datas/productDetail'));
  // });
}
