import Immutable from 'seamless-immutable';
import * as types from '../../types';

export function list (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.ADDRESS_LIST_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}
export function detail (state = Immutable({}), {type, payload}) {
  switch (type) {
    case types.ADDRESS_DETAIL_SUCCESS:
      return Immutable(payload);
    case types.ADDRESS_DETAIL_INIT_SUCCESS:
      return Immutable(payload);
    case types.ADDRESS_DATA_MODIFY:
      return state.merge(payload);
    default: return state;
  }
}
