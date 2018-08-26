import * as types from '../../types';
import Immutable from 'seamless-immutable';

export function index (state = 0, {type, payload}) {
  switch (type) {
    case types.SWITCH_TAB_SUCCESS:
      console.log('----order change success in tab----');
      console.log(payload);
      return payload.index;
    default:
      return state;
  }
}