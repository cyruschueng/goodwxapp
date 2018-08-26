import * as types from '../../types';
import { select, call, put, take, fork } from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as services from '../../services/user';
import * as serviceCoupon from '../../services/coupons';
import { getKey } from '../../services/pay';
import {dateFormat, statusToString} from '../../utils/filter';

function *getDataList () {
  while (true) {
    try {
      yield take(types.COUPONS_LIST_GET_REQUEST);
      
      const { tabIndex } = yield select(state => state.coupons.dataTemp);
      const { data, page = 0, size = 10 } = yield select(state => state.coupons.dataCoupons);
      const status = [tabIndex + 1];
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: {}}});

      const params = {
        page,
        size,
        status
      };
      const res = yield call(services.getCouponList, params);

      // 展示数据处理
      res.data.data = res.data.data.map(item=> {
        if (item.type !== 3) {
          item.profitFee_show = item.profitFee / 100 || 0;
        } else {
          item.profitFee_show = (item.profitFee / 10).toFixed(1);
        }
        if (item.couponRuleVO.fullFee !== 1) {
          item.couponRuleVO.fullFee_show = `满${(item.couponRuleVO.fullFee / 100) || 0}元可用`;
        } else {
          item.couponRuleVO.fullFee_show = '无门槛使用';
        }

        item.startTime_show = dateFormat(item.startTime, 'yyyy.MM.dd hh:mm:ss');
        item.endTime_show = dateFormat(item.endTime, 'yyyy.MM.dd hh:mm:ss');
        return item;
      });

      // 分页等数据处理
      res.data.page += 1;
      res.data.data = data.concat(res.data.data);

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {pageLoading: false}});
      yield put({type: types.COUPONS_LIST_GET_SUCCESS, payload: res.data});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *changeDataStatus () {
  while (1) {
    yield take(types.COUPONS_LIST_TYPE_CHANGE_REQUEST);
    
    yield put({type: types.COUPONS_LIST_GET_REQUEST});
  }
}

function *getCouponList(){ 
  while(1) {
    const { payload: params } = yield take(types.COUPONS_LIST_REQUEST);

    try {
      const res = yield call(serviceCoupon.getCouponList, params);
      if (res.status === 1) {
        res.data = res.data.map(item=> {
          item.profitFee = (item.profitFee / 100).toFixed(2);
          item.couponRuleVO.fullFee = (item.couponRuleVO.fullFee / 100).toFixed(2);
          item.startTime = (new Date(item.startTime)).toLocaleDateString();
          item.endTime = (new Date(item.endTime)).toLocaleDateString();
          return item;
        });
        yield put({type: types.COUPONS_LIST_SUCCESS, payload: res.data});
      }
    } catch (err) { 
      console.log('Error:', err);
    }
  }
}

function *getCouponsDraw(){ 
  while(1) {
    const { payload: params } = yield take(types.COUPONS_DRAW_REQUEST);

    if (!params.couponNos.length) {
      wx.showModal({content: '暂无可领取的优惠券~', showCancel: false});
      continue;
    }
    try {
      const res = yield call(serviceCoupon.getCouponsDraw, params);
      if (res.status === 1) {
        yield put({type: types.COUPONS_DRAW_SUCCESS, payload: res.data});
      }
    } catch (err) { 
      console.log('Error:', err);
      if (err.data && err.data.status === 544011) {
        wx.showModal({
          title: '提示',
          content: '已领取优惠券, 去逛逛商品吧~',
          confirmColor: '#ff2551',
          showCancel: false
        });
      }
    }
  }
}

export default function * () {
  yield fork(getDataList);
  yield fork(changeDataStatus);
  yield fork(getCouponList);
  yield fork(getCouponsDraw);
}
