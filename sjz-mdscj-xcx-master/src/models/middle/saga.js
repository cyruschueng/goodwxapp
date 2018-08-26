import * as types from '../../types';
import wx from 'labrador';
import { call, put, select, take, fork } from 'redux-saga/effects';
import * as services from '../../services/middle';
import {qnParser} from '../../utils/filter';

function *getProductDetail () {
  while (true) {
    const {payload} = yield take(types.MIDDLE_PRODUCT_REQUEST);
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: true
    }});
    let res;
    try {
      res = yield call(services.getProductDetail, payload);
      if (res.data) {
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
          title: res.data.prodName
        }});
        // res.data.showCouponPrice = Math.round(res.data.salesPrice - res.data.promotionPrice);
        res.data.showCouponPrice = (res.data.salesPrice * 10000 - res.data.promotionPrice * 10000) / 10000;
        yield put({type: types.MIDDLE_PRODUCT_SUCCESS, payload: res.data});
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
          pageLoading: false
        }});
      } else {
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
          pageLoading: false
        }});
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function getShowPrice(priceSummary) {
  return priceSummary.minPromotionPrice ?
    priceSummary.minPromotionPrice : priceSummary.minDiscountPrice ?
    priceSummary.minDiscountPrice : priceSummary.minSkuPrice;
}

function *getInit () {
  while (1) {
    const { payload } = yield take(types.MIDDLE_PRODUCTS_LIST_INIT_REQUEST);
    try {
      const res = yield call(services.getProductsList, {...payload, action: 1});
      if (res.data) {
        res.data.map(i => {
          i.showCouponPrice = parseInt((i.salesPrice * 10000 - i.promotionPrice * 10000) / 10000);
        });
        yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
          title: res.data[0].prodName
        }});
        yield put({
          type: types.MIDDLE_PRODUCTS_LIST_INIT_SUCCESS,
          payload: {
            list: res.data,
            action: 1
          }
        });
        yield put({
          type: types.MIDDLE_OLD_PRODUCTS_REQUEST,
          payload
        });
      }
    } catch (e) {
      console.log(e);
      yield put({
        type: types.MIDDLE_PRODUCTS_LIST_INIT_FAILURE
      });
    }
  }
}

function *getOldProducts () {
  while (1) {
    const { payload } = yield take(types.MIDDLE_OLD_PRODUCTS_REQUEST);
    try {
      const res = yield call(services.getProductsList, {...payload, action: -1});
      if (res.data) {
        res.data.map(i => {
          i.showCouponPrice = parseInt((i.salesPrice * 10000 - i.promotionPrice * 10000) / 10000);
        });
        yield put({
          type: types.MIDDLE_OLD_PRODUCTS_SUCCESS,
          payload: {
            list: res.data
          }
        });
      }
    } catch (e) {
      console.log(e);
      yield put({type: types.MIDDLE_OLD_PRODUCTS_FAILURE});
    }
  }
}

export default function * () {
  yield [
    fork(getProductDetail),
    fork(getInit),
    fork(getOldProducts)
  ];
}
