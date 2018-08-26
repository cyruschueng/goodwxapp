import * as types from '../../types';
import Immutable from 'seamless-immutable';

export function detail (state = Immutable({}), {type, payload}) {
  switch (type) {
    case types.ORDER_DETAIL_REQUEST:
      return Immutable({});
    case types.ORDER_DETAIL_SUCCESS:
      return Immutable(payload);
      break;
    case types.ORDER_DETAIL_CANCEL_SUCCESS:
      return Immutable.set(state, 'status', 'CANCELLED');
      break;
    case types.ORDER_DETAIL_SIGN_SUCCESS:
      return Immutable.set(state, 'status', 'FINISHED');
      break;
    default:
      return state;
  }
}