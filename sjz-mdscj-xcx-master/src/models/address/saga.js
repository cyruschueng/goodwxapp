import wx from 'labrador';

import * as types from '../../types';
import { call, put, take, fork, select } from 'redux-saga/effects';
import * as services from '../../services/address';

function *getAddressDetail () {
  while (true) {
    const {payload} = yield take(types.ADDRESS_DETAIL_REQUEST);
    yield put({type: types.UPDATE_VIEW_CONFIG, payload:{
      pageLoading: true
    }});
    let res;
    try {
      yield put({type: types.ADDRESS_DETAIL_INIT_REQUEST});
      res = yield call(services.getAddressDetail, payload.id);
      yield put({type: types.ADDRESS_DETAIL_SUCCESS, payload: res.data});
      yield put({type: types.REGION_EIDT_REQUEST});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }

      yield put({type: types.ADDRESS_DETAIL_FAILURE, payload: e});
    }
  }
}

function *initAddressDetail () {
  while (true) {
    const {payload} = yield take(types.ADDRESS_DETAIL_INIT_REQUEST);
    yield put({type: types.ADDRESS_DETAIL_INIT_SUCCESS, payload: {}});
  }
}

function *getAddressList () {
  while (true) {
    yield take(types.ADDRESS_LIST_REQUEST);
    let res;
    try {
      res = yield call(services.getAddressList);
      let data = res.data.data;
      yield put({type: types.ADDRESS_LIST_SUCCESS, payload: data});
    } catch (e) {
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }

      yield put({type: types.ADDRESS_LIST_FAILURE, payload: e});
    }
  }
}

const requreKeys = [
  {
    'key': 'consignee',
    'text': '联系人'
  },
  {
    'key': 'phone',
    'text': '电话'
  },
  {
    'key': 'street',
    'text': '详细地址'
  }
]

function *validateAddress () {
  while (true) {
    yield take(types.ADDRESS_SAVE_REQUEST);
    const detail = yield select(state => state.address.detail);
    const region = yield select(state => state.region);
    let valid = true;
    let validText = ''
    let regPhone = /^1\d{10}$/ig;

    let zoneId = (!detail.region2 ? (!detail.region1 ? detail.region0 : detail.region1) : detail.region2);

    let isReginNull = !detail.region1 && region.region1.length || !detail.region2 && region.region2.length;

    yield put({type: types.ADDRESS_DATA_MODIFY, payload: {
      zoneId
    }});

    if (isReginNull) {
      valid = false;
      validText = '请填写完整的省市区';
    }

    if (!regPhone.test(detail.phone)) {
      valid = false;
      validText = '手机号码不正确';
    }

    if (detail.zipcode && !(/^\d{6}$/ig).test(detail.zipcode)) {
      valid = false;
      validText = '邮政编码不正确';
    }

    requreKeys.forEach(rule => {
      if (!detail[rule.key]) {
        valid = false;
        validText = rule.text;
      }
    });

    if (!valid) {
      const msg = `${validText}!`;
      wx.showModal({content: msg, showCancel: false});
      yield put({type: types.ADDRESS_DATA_INVALID, payload: msg});
    } else {
      yield call(submitAddress, yield select(state => state.address.detail));
    }
  }
}

function *submitAddress (detail) {
  let method = '';
  if (detail.id) {
    method = 'updateAddress';
  } else {
    method = 'saveAddress';
  }

  try {
    const res = yield call(services[method], {
      ...detail
    });
    yield put({type: types.ADDRESS_SAVE_SUCCESS, payload: res.data});
    yield put({type: types.ADDRESS_LIST_REQUEST});
    wx.showToast({
      icon: 'success',
      title: '操作成功',
      duration: 1000
    });
    setTimeout(function(){
      wx.navigateBack();
    },1000);
  } catch (e) {
    yield put({type: types.ADDRESS_SAVE_FAILURE});
  }
}

function *removeAddress () {
  while (true) {
    const {payload} = yield take(types.ADDRESS_REMOVE_REQUEST);
    try {
      const res = yield call(services.removeAddress, payload.id);
      yield put({type: types.ADDRESS_REMOVE_SUCCESS});
      yield put({type: types.ADDRESS_LIST_REQUEST});
      wx.showToast({
        icon: 'success',
        title: '操作成功',
        duration: 1000
      });
      setTimeout(function(){
        wx.navigateBack();
      },1000);
    } catch (e) {
      yield put({type: types.ADDRESS_REMOVE_FAILURE});
      if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

export default function * () {
  yield [
    fork(getAddressDetail),
    fork(initAddressDetail),
    fork(getAddressList),
    fork(validateAddress),
    fork(removeAddress)
  ];
}
