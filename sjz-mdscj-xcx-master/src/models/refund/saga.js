import * as types from '../../types';
import { select, call, put, take, fork } from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as services from '../../services/order';
import {dateFormat, statusToString} from '../../utils/filter';

function *refundSubmit () {
  while (true) {
    try {
      yield take(types.REFUND_SUBMIT_REQUEST);

      const dataOrder = yield select(state => state.orderDetail.detail);
      const dataRefund = yield select(state => state.refund.dataRefunds);

      const params = {
        attachType: 'REFUND_WEIXIN',
        refundType: dataRefund.refundType,
        refundReason: dataRefund.refundReason,
        refundMemo: dataRefund.refundMemo,
        orderNo: dataOrder.orderNo,
        attachs: [], // 上传图片
        orderItemRefundFees: {
          [dataOrder.orderItems[0].orderItem.id]: dataOrder.orderItems[0].orderItem.subtotal
        }
      };

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.refundSubmit, params);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
      
      if (res.status === 1) {
        yield put({
          type: types.REFUND_SUBMIT_SUCCESS,
          payload: res.data
        });

        wx.navigateBack();
        // wx.reLaunch({
        //   url: `/pages/order/detail?orderNo=${dataOrder.orderNo}`
        // });
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *refundDetail () {
  while (true) {
    try {
      const { payload } = yield take(types.REFUND_DETAIL_REQUEST);

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.refundDetails, payload);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
      
      if (res.status === 1) {
        const data = res.data.data.map((item, index)=> {
          item.statusShow = statusToString(item.status);
          item.typeShow = statusToString(item.type);
          item.reasonShow = statusToString(item.reason);
          switch (item.status) {
            case 'APPLYING': {
              item.timeShow = dateFormat(item.createdAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
            case 'CANCELLED': {
  
              item.timeShow = dateFormat(item.finishedAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
            case 'REJECTED': {
  
              item.timeShow = dateFormat(item.finishedAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
            case 'AGREED': {
  
              item.timeShow = dateFormat(item.agreedAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
            case 'REFUNDING': {
  
              item.timeShow = dateFormat(item.agreedAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
            case 'SHIPPED': {
  
              item.timeShow = dateFormat(item.shippedAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
            case 'FINISHED': {
  
              item.timeShow = dateFormat(item.finishedAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
            default: {
  
              item.timeShow = dateFormat(item.createdAt, 'yyyy-MM-dd hh:mm:ss');
              break;
            }
          }
          return item;
        });

        yield put({
          type: types.REFUND_DETAIL_SUCCESS,
          payload: data
        });
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *refundCancel () {
  while (true) {
    try {
      const { payload: { orderNo, returnRefundNo } } = yield take(types.REFUND_CANCEL_REQUEST);

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});
      const res = yield call(services.refundCancel, returnRefundNo);
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
      
      if (res.status === 1 && res.data) {
        yield put({
          type: types.REFUND_DETAIL_SUCCESS,
          payload: res.data
        });
        wx.reLaunch({
          url: `/pages/order/detail?orderNo=${orderNo}`
        });
      }
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

export default function * () {
  yield fork(refundSubmit);
  yield fork(refundDetail);
  yield fork(refundCancel);
}
