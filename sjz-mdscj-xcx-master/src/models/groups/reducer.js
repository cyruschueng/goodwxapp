import Immutable from 'seamless-immutable';
import * as types from '../../types';

export function dataDetail (state = Immutable({}), {type, payload}) {
  switch (type) {
    case types.DATA_REDUCER_CLEAR: {
      return Immutable({});
    }
    case types.GROUPS_DETAIL_SUCCESS:
      return Immutable(payload.dataDetail);
    default: return state;
  }
}

export function dataProTuan (state = Immutable({
  data: [],
  page: 1,
  size: 60
}), {type, payload}) {
  switch (type) {
    case types.DATA_REDUCER_CLEAR: {
      return Immutable.merge(state, {
        data: [],
        page: 1
      })
    }
    case types.PRODUCT_TUAN_LIST_SUCCESS: {
      const { page, size, data } = payload;
      return Immutable.merge(state, {
        page,
        size,
        data
      });
    }
    default: return state;
  }
}


export function dataTemp (state = Immutable({
  islock: true
}), {type, payload}) {
  switch (type) {
    case types.GROUPS_DETAIL_SUCCESS: {
      return Immutable.merge(state, {
        ...payload.dataTemp
      });
    }
    default: return state;
  }
}