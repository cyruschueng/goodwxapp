import * as types from '../../types';
import Immutable from 'seamless-immutable';

export function dataTemp (state = Immutable({
  tabIndex: 0,
  isLoading: false,
  isShowSuccModal: false,
  isShowDrawedTips: false,
  btnText: '立即领取'
}), {type, payload}) {
  switch (type) {
    case types.COUPONS_LIST_TYPE_CHANGE_REQUEST: {
      return Immutable.merge(state, {...payload});
    }
    case types.COUPONS_LIST_GET_REQUEST: {
      return Immutable.merge(state, {
        isLoading: true
      });
    }
    case types.COUPONS_LIST_GET_SUCCESS:
    case types.COUPONS_LIST_GET_FAILURE: {
      return Immutable.merge(state, {
        isLoading: false
      });
    }
    case types.COUPONS_DRAW_SUCCESS: {
      return Immutable.merge(state, {
        isShowSuccModal: true,
        isShowDrawedTips: true,
        btnText: '去逛逛'
      });
    }
    case types.MODAL_COUPONS_HIDE: {
      return Immutable.merge(state, {
        isShowSuccModal: false
      });
    }
    case types.COUPONS_LIST_SUCCESS: {
      if (!payload.length) {
        return Immutable.merge(state, {
          isShowDrawedTips: true,
          btnText: '去逛逛'
        });
      } else {
        return state;
      }
    }
    default: 
      return state;
  }
}

export function dataCoupons (state = Immutable({
  page: 0,
  data: [],
  size: 10,
  totalItem: 0
}), {type, payload}) {
  switch (type) {
    case types.COUPONS_LIST_TYPE_CHANGE_REQUEST: {
      return Immutable.merge(state, {
        totalItem: 0, 
        page: 0,
        data: []
      });
    }
    case types.DATA_REDUCER_CLEAR: {
      return Immutable.merge(state, {
        page: 0,
        data: [],
        size: 10,
        totalItem: 0
      });
    }
    case types.COUPONS_LIST_GET_SUCCESS: {
      const { page, data, totalItem } = payload; 
      return Immutable.merge(state, {
        page,
        totalItem,
        data
      });
    }
    default: return state;
  } 
}


export function couponsDetail (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.COUPONS_LIST_SUCCESS: {
      return Immutable(payload);
    }
    default:
      return state;
  }
}