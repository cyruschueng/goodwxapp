import * as types from '../../types';
import Immutable from 'seamless-immutable';

export function detail (state = Immutable({}), {type, payload}) {
  switch (type) {
    case types.MIDDLE_PRODUCT_REQUEST:
      return Immutable({});
    case types.MIDDLE_PRODUCT_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}

export function list (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.MIDDLE_PRODUCTS_LIST_INIT_REQUEST:
      return Immutable([]);
    case types.MIDDLE_PRODUCTS_LIST_INIT_SUCCESS:
      payload.list[0].isCurrent = true;
      return Immutable(payload.list);
    default:
      return state;
  }
}

export function isRequesting (state = true, {type, payload}) {
  switch (type) {
    case types.MIDDLE_PRODUCTS_LIST_INIT_REQUEST:
      return true;
    case types.MIDDLE_OLD_PRODUCTS_SUCCESS:  
    case types.MIDDLE_OLD_PRODUCTS_FAILURE:  
      return false;
    default:
      return state;
  }
}

export function oldProducts (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.MIDDLE_PRODUCTS_LIST_INIT_REQUEST:
      return Immutable([]);
    case types.MIDDLE_OLD_PRODUCTS_SUCCESS:
      return Immutable(payload.list);
    default:
      return state;
  }
}
