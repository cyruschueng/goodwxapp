import * as types from '../../types';
import { call, put, take, fork } from 'redux-saga/effects';
import * as services from '../../services/order';

// 获取订单详情
function *getOrderDetail () {
  while(true) {
    try {
      const {payload} = yield take(types.ORDER_DETAIL_REQUEST);
      console.log('----orderNo----');
      console.log(payload);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.getOrderDetail, payload.orderNo);
      yield put({
        type: types.ORDER_DETAIL_SUCCESS,
        payload: res.data
      });
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

function *cancelOrderInDetail () {
  try {
    const {payload} = yield take(types.ORDER_DETAIL_CANCEL_REQUEST);
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: {}
    }});
    const res = yield call(services.cancelOrder, payload);
    yield put({type: types.ORDER_DETAIL_CANCEL_SUCCESS, payload});
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: false
    }});
  } catch (e) {
    if (e && e.type !== 'API_ERROR') {
      throw e;
    }
  }
}

function *signOrderInDetail () {
  try {
    const {payload} = yield take(types.ORDER_DETAIL_SIGN_REQUEST);
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: {}
    }});
    const res = yield call(services.signOrder, payload);
    yield put({type: types.ORDER_DETAIL_SIGN_SUCCESS, payload});
    yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
      pageLoading: false
    }});
  } catch (e) {
    if (e && e.type !== 'API_ERROR') {
      throw e;
    }
  }
}

export default function * () {
  yield[
    fork(getOrderDetail),
    fork(cancelOrderInDetail),
    fork(signOrderInDetail)
  ]
}
