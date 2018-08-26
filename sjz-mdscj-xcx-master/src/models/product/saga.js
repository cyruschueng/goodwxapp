import * as types from '../../types';
import { call, put, take, fork } from 'redux-saga/effects';
import * as services from '../../services/product';
import {qnParser} from '../../utils/filter';

function *getProductDetail () {
  while (true) {
    const {payload} = yield take(types.PRODUCT_DETAIL_REQUEST);
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: true
    }});
    let res;
    try {
      res = yield call(services.getProductDetail, payload.id);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        title: res.data.name
      }});

      let proDetail = res.data;
      // 处理详情
      proDetail.descElements = proDetail.descElements.map(desc => {
        let nDesc = desc;
        if (nDesc.type === 'IMAGE') {
          nDesc.content = qnParser(nDesc.content, 750);
        }
        return nDesc;
      });
      //  处理轮播
      proDetail.images = proDetail.images.map(image => {
        image.url = qnParser(image.url, 750);
        return image;
      });

      // 发货时间
      proDetail.deliveryTerm = formatDeliveryTerm(proDetail.deliveryTerm);

      yield put({type: types.PRODUCT_DETAIL_SUCCESS, payload: proDetail});
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function formatDeliveryTerm(deliveryTerm) {
  const settings = {
    24: '24小时',
    48: '48小时',
    72: '72小时',
    96: '4天',
    120: '5天',
    168: '7天',
    360: '15天'
  };
  let res = settings[deliveryTerm] || '48小时';
  return res;
}

function getShowPrice(priceSummary) {
  return priceSummary.minPromotionPrice ?
    priceSummary.minPromotionPrice : priceSummary.minDiscountPrice ?
    priceSummary.minDiscountPrice : priceSummary.minSkuPrice;
}

function *getProductList () {
  while (true) {
    try {
      yield take(types.PRODUCT_LIST_REQUEST);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: true
      }});
      const cmsRes = yield call(services.getProductIds);
      const ids = cmsRes.data.contents[0].contents.map(item => {
        return item.objectId;
      });
      let res = yield call(services.getIndexProducts, ids);
      // 处理数据
      res.data = res.data || [];
      let data = res.data.map(item => {
        return {
          id: item.id,
          imgUrl: item.imgUrl,
          name: item.name,
          price: getShowPrice(item.priceSummary) / 100,
          promotion: item.promotion || {}
        }
      });
      yield put({type: types.PRODUCT_LIST_SUCCESS, payload: data});
    } catch (e) {
      yield put({type: types.PRODUCT_LIST_FAILURE, payload: e});
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: false
    }});
  }
}

export default function * () {
  yield [
    fork(getProductDetail),
    fork(getProductList)
  ];
}
