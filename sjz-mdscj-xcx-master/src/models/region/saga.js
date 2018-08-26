import * as types from '../../types';
import { call, put, take, fork, select } from 'redux-saga/effects';
import * as services from '../../services/region';
import {authAction} from '../../actions';

function *getEditRegionList () {
  while (true) {
    const {payload} = yield take(types.REGION_EIDT_REQUEST);
    const addressDetail = yield select(state => state.address.detail);
    // 先情况数据
    // 获取region1 region2 region3
    let region0 = yield select(state => state.region.region0);
    let res;
    if (!region0.length) {
      try {
        res = yield call(services.getRegionList, 1);
        region0 = res.data;
        yield put({type: types.REGION_LIST0_SUCCESS, payload: region0});
      } catch (e) {
        if (e && e.type !== 'API_ERROR') {
          throw e;
        }
        yield put({type: types.REGION_LIST0_FAILURE, payload: region0});
      }
    }

    // 先初始化市区
    yield put({type: types.REGION_LIST1_SUCCESS, payload: []});
    yield put({type: types.REGION_LIST2_SUCCESS, payload: []});

    const resView = yield call(services.viewParents, addressDetail.zoneId);
    const parents = resView.data;
    let detailRegion0 = parents.length > 1 ? parents[1].id : 0;
    let detailRegion1 = parents.length > 2 ? parents[2].id : 0;
    let detailRegion2 = parents.length > 3 ? parents[3].id : 0;

    // 获取市列表
    let region1List = [];
    if (detailRegion0 !== 0) {
      let resRegion1 = yield call(services.getRegionList, detailRegion0);
      region1List = resRegion1.data;
      yield put({type: types.REGION_LIST1_SUCCESS, payload: region1List});
    }

    // 获取区列表
    let region2List = [];
    if (detailRegion1 !== 0) {
      let resRegion2 = yield call(services.getRegionList, detailRegion1);
      region2List = resRegion2.data;
      yield put({type: types.REGION_LIST2_SUCCESS, payload: region2List});
    }

    let regionKeys = getRegionKey(detailRegion0, detailRegion1, detailRegion2, region0, region1List, region2List);

    yield put({type: types.ADDRESS_DATA_MODIFY, payload: {
      region0: detailRegion0,
      region1: detailRegion1,
      region2: detailRegion2,
      consignee: addressDetail.consignee,
      phone: addressDetail.phone,
      street: addressDetail.street,
      zipcode: addressDetail.zipcode,
      zoneId: addressDetail.zoneId,
      isDefault: addressDetail.isDefault,
      id: addressDetail.id,
      indexRegion0: regionKeys[0],
      indexRegion1: regionKeys[1],
      indexRegion2: regionKeys[2]
    }});
    yield put({type: types.UPDATE_VIEW_CONFIG, payload:{
      pageLoading: false
    }});
  }
}

function getRegionKey (detailRegion0, detailRegion1, detailRegion2, region0, region1, region2) {
  var indexArray = [0, 0, 0];
  region0.forEach((region, index) => {
    if (region.id === detailRegion0) {
      indexArray[0] = index;
    }
  });

  region1.forEach((region, index) => {
    if (region.id === detailRegion1) {
      indexArray[1] = index;
    }
  });

  region2.forEach((region, index) => {
    if (region.id === detailRegion2) {
      indexArray[2] = index;
    }
  });
  return indexArray;
}



function *getRegionList () {
  while (true) {
    const {payload} = yield take(types.REGION_LIST_REQUEST);
    yield put({type: types.UPDATE_VIEW_CONFIG, payload:{
      pageLoading: true
    }});
    try {
      const res = yield call(services.getRegionList, payload.pid);
      let list = res.data;
      yield put({type: types['REGION_LIST' + payload.index + '_SUCCESS'], payload: list});
      yield put({type: types.ADDRESS_DATA_MODIFY, payload: {
        ['region' + payload.index]: list.length ? list[0].id : 0,
        ['indexRegion' + payload.index]: 0
      }});
      yield fork(forkGetRegionList, payload.index);
    } catch (e){
      if (e.message === '###xcx token expiry###') {
        yield put({type: types.AUTH_ACTION_DISPATCH, payload: {type: types.REGION_LIST_REQUEST, payload: payload}})
      } else if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *forkGetRegionList (index) {
  if (index < 2) {
    yield put({type: types.REGION_LIST_INIT, payload: {
      index: index + 1
    }});
    const thisRegion = yield select(state => state.region['region' + index]);
    if (thisRegion.length) {
      let pid = thisRegion[0].id;
      yield put({type: types.REGION_LIST_REQUEST, payload: {
        pid,
        index: index + 1
      }});
    }
  } else {
    yield put({type: types.UPDATE_VIEW_CONFIG, payload:{
      pageLoading: false
    }});
  }
}

function *initRegionList () {
  while (true) {
    const {payload} = yield take(types.REGION_LIST_INIT);
    yield put({type: types['REGION_LIST' + payload.index + '_SUCCESS'], payload: []});
  }
}

export default function * () {
  yield [
    fork(getRegionList),
    fork(getEditRegionList),
    fork(initRegionList)
  ];
}
