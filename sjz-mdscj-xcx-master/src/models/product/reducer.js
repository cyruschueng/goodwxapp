import Immutable from 'seamless-immutable';
import * as types from '../../types';

export function list (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.PRODUCT_LIST_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}
export function detail (state = Immutable({}), {type, payload}) {
  switch (type) {
    case types.PRODUCT_DETAIL_REQUEST:
    case types.DATA_REDUCER_CLEAR:
      return Immutable({});
    case types.PRODUCT_DETAIL_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}
export function dataTemp (state = Immutable({
  proType: 'NONE'
}), {type, payload}) {
  switch (type) {
    case types.PRODUCT_DETAIL_SUCCESS: {
      const { promotion } = payload;
      if (promotion) {
        return Immutable.merge({
          proType: promotion.promotionType
        });
      } else {
        return state;
      }
    }
    default: return state;
  }
}