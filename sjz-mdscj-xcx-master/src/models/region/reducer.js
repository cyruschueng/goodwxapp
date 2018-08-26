import * as types from '../../types';
import Immutable from 'seamless-immutable';

export function list (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.REGION_LIST_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}

export function region0 (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.REGION_LIST0_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}

export function region1 (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.REGION_LIST1_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}

export function region2 (state = Immutable([]), {type, payload}) {
  switch (type) {
    case types.REGION_LIST2_SUCCESS:
      return Immutable(payload);
    default: return state;
  }
}