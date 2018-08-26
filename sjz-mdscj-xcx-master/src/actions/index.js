import * as types from '../types';

export function authAction (action) {
  return {
    type: types.AUTH_ACTION_DISPATCH,
    payload: action
  };
}
